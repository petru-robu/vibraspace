export default function ProcessingOverlay({
  isDone,
  projectName,
  recordedBlob,
  saveStatus,
  seconds,
  time,
  onBackToMixer,
  onGoHome,
}) {
  const remainingSeconds = Math.max(0, seconds - time);
  const progress = Math.min(time / seconds, 1);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 flex flex-col items-center justify-center gap-8 px-6 text-center">
      {!isDone ? (
        <>
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="48" fill="none" stroke="#262626" strokeWidth="6" />
              <circle
                cx="56"
                cy="56"
                r="48"
                fill="none"
                stroke="white"
                strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 48}`}
                strokeDashoffset={`${2 * Math.PI * 48 * (1 - progress)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-light text-white">
              {remainingSeconds}
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-2">Processing</p>
            <p className="text-2xl font-light text-white">Recording your mix...</p>
            <p className="text-sm text-neutral-500 mt-2">Keep the page open. This takes {seconds} seconds.</p>
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
                    download={`${projectName.replace(/[^a-z0-9]/gi, "_")}_mix.${recordedBlob.type.includes("ogg") ? "ogg" : "webm"}`}
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
                type="button"
                onClick={onBackToMixer}
                className="px-5 py-2.5 bg-white text-neutral-900 text-sm font-medium rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Back to Mixer
              </button>
            )}
            <button
              type="button"
              onClick={onGoHome}
              className="px-5 py-2.5 bg-neutral-800 text-white text-sm font-medium rounded-xl hover:bg-neutral-700 transition-colors"
            >
              Go Home
            </button>
          </div>
        </>
      )}
    </div>
  );
}
