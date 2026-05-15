/**
 * MixerGrid — shared carousel + track grid used by both Mixer and CustomMixer.
 *
 * Props:
 *   columns        – array of category objects (full or filtered columnsData)
 *   getAudioCtx    – optional () => AudioContext  — if provided, all tracks share it
 *   getMasterGain  – optional () => GainNode      — tracks connect here instead of ctx.destination
 *   trackStatesRef – optional React ref           — tracks write {volume, pan, isPlaying} into it
 *   renderNav      – (prevBtn, nextBtn) => ReactNode  — lets the parent place arrows in its header
 */

import { useState, useRef, useEffect } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
export const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 ml-0.5">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const MusicAnimation = () => (
  <div className="flex gap-0.5 items-end h-3">
    <style>{`
      @keyframes music {
        0%, 100% { height: 4px; }
        50% { height: 12px; }
      }
    `}</style>
    {[0.8, 1.1, 0.9].map((d, i) => (
      <span
        key={i}
        className="w-0.5 bg-current"
        style={{ height: "10px", animation: `music ${d}s ease-in-out infinite` }}
      />
    ))}
  </div>
);

export const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 mr-2 transition-transform duration-300 group-hover:-translate-x-1 cursor-pointer">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

// ── Slider ────────────────────────────────────────────────────────────────────
export const Slider = ({ label, value, onChange, min, max, step, isPan }) => (
  <div className="flex items-center gap-3">
    <span className="text-[10px] font-medium text-neutral-400 w-8">{label}</span>
    <div className="flex-1 flex items-center gap-2">
      {isPan && <span className="text-[10px] text-neutral-400">L</span>}
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="flex-1 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
      />
      {isPan && <span className="text-[10px] text-neutral-400">R</span>}
    </div>
  </div>
);

// ── Modal ─────────────────────────────────────────────────────────────────────
export const Modal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500">{item.type}</span>
              <h2 className="text-2xl font-medium text-neutral-900 mt-1">{item.label}</h2>
            </div>
            <button onClick={onClose} className="p-2 -mr-2 text-neutral-400 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100">
              <CloseIcon />
            </button>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed mb-6 text-justify">{item.musinfo}</p>

          {item.img && (
            <div className="mb-6 rounded-xl overflow-hidden bg-white flex items-center justify-center">
              <img src={item.img} alt={item.label} className="w-full h-48 object-contain" />
            </div>
          )}

          <p className="text-sm text-neutral-600 leading-relaxed mb-6 text-justify">
            {item.arhinfo || "Architectural characteristics and spatial implications of the selected element within the matrix."}
          </p>

          <button onClick={onClose} className="w-full py-2.5 bg-neutral-100 text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ── TrackItem (unified) ───────────────────────────────────────────────────────
