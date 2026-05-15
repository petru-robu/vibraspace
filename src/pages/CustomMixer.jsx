import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import columnsData from "./columns_data.json";
import Navbar from "../components/Navbar";
import MixerGrid, { ArrowLeft } from "../components/MixerGrid";

export default function CustomMixer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { projectName = "Untitled Session", projectDescription = "", selections = {} } = location.state || {};

  useEffect(() => {
    if (!location.state) navigate("/session-form", { replace: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Shared audio engine ────────────────────────────────────────────────────
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

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current?.stop();
      audioCtxRef.current?.close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Track states for session saving ───────────────────────────────────────
  const trackStatesRef = useRef({});

  // ── Submit / Recording / Save ──────────────────────────────────────────────
  const RECORD_SECONDS = 45;
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingDone, setProcessingDone] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [saveStatus, setSaveStatus] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const saveToBackend = async (blob) => {
    setRecordedBlob(blob);
    try {
      const body = new FormData();
      body.append("projectName", projectName);
      body.append("projectDescription", projectDescription);
      body.append("formData", JSON.stringify(selections));
      body.append("trackStates", JSON.stringify(trackStatesRef.current));
      if (blob) {
        const ext = blob.type.includes("ogg") ? "ogg" : "webm";
        body.append("audio", blob, `session.${ext}`);
      }
      const res = await fetch("/api/sessions", { method: "POST", body });
      if (!res.ok) throw new Error("Save failed");
      setSaveStatus("ok");
    } catch {
      setSaveStatus("error");
    } finally {
      setProcessingDone(true);
    }
  };

  const handleSubmit = () => {
    const ctx = getAudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/ogg";
    chunksRef.current = [];
    const recorder = new MediaRecorder(recordingDestRef.current.stream, { mimeType });
    recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    recorder.onstop = () => saveToBackend(new Blob(chunksRef.current, { type: mimeType }));

    recorder.start(250);
    mediaRecorderRef.current = recorder;
    setIsProcessing(true);
    setProcessingDone(false);
    setSaveStatus(null);
    setProcessingTime(0);
    timerRef.current = setInterval(() => setProcessingTime(t => t + 1), 1000);

    setTimeout(() => {
      if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current.stop();
      clearInterval(timerRef.current);
    }, RECORD_SECONDS * 1000);
  };

  // ── Filtered columns ───────────────────────────────────────────────────────
  const [filterMode, setFilterMode] = useState(true);

  const filteredColumns = filterMode
    ? columnsData
        .map(col => ({ ...col, items: col.items.filter(item => item.label === selections[col.title]) }))
        .filter(col => col.items.length > 0)
    : columnsData;

  return (
    <main className="min-h-screen bg-gray-50 text-neutral-900 px-4 md:px-6 pt-16 md:pt-24 pb-32 font-['Poppins',_sans-serif]">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        {/* Parameter badges + filter toggle */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {Object.entries(selections).map(([cat, label]) =>
            label ? (
              <span key={cat} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 text-[10px] font-medium">
                <span className="text-neutral-400 uppercase tracking-wider text-[9px]">{cat}</span>
                <span className="text-neutral-900">{label}</span>
              </span>
            ) : null
          )}
          <button
            onClick={() => setFilterMode(m => !m)}
            className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-medium transition-colors ${
              filterMode
                ? "bg-neutral-900 border-neutral-900 text-white"
                : "bg-white border-neutral-300 text-neutral-600 hover:border-neutral-500"
            }`}
          >
            {filterMode ? "Curated" : "All tracks"}
          </button>
        </div>

        <MixerGrid
          columns={filteredColumns}
          getAudioCtx={getAudioCtx}
          getMasterGain={getMasterGain}
          trackStatesRef={trackStatesRef}
          renderNav={(prevBtn, nextBtn) => (
            <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-8">
              <div>
                <button
                  onClick={() => navigate("/session-form")}
                  className="group inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors mb-6"
                >
                  <ArrowLeft />
                  Back to Form
                </button>
                <h1 className="text-3xl font-medium tracking-tight text-neutral-900">{projectName}</h1>
                {projectDescription ? (
                  <p className="text-sm text-neutral-500 mt-1">{projectDescription}</p>
                ) : (
                  <p className="text-sm text-neutral-500 mt-2">Architectural Matrix — Session Mixer</p>
                )}
              </div>
              <div className="flex gap-2">{prevBtn}{nextBtn}</div>
            </header>
          )}
        />
      </div>

      {/* Processing overlay — mixer stays mounted so audio keeps playing */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-neutral-950/95 flex flex-col items-center justify-center gap-8 px-6 text-center">
          {!processingDone ? (
            <>
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="#262626" strokeWidth="6" />
                  <circle
                    cx="56" cy="56" r="48" fill="none"
                    stroke="white" strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 48}`}
                    strokeDashoffset={`${2 * Math.PI * 48 * (1 - processingTime / RECORD_SECONDS)}`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-light text-white">
                  {RECORD_SECONDS - processingTime}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-2">Processing</p>
                <p className="text-2xl font-light text-white">Recording your mix…</p>
                <p className="text-sm text-neutral-500 mt-2">Keep the page open. This takes {RECORD_SECONDS} seconds.</p>
              </div>
            </>
          ) : (
            <>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${saveStatus === "ok" ? "bg-white" : "bg-white/10"}`}>
                <span className={saveStatus === "ok" ? "text-neutral-900" : "text-red-400"}>
                  {saveStatus === "ok" ? "✓" : "✗"}
                </span>
              </div>
              <div>
                {saveStatus === "ok" ? (
                  <>
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-2">Done</p>
                    <p className="text-2xl font-light text-white">Submission received.</p>
                    <p className="text-sm text-neutral-400 mt-2">Your sound and session data have been saved.</p>
                    {recordedBlob && (
                      <a
                        href={URL.createObjectURL(recordedBlob)}
                        download={`${projectName.replace(/[^a-z0-9]/gi, '_')}_mix.${recordedBlob.type.includes('ogg') ? 'ogg' : 'webm'}`}
                        className="inline-block mt-4 px-5 py-2.5 bg-white text-neutral-900 text-sm font-medium rounded-xl hover:bg-neutral-200 transition-colors"
                      >
                        Download Recording
                      </a>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-red-400 mb-2">Error</p>
                    <p className="text-2xl font-light text-white">Save failed.</p>
                    <p className="text-sm text-neutral-400 mt-2">Is the backend running? You can try again.</p>
                  </>
                )}
              </div>
              <div className="flex gap-3">
                {saveStatus === "error" && (
                  <button
                    onClick={() => setIsProcessing(false)}
                    className="px-5 py-2.5 bg-white text-neutral-900 text-sm font-medium rounded-xl hover:bg-neutral-200 transition-colors"
                  >
                    Back to Mixer
                  </button>
                )}
                <button
                  onClick={() => navigate("/")}
                  className="px-5 py-2.5 bg-neutral-800 text-white text-sm font-medium rounded-xl hover:bg-neutral-700 transition-colors"
                >
                  Go Home
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 md:px-6 py-4 z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <p className="text-xs text-neutral-400 flex-1">Adjust your tracks, then submit to capture 45s of your mix.</p>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}
