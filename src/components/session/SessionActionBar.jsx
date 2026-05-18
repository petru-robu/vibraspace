export default function SessionActionBar({ onSubmit }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 md:px-6 py-4 z-30">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <p className="text-xs text-neutral-400 flex-1">Adjust your tracks, then submit to capture 45s of your mix.</p>
        <button
          type="button"
          onClick={onSubmit}
          className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
