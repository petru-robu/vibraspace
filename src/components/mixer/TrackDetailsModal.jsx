import { CloseIcon } from "../icons/AudioIcons";

export default function TrackDetailsModal({ item, onClose }) {
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

          {item.musinfo && <p className="text-sm text-neutral-600 leading-relaxed mb-6 text-justify">{item.musinfo}</p>}

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
}
