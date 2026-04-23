import React from "react";
// import Navbar from "../components/Navbar"; 

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1.5">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 font-['Poppins',_sans-serif] selection:bg-neutral-100 selection:text-neutral-900">
      {/* <Navbar /> */}

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* HERO SECTION */}
        <section className="pt-32 pb-24 border-b border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
            <div className="md:col-span-8">
              <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[1.05]">
                Composing<br />
                <span className="text-neutral-500 italic">Atmospheres</span>
              </h1>
            </div>
            
            <div className="md:col-span-4 md:pt-4 space-y-6">
              <div className="h-px w-12 bg-neutral-700 hidden md:block" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">
                  An experimental architecture workshop
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  An architectural experiment that seeks to explore the relationship between music and architecture, and the many ways in which these two disciplines can intersect, inform one another, and generate new forms of understanding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 01. THE MATRIX GRID */}
        <section className="pt-24 border-b border-neutral-800">
          <div className="mb-12">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-2">
              01 / Core Concepts
            </span>
            <h2 className="text-2xl font-light tracking-tight text-neutral-300">Theoretical Framework</h2>
          </div>

          <div className="bg-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-px border-t border-neutral-800">
            {/* Card 1 */}
            <div className="bg-neutral-950 p-10 md:p-12 group hover:bg-neutral-900 transition-colors duration-500">
              <h3 className="text-xl font-medium mb-4">Form & Frequency</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                Symmetric and regular layouts translate to predictable, anchoring rhythms, while organic, irregular structures generate complex, evolving acoustic waves.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-neutral-950 p-10 md:p-12 group hover:bg-neutral-900 transition-colors duration-500">
              <h3 className="text-xl font-medium mb-4">Volume & Resonance</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                Compact architectural masses produce tight, solid soundscapes. Conversely, fragmented volumes introduce spatial delay and distinct sonic articulation.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-neutral-950 p-10 md:p-12 group hover:bg-neutral-900 transition-colors duration-500">
              <h3 className="text-xl font-medium mb-4">Materiality & Timbre</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                The physical properties of a space dictate its voice. Opaque solids absorb and muffle, while transparent glass forms reflect and ring with clarity.
              </p>
            </div>
          </div>
        </section>

        {/* 02. THE MIXER (New Section) */}
        <section className="py-24 flex flex-col md:flex-row justify-between items-start gap-12 border-b border-neutral-800">
          <div className="max-w-xl">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-6">
              02 / The Tool
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
              Architectural <br />
              <span className="font-medium">Mixer.</span>
            </h2>
          </div>
          
          <div className="max-w-sm flex flex-col items-start">
            <p className="text-sm text-neutral-400 leading-relaxed font-light mb-8">
              A bespoke interactive interface designed to isolate specific building characteristics and manipulate their resulting audio parameters in real-time. Test the theories yourself.
            </p>
            {/* Link to Mixer */}
            <a 
              href="/mixer" 
              className="group flex items-center text-sm font-medium border-b border-neutral-600 pb-1.5 hover:text-neutral-50 hover:border-neutral-50 transition-all text-neutral-400"
            >
              Launch the Mixer <ArrowRight />
            </a>
          </div>
        </section>

        {/* 03. WORKSHOP DETAILS */}
        <section className="py-24 flex flex-col md:flex-row justify-between items-start gap-12 border-b border-neutral-800">
          <div className="max-w-xl">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-6">
              03 / The Curriculum
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
              A hands-on study of <br />
              <span className="font-medium">spatial acoustics.</span>
            </h2>
          </div>
          
          <div className="max-w-sm flex flex-col items-start">
            <p className="text-sm text-neutral-400 leading-relaxed font-light mb-8">
              Join our upcoming session to translate architectural theory into sonic reality. We will explore site placement, structural dominance, and audio mapping in a focused, immersive environment.
            </p>
            {/* Link to Workshop */}
            <a 
              href="/workshop" 
              className="group flex items-center text-sm font-medium border-b border-neutral-600 pb-1.5 hover:text-neutral-50 hover:border-neutral-50 transition-all text-neutral-400"
            >
              View Workshop Details <ArrowRight />
            </a>
          </div>
        </section>

        {/* MINIMAL FOOTER */}
        <footer className="py-10 flex justify-center md:justify-start text-[10px] font-semibold tracking-widest uppercase text-neutral-600">
          <p>© 2026 Spatial Acoustics Workshop</p>
        </footer>

      </div>
    </main>
  );
}