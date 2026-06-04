import React from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects_data";
import BackLink from "../components/layout/BackLink";
import Footer from "../components/layout/Footer";
import { routes } from "../routes";

export default function Workshop() {
  return (
    <main className="min-h-screen bg-white text-neutral-950 font-['Poppins',_sans-serif] selection:bg-neutral-950 selection:text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pt-10 md:pt-12">
        
        {/* BACK NAVIGATION */}
        <BackLink to={routes.home} dark={false}>Back to Home</BackLink>

        {/* HEADER SECTION */}
        <section className="pb-16 md:pb-24 border-b border-neutral-200">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-light tracking-tighter leading-[1.05]">
            STUDIO 46<br />
            <span className="block text-neutral-500">REIMAGINING THE POLISH INN</span>
          </h1>
        </section>

        {/* PART 1: THE CONTEXT (Asymmetrical Text Block) */}
        <section className="py-16 md:py-24 border-b border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight leading-tight sticky top-24">
                The Polish Inn as a Cultural Center.<br className="hidden md:block" />
              </h2>
            </div>
            
            <div className="md:col-span-7 md:col-start-6 flex flex-col space-y-8">
              <p className="text-sm text-neutral-600 leading-relaxed font-light text-justify">
                A central component of this workshop is the sonic interpretation of the student projects developed within Atelier 46. The selected academic studio focused on the conversion and extension of the Polish Inn (Hanul Polonez), located on Calea Moșilor in Bucharest, into a new cultural center. This historic site became the framework for exploring how architecture can preserve memory while simultaneously projecting new cultural futures.
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed font-light text-justify">
                The students were encouraged to approach the project with freedom and imagination, moving beyond conventional constraints or purely functional solutions. Rather than designing architecture as a fixed response to present conditions, they were invited to speculate, to experiment, and to propose spaces anchored in the future—spaces capable of responding to emerging forms of cultural life, new social interactions, and changing modes of perception.
              </p>
            </div>
          </div>
        </section>

        {/* PART 2: THE TRANSLATION (Architectural Split Grid Twist) */}
        <section className="py-16 md:py-24 border-b border-neutral-200">
          {/* Using a background gap trick to create 1px borders between the grid items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200">
            
            {/* Left Box - Slightly lighter background to draw the eye */}
            <div className="bg-neutral-50 p-6 sm:p-8 md:p-16 flex flex-col justify-start">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-8">
                The Spatial Medium
              </span>
              <p className="text-sm text-neutral-700 leading-relaxed font-light text-justify">
                Within this context, architecture was understood not only as construction, but as an emotional and experiential medium. The proposed projects sought to capture qualities such as openness, tension, intimacy, fluidity, monumentality, curiosity, or contemplation through spatial sequences, atmospheres, and formal gestures. In other words, each project attempted to express the emotional potential of cultural space.
              </p>
            </div>

            {/* Right Box - Deep background */}
            <div className="bg-neutral-50 p-6 sm:p-8 md:p-16 flex flex-col justify-start">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-8">
                The Sonic Translation
              </span>
              <p className="text-sm text-neutral-700 leading-relaxed font-light text-justify">
                This workshop extends that process by translating the students’ architectural proposals into sound. Through sonification, each project receives a parallel auditory interpretation based on its spatial logic, rhythm, density, movement, and atmosphere. A fragmented project may generate syncopated or layered sound structures, while a fluid and continuous proposal may become melodic and immersive. Monumental spaces may be interpreted through low frequencies and resonance, while intimate spaces may emerge through silence, softness, or close tonal textures.
              </p>
            </div>

          </div>
        </section>

        {/* PART 3: THE PURPOSE (Centered Focus Block) */}
        <section className="py-20 md:py-32 flex flex-col items-center text-center border-b border-neutral-200">
          <div className="max-w-3xl flex flex-col items-center space-y-8">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block">
              The Purpose
            </span>
            
            <h3 className="text-xl md:text-2xl text-neutral-800 font-light leading-relaxed">
              The purpose of this exercise is not simply artistic representation, but a deeper investigation into how architecture communicates experience. 
            </h3>
            
            <p className="text-sm text-neutral-600 leading-relaxed font-light text-justify md:text-center">
              By listening to these projects, participants are invited to perceive them differently—to understand architecture not only through drawings and images, but through emotion, rhythm, and sensory resonance. In this sense, the workshop creates a dialogue between student design, sound, and perception, revealing how architecture can be felt before it is built.
            </p>
          </div>
        </section>

        {/* PART 4: PROJECT GALLERY */}
        <section className="py-16 md:py-24 border-b border-neutral-200">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-3">
                The Projects
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">Student Work</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2">
            {projects.map(project => (
              <Link
                key={project.id}
                to={`/workshop/${project.id}`}
                aria-label={`${project.title} by ${project.student}`}
                className="group relative flex aspect-[4/3] min-h-[17rem] items-center justify-center overflow-hidden focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 md:min-h-[20rem]"
              >
                <div className="flex -translate-y-6 items-center justify-center transition-all duration-500 ease-out group-hover:scale-95 group-hover:opacity-0 group-focus-visible:scale-95 group-focus-visible:opacity-0 sm:translate-y-0">
                  <img
                    src={project.logo || project.image}
                    alt={`${project.title} logo`}
                    className="max-h-40 max-w-40 object-contain opacity-90 sm:max-h-52 sm:max-w-52 md:max-h-64 md:max-w-64"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-6 flex translate-y-0 flex-col items-center px-5 text-center opacity-100 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:inset-0 sm:translate-y-4 sm:justify-center sm:px-8 sm:opacity-0">
                  <p className="text-xl font-light tracking-tight text-neutral-950 sm:text-2xl md:text-4xl">
                    {project.title}
                  </p>
                  <p className="mt-2 max-w-md text-xs text-neutral-500 sm:mt-3 sm:text-sm md:text-base">{project.student}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* MINIMAL FOOTER */}
        <Footer />

      </div>
    </main>
  );
}
