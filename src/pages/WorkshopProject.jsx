import React, { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import projects from "../data/projects_data";
import Navbar from "../components/Navbar";
import { PauseIcon, PlayIcon } from "../components/icons/AudioIcons";
import { ArrowLeft } from "../components/icons/Arrows";
import { routes } from "../routes";

export default function WorkshopProject() {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id, 10));

  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  if (!project) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center justify-center font-['Poppins',_sans-serif]">
        <p className="text-neutral-500 mb-6">Project not found.</p>
        <Link to={routes.workshop} className="text-sm text-neutral-300 underline">Back to Workshop</Link>
      </main>
    );
  }

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(p => !p);
  };

  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;
    setProgress(el.currentTime);
  };

  const handleSeek = (e) => {
    const el = audioRef.current;
    if (!el) return;
    const val = parseFloat(e.target.value);
    el.currentTime = val;
    setProgress(val);
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const prevProject = projects.find(p => p.id === project.id - 1);
  const nextProject = projects.find(p => p.id === project.id + 1);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 font-['Poppins',_sans-serif]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-24 pb-24">

        {/* Back */}
        <Link
          to={routes.workshop}
          className="group inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-50 transition-colors mb-12"
        >
          <ArrowLeft /> Back to Workshop
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-3">
            Studio 46 — Project {String(project.id).padStart(2, "0")}
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-2">
            {project.title}
          </h1>
          <p className="text-sm text-neutral-500">{project.student}</p>
        </div>

        {/* Image */}
        <div className="w-full aspect-[16/9] bg-neutral-900 rounded-xl overflow-hidden mb-10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description + Audio side-by-side on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <p className="md:col-span-2 text-sm text-neutral-400 leading-relaxed font-light">
            {project.description}
          </p>

          {/* Audio player */}
          <div className="flex flex-col justify-center gap-4 bg-neutral-900 rounded-xl p-6">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500">
              Sonic Translation
            </p>

            <audio
              ref={audioRef}
              src={project.audio}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
              onEnded={() => setPlaying(false)}
            />

            {/* Scrubber */}
            <div className="flex flex-col gap-1">
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.1}
                value={progress}
                onChange={handleSeek}
                className="w-full accent-white h-0.5 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-600">
                <span>{fmt(progress)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </div>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="self-start flex items-center gap-2 px-4 py-2 bg-white text-neutral-900 text-xs font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="flex justify-between border-t border-neutral-800 pt-8">
          {prevProject ? (
            <Link
              to={`/workshop/${prevProject.id}`}
              className="group flex flex-col gap-1 text-left"
            >
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-600 group-hover:text-neutral-400 transition-colors">← Previous</span>
              <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{prevProject.title}</span>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              to={`/workshop/${nextProject.id}`}
              className="group flex flex-col gap-1 text-right"
            >
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-600 group-hover:text-neutral-400 transition-colors">Next →</span>
              <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{nextProject.title}</span>
            </Link>
          ) : <div />}
        </div>

      </div>
    </main>
  );
}
