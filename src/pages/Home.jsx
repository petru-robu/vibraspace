import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "../components/icons/Arrows";
import Footer from "../components/layout/Footer";
import { routes } from "../routes";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 font-['Poppins',_sans-serif] selection:bg-neutral-100 selection:text-neutral-900">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 border-b border-neutral-800 bg-[url('/img/cover.webp')] bg-cover bg-center bg-no-repeat">

        {/* Dark overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-neutral-950/85"></div>

        {/* Inner container to align content with the rest of the page */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
            <div className="md:col-span-8">
              <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[1.05]">
                COMPOSING<br />
                <span className="text-neutral-500 ">ATMOSPHERES</span>
              </h1>
            </div>

            <div className="md:col-span-4 md:pt-4 space-y-6">
              <div className="h-px w-12 bg-neutral-700 hidden md:block" />
              <div className="space-y-6">
                <div>
                  {/* <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">
                    An experimental architecture workshop <br/> by Ioana Maria Robu
                  </p> */}
                  <p className="text-sm text-neutral-400 leading-relaxed font-light text-justify">
                    An architectural experiment that seeks to explore the relationship between music and architecture, and the many ways in which these two disciplines can intersect, inform one another, and generate new forms of understanding.
                  </p>
                </div>

                {/* SOCIAL LINKS - Text-based, minimalist approach */}
                <div className="flex items-center gap-6 pt-2">
                  <a
                    href="https://www.instagram.com/strat.architecture?igsh=bWIwcGtsN2ZhOTRn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-50 transition-colors duration-300"
                  >
                    Instagram
                  </a>
                  <a
                    href="mailto:ioanarobu00@outlook.com"
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-50 transition-colors duration-300"
                  >
                    Email
                  </a>

                  <a
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-50 transition-colors duration-300"
                  >
                    +40742082296
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Container for the rest of the page */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* 01. THEORY */}
        <section className="py-24 flex flex-col md:flex-row justify-between items-start gap-12 border-b border-neutral-800">
          <div className="max-w-xl">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-6">
              01 / Core Concepts
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
              Theoretical <br />
              <span className="font-medium">Framework.</span>
            </h2>
          </div>

          <div className="max-w-sm flex flex-col items-start">
            <p className="text-sm text-neutral-400 leading-relaxed font-light mb-8 text-justify">
              Explore the fundamental principles mapping architectural forms to acoustic properties. Dive deep into how form, volume, and physical materiality dictate the resonance and timbre of space.
            </p>
            {/* Link to Theory */}
            <Link
              to={routes.theory}
              className="group flex items-center text-sm font-medium border-b border-neutral-600 pb-1.5 hover:text-neutral-50 hover:border-neutral-50 transition-all text-neutral-400"
            >
              Read the Theory <ArrowRight />
            </Link>
          </div>
        </section>

        {/* 02. THE MIXER */}
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
            <p className="text-sm text-neutral-400 leading-relaxed font-light mb-8 text-justify">
              A bespoke interactive interface designed to isolate specific building characteristics and manipulate their resulting audio parameters in real-time. Test the theories yourself.
            </p>
            {/* Link to Mixer */}
            <Link
              to={routes.mixer}
              className="group flex items-center text-sm font-medium border-b border-neutral-600 pb-1.5 hover:text-neutral-50 hover:border-neutral-50 transition-all text-neutral-400"
            >
              Launch the Mixer <ArrowRight />
            </Link>
          </div>
        </section>

        {/* 03. WORKSHOP DETAILS */}
        <section className="py-24 flex flex-col md:flex-row justify-between items-start gap-12 border-b border-neutral-800">
          <div className="max-w-xl">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-6">
              03 / Studio 46 - Reimagining the Polish Inn
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
              A hands-on study of <br />
              <span className="font-medium">spatial acoustics.</span>
            </h2>
          </div>

          <div className="max-w-sm flex flex-col items-start">
            <p className="text-sm text-neutral-400 leading-relaxed font-light mb-8 text-justify">
              Join our upcoming session to translate architectural theory into sonic reality. We will explore site placement, structural dominance, and audio mapping in a focused, immersive environment.
            </p>
            {/* Link to Workshop */}
            <Link
              to={routes.workshop}
              className="group flex items-center text-sm font-medium border-b border-neutral-600 pb-1.5 hover:text-neutral-50 hover:border-neutral-50 transition-all text-neutral-400"
            >
              View Workshop Details <ArrowRight />
            </Link>
          </div>
        </section>

        {/* 04. STUDIO */}
        <section className="py-24 flex flex-col md:flex-row justify-between items-start gap-12 border-b border-neutral-800">
          <div className="max-w-xl">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-6">
              04 / Studio Session
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
              Compose your <br />
              <span className="font-medium">Soundscape.</span>
            </h2>
          </div>

          <div className="max-w-sm flex flex-col items-start">
            <p className="text-sm text-neutral-400 leading-relaxed font-light mb-8 text-justify">
              Define your architectural parameters — form, volume, structure, materiality — and let the system generate a curated sonic environment tailored to your spatial composition. Record and save your session.
            </p>
            <Link
              to={routes.sessionForm}
              className="group flex items-center text-sm font-medium border-b border-neutral-600 pb-1.5 hover:text-neutral-50 hover:border-neutral-50 transition-all text-neutral-400"
            >
              Start a Session <ArrowRight />
            </Link>
          </div>
        </section>

        {/* MINIMAL FOOTER */}
        <Footer />

      </div>
    </main>
  );
}
