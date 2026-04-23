import React, { useState, useRef, useEffect } from "react";
import columnsData from "./columns_data.json";

// --- 2. ICONS & ANIMATIONS ---
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 ml-0.5">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MusicAnimation = () => (
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
        className="w-0.5 bg-current animate-pulse"
        style={{ height: '10px', animation: `music ${d}s ease-in-out infinite` }}
      />
    ))}
  </div>
);

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 mr-2 transition-transform duration-300 group-hover:-translate-x-1 cursor-pointer">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

// --- 3. UI COMPONENTS ---
const Slider = ({ label, value, onChange, min, max, step, isPan }) => (
  <div className="flex items-center gap-3">
    <span className="text-[10px] font-medium text-neutral-400 w-8">{label}</span>
    <div className="flex-1 flex items-center gap-2">
      {isPan && <span className="text-[10px] text-neutral-400">L</span>}
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
      />
      {isPan && <span className="text-[10px] text-neutral-400">R</span>}
    </div>
  </div>
);

// --- 4. FEATURE COMPONENTS ---
const TrackItem = ({ item, onOpenDetails }) => {
  // TrackItem = only a single card; contains sliders, play button, info that opens modal
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [pan, setPan] = useState(0);

  const audioRef = useRef(null);
  const audioCtx = useRef(null);
  const panNode = useRef(null);
  const gainNode = useRef(null);

  const initAudio = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      gainNode.current = audioCtx.current.createGain();
      panNode.current = audioCtx.current.createStereoPanner();
      const source = audioCtx.current.createMediaElementSource(audioRef.current);
      source.connect(panNode.current).connect(gainNode.current).connect(audioCtx.current.destination);
    }
  };

  useEffect(() => { if (gainNode.current) gainNode.current.gain.value = volume; }, [volume]);
  useEffect(() => { if (panNode.current) panNode.current.pan.value = pan; }, [pan]);

  const toggleAudio = () => {
    initAudio();
    if (audioCtx.current.state === "suspended") audioCtx.current.resume();
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="group relative bg-white border border-neutral-200 rounded-xl p-5 hover:border-neutral-400 transition-colors">
      {/* Top Right Action Buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <button
          onClick={() => onOpenDetails(item)}
          className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100"
        >
          <InfoIcon />
        </button>
        <button
          onClick={toggleAudio}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isPlaying ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
            }`}
        >
          {isPlaying ? <MusicAnimation /> : <PlayIcon />}
        </button>
      </div>

      {/* Header Info */}
      <div className="pr-20">
        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium mb-1">{item.type}</p>
        <h4 className="text-sm font-medium text-neutral-900 truncate">{item.label}</h4>
      </div>

      {/* Controls - Hidden on mobile (md:block) */}
      <div className="hidden md:block space-y-4 mt-6">
        <Slider label="VOL" value={volume} min="0" max="1" step="0.01" onChange={setVolume} />
        <Slider label="PAN" value={pan} min="-1" max="1" step="0.1" onChange={setPan} isPan />
      </div>

      <audio ref={audioRef} src={item.audio} loop />
    </div>
  );
};

const Modal = ({ item, onClose }) => {
  // Modal is the pop-up that opens when clicking info
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm transition-opacity"
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

          <p className="text-sm text-neutral-600 leading-relaxed mb-6 text-justify">
            {item.musinfo}
          </p>

          {item.img && (
            <div className="mb-6 rounded-xl overflow-hidden bg-white flex items-center justify-center">
              <img src={item.img} alt={item.label} className="w-full h-48 object-contain" />
            </div>
          )}

          <p className="text-sm text-neutral-600 leading-relaxed mb-6 text-justify">
            {item.arhinfo || "Architectural characteristics and spatial implications of the selected element within the matrix."}
          </p>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-neutral-100 text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 5. MAIN LAYOUT ---
export default function ArchitecturalMixer() {
  const [startIndex, setStartIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  // Handle responsive column counts
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    // Set initially and listen to resize
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure startIndex stays in bounds when resizing window
  useEffect(() => {
    setStartIndex((prev) => Math.min(prev, Math.max(0, columnsData.length - visibleCount)));
  }, [visibleCount]);

  const handleNext = () => setStartIndex((p) => Math.min(p + 1, columnsData.length - visibleCount));
  const handlePrev = () => setStartIndex((p) => Math.max(p - 1, 0));

  return (
    <main className="min-h-screen bg-gray-50 text-neutral-900 px-4 md:px-6 pt-16 md:pt-24 pb-12 font-['Poppins',_sans-serif]">
      <Modal item={activeItem} onClose={() => setActiveItem(null)} />

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-12">

          {/* Return home arrow, title and subtitle */}
          <div>
            <a
              href="/"
              className="group inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors mb-6"
            >
              <ArrowLeft />
              Return Home
            </a>

            <h1 className="text-3xl font-medium tracking-tight text-neutral-900">Architectural Matrix</h1>
            <p className="text-sm text-neutral-500 mt-2">Mix and analyze spatial characteristics.</p>
          </div>

          {/* Next / Previous arrows */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="w-10 h-10 flex items-center justify-center disabled:opacity-30 transition-colors bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 sm:border-transparent sm:bg-transparent"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex >= columnsData.length - visibleCount}
              className="w-10 h-10 flex items-center justify-center disabled:opacity-30 transition-colors bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 sm:border-transparent sm:bg-transparent"
            >
              →
            </button>
          </div>
        </header>
        
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${startIndex * (100 / visibleCount)}%)` }}
          >
            {columnsData.map((col, idx) => (
              <div key={idx} className="flex-shrink-0 px-2 md:px-3" style={{ width: `${100 / visibleCount}%` }}>
                <div className="h-full flex flex-col">

                  {/* UPDATE: Added flex container and info button mapped to modal format here */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium text-neutral-900">{col.title}</h3>
                      {/* info button for main category */}
                      <button
                        onClick={() => setActiveItem({
                          type: "Category",
                          label: col.title,
                          arhinfo: col.definition,
                          img: col.img
                        })}
                        className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-200"
                        title="Category Info"
                      >
                        <InfoIcon />
                      </button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">{col.description}</p>
                  </div>

                  {/* The track items */}
                  <div className="space-y-4">
                    {col.items.map((item) => (
                      <TrackItem key={item.id} item={item} onOpenDetails={setActiveItem} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}