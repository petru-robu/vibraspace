import React from "react";
import columnsData from "../data/columns_data.json";
import MixerGrid, { ArrowLeft } from "../components/MixerGrid";
import { routes } from "../routes";

export default function ArchitecturalMixer() {
  return (
    <main className="min-h-screen bg-gray-50 text-neutral-900 px-4 md:px-6 pt-16 md:pt-24 pb-12 font-['Poppins',_sans-serif]">
      <div className="max-w-7xl mx-auto">
        <MixerGrid
          columns={columnsData}
          renderNav={(prevBtn, nextBtn) => (
            <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-12">
              <div>
                <a
                  href={routes.home}
                  className="group inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors mb-6"
                >
                  <ArrowLeft />
                  Return Home
                </a>
                <h1 className="text-3xl font-medium tracking-tight text-neutral-900">Architectural Matrix</h1>
                <p className="text-sm text-neutral-500 mt-2">Mix and analyze spatial characteristics.</p>
              </div>
              <div className="flex gap-2">{prevBtn}{nextBtn}</div>
            </header>
          )}
        />
      </div>
    </main>
  );
}
