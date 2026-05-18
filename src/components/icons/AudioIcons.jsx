export const PlayIcon = ({ className = "w-3.5 h-3.5 ml-0.5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const PauseIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
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
