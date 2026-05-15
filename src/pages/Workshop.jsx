import React from "react";
import { Link } from "react-router-dom";
import projects from "./projects_data";

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1.5">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export default function Workshop() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 font-['Poppins',_sans-serif] selection:bg-neutral-100 selection:text-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
        
        {/* BACK NAVIGATION */}
        <a 
          href="/" 
          className="inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-50 transition-colors mb-16 group"
        >
          <ArrowLeft /> Back to Home
        </a>

        {/* HEADER SECTION */}
        <section className="pb-24 border-b border-neutral-800">
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[1.05]">
            STUDIO 46<br />
            <span className="text-neutral-500">REIMAGINING THE POLISH INN</span>
          </h1>
        </section>

        {/* PART 1: THE CONTEXT (Asymmetrical Text Block) */}
        <section className="py-24 border-b border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight leading-tight sticky top-24">
                The Polish Inn as a Cultural Center.<br className="hidden md:block" />
              </h2>
            </div>
            
            <div className="md:col-span-7 md:col-start-6 flex flex-col space-y-8">
              <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                A central component of this workshop is the sonic interpretation of the student projects developed within Atelier 46. The selected academic studio focused on the conversion and extension of the Polish Inn (Hanul Polonez), located on Calea Moșilor in Bucharest, into a new cultural center. This historic site became the framework for exploring how architecture can preserve memory while simultaneously projecting new cultural futures.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                The students were encouraged to approach the project with freedom and imagination, moving beyond conventional constraints or purely functional solutions. Rather than designing architecture as a fixed response to present conditions, they were invited to speculate, to experiment, and to propose spaces anchored in the future—spaces capable of responding to emerging forms of cultural life, new social interactions, and changing modes of perception.
              </p>
            </div>
          </div>
        </section>

        {/* PART 2: THE TRANSLATION (Architectural Split Grid Twist) */}
        <section className="py-24 border-b border-neutral-800">
          {/* Using a background gap trick to create 1px borders between the grid items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800">
            
            {/* Left Box - Slightly lighter background to draw the eye */}
            <div className="bg-neutral-900 p-8 md:p-16 flex flex-col justify-start">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-8">
                The Spatial Medium
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed font-light text-justify">
                Within this context, architecture was understood not only as construction, but as an emotional and experiential medium. The proposed projects sought to capture qualities such as openness, tension, intimacy, fluidity, monumentality, curiosity, or contemplation through spatial sequences, atmospheres, and formal gestures. In other words, each project attempted to express the emotional potential of cultural space.
              </p>
            </div>

            {/* Right Box - Deep background */}
            <div className="bg-neutral-900 p-8 md:p-16 flex flex-col justify-start">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-8">
                The Sonic Translation
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed font-light text-justify">
                This workshop extends that process by translating the students’ architectural proposals into sound. Through sonification, each project receives a parallel auditory interpretation based on its spatial logic, rhythm, density, movement, and atmosphere. A fragmented project may generate syncopated or layered sound structures, while a fluid and continuous proposal may become melodic and immersive. Monumental spaces may be interpreted through low frequencies and resonance, while intimate spaces may emerge through silence, softness, or close tonal textures.
              </p>
            </div>

          </div>
        </section>

        {/* PART 3: THE PURPOSE (Centered Focus Block) */}
        <section className="py-32 flex flex-col items-center text-center border-b border-neutral-800">
          <div className="max-w-3xl flex flex-col items-center space-y-8">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block">
              The Purpose
            </span>
            
            <h3 className="text-xl md:text-2xl text-neutral-200 font-light leading-relaxed">
              The purpose of this exercise is not simply artistic representation, but a deeper investigation into how architecture communicates experience. 
            </h3>
            
            <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify md:text-center">
              By listening to these projects, participants are invited to perceive them differently—to understand architecture not only through drawings and images, but through emotion, rhythm, and sensory resonance. In this sense, the workshop creates a dialogue between student design, sound, and perception, revealing how architecture can be felt before it is built.
            </p>
          </div>
        </section>

        {/* PART 4: PROJECT GALLERY */}
        <section className="py-24 border-b border-neutral-800">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-3">
                The Projects
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">Student Work</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
            {projects.map(project => (
              <Link
                key={project.id}
                to={`/workshop/${project.id}`}
                className="group bg-neutral-950 hover:bg-neutral-900 transition-colors overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col gap-1 flex-1">
                  <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-neutral-600">
                    {String(project.id).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
                    {project.title}
                  </p>
                  <p className="text-xs text-neutral-600">{project.student}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* MINIMAL FOOTER */}
        <footer className="py-10 flex justify-center md:justify-start text-[10px] font-semibold tracking-widest uppercase text-neutral-600">
          <p>© Composing Atmospheres: An experimental architecture workshop</p>
        </footer>

      </div>
    </main>
  );
}