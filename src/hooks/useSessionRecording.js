import { useEffect, useRef, useState } from "react";

const getSupportedMimeType = () =>
  MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/ogg";

// Records the shared mixer output, then hands the final Blob to the caller.
export default function useSessionRecording({ seconds, getAudioCtx, getRecordingStream, onSave }) {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const stopTimeoutRef = useRef(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingDone, setProcessingDone] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [saveStatus, setSaveStatus] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }

    clearInterval(timerRef.current);
    clearTimeout(stopTimeoutRef.current);
  };

  const startRecording = () => {
    const ctx = getAudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    const mimeType = getSupportedMimeType();
    chunksRef.current = [];

    const recorder = new MediaRecorder(getRecordingStream(), { mimeType });
    recorder.ondataavailable = event => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      setRecordedBlob(blob);

      try {
        await onSave(blob);
        setSaveStatus("ok");
      } catch {
        setSaveStatus("error");
      } finally {
        setProcessingDone(true);
      }
    };

    recorder.start(250);
    mediaRecorderRef.current = recorder;
    setIsProcessing(true);
    setProcessingDone(false);
    setSaveStatus(null);
    setRecordedBlob(null);
    setProcessingTime(0);

    timerRef.current = setInterval(() => setProcessingTime(time => time + 1), 1000);
    stopTimeoutRef.current = setTimeout(stopRecording, seconds * 1000);
  };

  const closeOverlay = () => setIsProcessing(false);

  useEffect(() => {
    return stopRecording;
  }, []);

  return {
    closeOverlay,
    isProcessing,
    processingDone,
    processingTime,
    recordedBlob,
    saveStatus,
    startRecording,
  };
}
