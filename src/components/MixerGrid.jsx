import { useEffect, useState } from "react";
import { ArrowLeft } from "./icons/Arrows";
import { InfoIcon } from "./icons/AudioIcons";
import TrackDetailsModal from "./mixer/TrackDetailsModal";
import TrackItem from "./mixer/TrackItem";

export { ArrowLeft };

// Shared column carousel used by the free mixer and the session mixer.
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

  const maxStartIndex = Math.max(0, columns.length - visibleCount);
  const visibleStartIndex = Math.min(startIndex, maxStartIndex);
  const canPrev = visibleStartIndex > 0;
  const canNext = visibleStartIndex < maxStartIndex;

  const prevBtn = (
    <button
      type="button"
      onClick={() => setStartIndex(index => Math.max(index - 1, 0))}
      disabled={!canPrev}
      className="w-10 h-10 flex items-center justify-center disabled:opacity-30 transition-colors bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 sm:border-transparent sm:bg-transparent"
      aria-label="Previous mixer columns"
    >
      ←
    </button>
  );

  const nextBtn = (
    <button
      type="button"
      onClick={() => setStartIndex(index => Math.min(index + 1, maxStartIndex))}
      disabled={!canNext}
      className="w-10 h-10 flex items-center justify-center disabled:opacity-30 transition-colors bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 sm:border-transparent sm:bg-transparent"
      aria-label="Next mixer columns"
    >
      →
    </button>
  );

  return (
    <>
      <TrackDetailsModal item={activeItem} onClose={() => setActiveItem(null)} />
      {renderNav?.(prevBtn, nextBtn)}

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${visibleStartIndex * (100 / visibleCount)}%)` }}
        >
          {columns.map((column, index) => (
            <div
              key={column.title ?? index}
              className="flex-shrink-0 px-2 md:px-3"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <div className="h-full flex flex-col">
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-neutral-900">{column.title}</h3>
                    <button
                      type="button"
                      onClick={() => setActiveItem({ type: "Category", label: column.title, arhinfo: column.definition, img: column.img })}
                      className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-200"
                      aria-label={`Show details for ${column.title}`}
                    >
                      <InfoIcon />
                    </button>
                  </div>
                  {column.description && <p className="text-xs text-neutral-500 mt-1">{column.description}</p>}
                </div>

                <div className="space-y-4">
                  {column.items.map(item => (
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
