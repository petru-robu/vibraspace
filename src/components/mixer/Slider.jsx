export default function Slider({ label, value, onChange, min, max, step, isPan }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-medium text-neutral-400 w-8">{label}</span>
      <div className="flex-1 flex items-center gap-2">
        {isPan && <span className="text-[10px] text-neutral-400">L</span>}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          className="flex-1 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
        />
        {isPan && <span className="text-[10px] text-neutral-400">R</span>}
      </div>
    </div>
  );
}
