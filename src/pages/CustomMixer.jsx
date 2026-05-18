import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import columnsData from "../data/columns_data.json";
import MixerGrid, { ArrowLeft } from "../components/MixerGrid";
import Navbar from "../components/Navbar";
import ProcessingOverlay from "../components/session/ProcessingOverlay";
import SessionActionBar from "../components/session/SessionActionBar";
import useSessionRecording from "../hooks/useSessionRecording";
import useSharedAudioEngine from "../hooks/useSharedAudioEngine";
import { routes } from "../routes";

const RECORD_SECONDS = 45;

export default function SessionMixer() {
  const location = useLocation();
  const navigate = useNavigate();
  const trackStatesRef = useRef({});
  const [filterMode, setFilterMode] = useState(true);

  const {
    projectName = "Untitled Session",
    projectDescription = "",
    selections = {},
  } = location.state || {};

  useEffect(() => {
    if (!location.state) navigate(routes.sessionForm, { replace: true });
  }, [location.state, navigate]);

  const { getAudioCtx, getMasterGain, getRecordingStream } = useSharedAudioEngine();

  const saveSession = useCallback(async (blob) => {
    const body = new FormData();
    body.append("projectName", projectName);
    body.append("projectDescription", projectDescription);
    body.append("formData", JSON.stringify(selections));
    body.append("trackStates", JSON.stringify(trackStatesRef.current));

    if (blob) {
      const ext = blob.type.includes("ogg") ? "ogg" : "webm";
      body.append("audio", blob, `session.${ext}`);
    }

    const response = await fetch("/api/sessions", { method: "POST", body });
    if (!response.ok) throw new Error("Save failed");
  }, [projectDescription, projectName, selections]);

  const recording = useSessionRecording({
    seconds: RECORD_SECONDS,
    getAudioCtx,
    getRecordingStream,
    onSave: saveSession,
  });

  const filteredColumns = useMemo(() => {
    if (!filterMode) return columnsData;

    return columnsData
      .map(column => ({
        ...column,
        items: column.items.filter(item => item.label === selections[column.title]),
      }))
      .filter(column => column.items.length > 0);
  }, [filterMode, selections]);

  return (
    <main className="min-h-screen bg-gray-50 text-neutral-900 px-4 md:px-6 pt-16 md:pt-24 pb-32 font-['Poppins',_sans-serif]">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {Object.entries(selections).map(([category, label]) =>
            label ? (
              <span key={category} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 text-[10px] font-medium">
                <span className="text-neutral-400 uppercase tracking-wider text-[9px]">{category}</span>
                <span className="text-neutral-900">{label}</span>
              </span>
            ) : null
          )}
          <button
            type="button"
            onClick={() => setFilterMode(mode => !mode)}
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
                  type="button"
                  onClick={() => navigate(routes.sessionForm)}
                  className="group inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors mb-6"
                >
                  <ArrowLeft />
                  Back to Form
                </button>
                <h1 className="text-3xl font-medium tracking-tight text-neutral-900">{projectName}</h1>
                {projectDescription ? (
                  <p className="text-sm text-neutral-500 mt-1">{projectDescription}</p>
                ) : (
                  <p className="text-sm text-neutral-500 mt-2">Architectural Matrix - Session Mixer</p>
                )}
              </div>
              <div className="flex gap-2">{prevBtn}{nextBtn}</div>
            </header>
          )}
        />
      </div>

      {recording.isProcessing && (
        <ProcessingOverlay
          isDone={recording.processingDone}
          projectName={projectName}
          recordedBlob={recording.recordedBlob}
          saveStatus={recording.saveStatus}
          seconds={RECORD_SECONDS}
          time={recording.processingTime}
          onBackToMixer={recording.closeOverlay}
          onGoHome={() => navigate(routes.home)}
        />
      )}

      <SessionActionBar onSubmit={recording.startRecording} />
    </main>
  );
}
