import { useCallback, useEffect, useRef } from "react";

// One AudioContext feeds both the speakers and the recording stream.
export default function useSharedAudioEngine() {
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const recordingDestRef = useRef(null);

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      masterGainRef.current = ctx.createGain();
      recordingDestRef.current = ctx.createMediaStreamDestination();

      masterGainRef.current.connect(ctx.destination);
      masterGainRef.current.connect(recordingDestRef.current);
    }

    return audioCtxRef.current;
  }, []);

  const getMasterGain = useCallback(() => {
    getAudioCtx();
    return masterGainRef.current;
  }, [getAudioCtx]);

  const getRecordingStream = useCallback(() => {
    getAudioCtx();
    return recordingDestRef.current.stream;
  }, [getAudioCtx]);

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  return { getAudioCtx, getMasterGain, getRecordingStream };
}