// When getAudioCtx + getMasterGain are provided → shared context (recording-ready).
// When not provided → each track creates its own AudioContext (standard Mixer).
const TrackItem = ({ item, onOpenDetails, getAudioCtx, getMasterGain, trackStatesRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [pan, setPan] = useState(0);

  const audioRef = useRef(null);
  const gainNode = useRef(null);
  const panNode = useRef(null);
  const ownCtxRef = useRef(null); // only used when no shared context is provided
  const initialized = useRef(false);

  useEffect(() => {
    if (trackStatesRef) {
      trackStatesRef.current[item.id] = { volume: 0.7, pan: 0, isPlaying: false };
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initNodes = () => {
    if (initialized.current) return;
    initialized.current = true;

    let ctx, destination;
    if (getAudioCtx && getMasterGain) {
      ctx = getAudioCtx();
      destination = getMasterGain();
    } else {
      ownCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      ctx = ownCtxRef.current;
      destination = ctx.destination;
    }

    gainNode.current = ctx.createGain();
    gainNode.current.gain.value = volume;
    panNode.current = ctx.createStereoPanner();
    panNode.current.pan.value = pan;

    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(panNode.current).connect(gainNode.current).connect(destination);
  };

  const getCtx = () => getAudioCtx ? getAudioCtx() : ownCtxRef.current;

  const handleVolumeChange = (v) => {
    setVolume(v);
    if (gainNode.current) gainNode.current.gain.value = v;
    if (trackStatesRef) trackStatesRef.current[item.id] = { ...trackStatesRef.current[item.id], volume: v };
  };

  const handlePanChange = (p) => {
    setPan(p);
    if (panNode.current) panNode.current.pan.value = p;
    if (trackStatesRef) trackStatesRef.current[item.id] = { ...trackStatesRef.current[item.id], pan: p };
  };

  const toggleAudio = () => {
    initNodes();
    const ctx = getCtx();
    if (ctx?.state === "suspended") ctx.resume();
    const next = !isPlaying;
    next ? audioRef.current.play() : audioRef.current.pause();
    setIsPlaying(next);
    if (trackStatesRef) trackStatesRef.current[item.id] = { ...trackStatesRef.current[item.id], isPlaying: next };
  };

  return (
    <div className="group relative bg-white border border-neutral-200 rounded-xl p-5 hover:border-neutral-400 transition-colors">
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <button
          onClick={() => onOpenDetails(item)}
          className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100"
        >
          <InfoIcon />
        </button>
        <button
          onClick={toggleAudio}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isPlaying ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
          }`}
        >
          {isPlaying ? <MusicAnimation /> : <PlayIcon />}
        </button>
      </div>

      <div className="pr-20">
        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium mb-1">{item.type}</p>
        <h4 className="text-sm font-medium text-neutral-900 truncate">{item.label}</h4>
      </div>

      <div className="hidden md:block space-y-4 mt-6">
        <Slider label="VOL" value={volume} min="0" max="1" step="0.01" onChange={handleVolumeChange} />
        <Slider label="PAN" value={pan} min="-1" max="1" step="0.1" onChange={handlePanChange} isPan />
      </div>

      <audio ref={audioRef} src={item.audio} loop />
    </div>
  );
};

// ── MixerGrid ─────────────────────────────────────────────────────────────────
export default function MixerGrid({ columns, getAudioCtx, getMasterGain, trackStatesRef, renderNav }) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setStartIndex(p => Math.min(p, Math.max(0, columns.length - visibleCount)));
  }, [visibleCount, columns.length]);

  const canPrev = startIndex > 0;
  const canNext = startIndex < columns.length - visibleCount;

  const prevBtn = (
    <button
      onClick={() => setStartIndex(p => Math.max(p - 1, 0))}
      disabled={!canPrev}
      className="w-10 h-10 flex items-center justify-center disabled:opacity-30 transition-colors bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 sm:border-transparent sm:bg-transparent"
    >←</button>
  );

  const nextBtn = (
    <button
      onClick={() => setStartIndex(p => Math.min(p + 1, columns.length - visibleCount))}
      disabled={!canNext}
      className="w-10 h-10 flex items-center justify-center disabled:opacity-30 transition-colors bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 sm:border-transparent sm:bg-transparent"
    >→</button>
  );

  return (
    <>
      <Modal item={activeItem} onClose={() => setActiveItem(null)} />

      {/* Let the parent render nav buttons wherever it wants in its header */}
      {renderNav?.(prevBtn, nextBtn)}

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${startIndex * (100 / visibleCount)}%)` }}
        >
          {columns.map((col, idx) => (
            <div
              key={col.title ?? idx}
              className="flex-shrink-0 px-2 md:px-3"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <div className="h-full flex flex-col">
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-neutral-900">{col.title}</h3>
                    <button
                      onClick={() => setActiveItem({ type: "Category", label: col.title, arhinfo: col.definition, img: col.img })}
                      className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-200"
                      title="Category info"
                    >
                      <InfoIcon />
                    </button>
                  </div>
                  {col.description && <p className="text-xs text-neutral-500 mt-1">{col.description}</p>}
                </div>

                <div className="space-y-4">
                  {col.items.map(item => (
                    <TrackItem
                      key={item.id}
                      item={item}
                      onOpenDetails={setActiveItem}
                      getAudioCtx={getAudioCtx}
                      getMasterGain={getMasterGain}
                      trackStatesRef={trackStatesRef}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
