import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import projectImageManifest from "../data/project_image_manifest";
import projects from "../data/projects_data";
import { CloseIcon, LoopIcon, MaximizeIcon, PauseIcon, PlayIcon } from "../components/icons/AudioIcons";
import { ArrowLeft, ArrowRight } from "../components/icons/Arrows";
import { routes } from "../routes";

const autoSlideshowDelay = 3500;

export default function WorkshopProject() {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id, 10));

  if (!project) {
    return (
      <main className="min-h-screen bg-white text-neutral-950 flex flex-col items-center justify-center font-['Poppins',_sans-serif]">
        <p className="text-neutral-500 mb-6">Project not found.</p>
        <Link to={routes.workshop} className="text-sm text-neutral-700 underline">Back to Workshop</Link>
      </main>
    );
  }

  return <WorkshopProjectContent key={project.id} project={project} />;
}

function WorkshopProjectContent({ project }) {
  const audioRef = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [audioStatus, setAudioStatus] = useState("idle");
  const [audioTime, setAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const folderImages = project?.imagesFolder
    ? projectImageManifest[project.imagesFolder] || []
    : [];

  const configuredGalleryImages = folderImages.length
    ? folderImages
    : (project.images?.length ? project.images : [project.image]);

  const galleryImages = configuredGalleryImages
    .filter(Boolean)
    .map((image, index) => (
      typeof image === "string"
        ? { src: image, alt: `${project.title} image ${index + 1}` }
        : image
    ));

  const togglePauseResume = async () => {
    const el = audioRef.current;
    if (!el) return;

    if (el.paused) {
      try {
        if (audioStatus === "ended") {
          el.currentTime = 0;
          setAudioTime(0);
        }
        await el.play();
      } catch {
        setAudioStatus("error");
      }
    } else {
      el.pause();
    }
  };

  const replayFromBeginning = async () => {
    const el = audioRef.current;
    if (!el) return;

    try {
      el.currentTime = 0;
      setAudioTime(0);
      await el.play();
    } catch {
      setAudioStatus("error");
    }
  };

  const prevProject = projects.find(p => p.id === project.id - 1);
  const nextProject = projects.find(p => p.id === project.id + 1);
  const activeImage = galleryImages[imageIndex];
  const canCycleImages = galleryImages.length > 1;
  const audioUnavailable = !project.audio || audioStatus === "error";
  const audioPlaying = audioStatus === "playing";
  const audioPaused = audioStatus === "paused";
  const showManualGalleryControls = !audioPlaying;
  const audioProgress = audioDuration > 0
    ? Math.min(100, Math.max(0, (audioTime / audioDuration) * 100))
    : 0;

  const showPreviousImage = useCallback(() => {
    if (!canCycleImages) return;
    setImageIndex(index => (index - 1 + galleryImages.length) % galleryImages.length);
  }, [canCycleImages, galleryImages.length]);

  const showNextImage = useCallback(() => {
    if (!canCycleImages) return;
    setImageIndex(index => (index + 1) % galleryImages.length);
  }, [canCycleImages, galleryImages.length]);

  useEffect(() => {
    if (!audioPlaying || !canCycleImages) return undefined;

    const intervalId = window.setInterval(() => {
      setImageIndex(index => (index + 1) % galleryImages.length);
    }, autoSlideshowDelay);

    return () => window.clearInterval(intervalId);
  }, [audioPlaying, canCycleImages, galleryImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, showNextImage, showPreviousImage]);

  return (
    <main className="min-h-screen bg-white text-neutral-950 font-['Poppins',_sans-serif] selection:bg-neutral-950 selection:text-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-12 pt-16 md:pt-24 pb-16 md:pb-24">

        {/* Back */}
        <Link
          to={routes.workshop}
          className="group inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-950 transition-colors mb-10 md:mb-12"
        >
          <ArrowLeft /> Back to Workshop
        </Link>

        {/* Header + Audio */}
        <div className="mb-10 grid grid-cols-1 gap-8 border-b border-neutral-200 pb-8 md:grid-cols-[minmax(0,1fr)_16rem] md:items-end md:pb-10">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-3">
              Studio 46 — Project {String(project.id).padStart(2, "0")}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight leading-tight mb-2">
              {project.title}
            </h1>
            <p className="text-sm text-neutral-500">{project.student}</p>
          </div>

          <div className="md:justify-self-end">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-4">
              Sonic Translation
            </p>

            <audio
              ref={audioRef}
              src={project.audio}
              onLoadedMetadata={() => {
                const el = audioRef.current;
                setAudioStatus(status => status === "error" ? "idle" : status);
                setAudioDuration(Number.isFinite(el?.duration) ? el.duration : 0);
                setAudioTime(el?.currentTime || 0);
              }}
              onTimeUpdate={() => {
                const el = audioRef.current;
                if (!el) return;

                setAudioTime(el.currentTime || 0);
                setAudioDuration(Number.isFinite(el.duration) ? el.duration : 0);
              }}
              onPlay={() => {
                setAudioStatus("playing");
                setLightboxOpen(false);
              }}
              onPause={() => {
                const el = audioRef.current;
                if (el?.ended) return;

                setAudioStatus(el?.currentTime > 0 ? "paused" : "idle");
              }}
              onEnded={() => {
                const el = audioRef.current;
                const duration = Number.isFinite(el?.duration) ? el.duration : audioDuration;
                setAudioStatus("ended");
                setAudioTime(duration || 0);
              }}
              onError={() => {
                setAudioStatus("error");
              }}
            />

            <div className="w-full max-w-72">
              <div className="flex items-center gap-5">
                <button
                  onClick={togglePauseResume}
                  disabled={audioUnavailable}
                  aria-label={audioPlaying ? "Pause sonic translation" : "Play sonic translation"}
                  className="inline-flex h-14 w-14 items-center justify-center text-neutral-950 transition-colors hover:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 disabled:cursor-default disabled:text-neutral-300"
                >
                  {audioPlaying ? <PauseIcon className="h-8 w-8" /> : <PlayIcon className="h-9 w-9" />}
                </button>

                <button
                  onClick={replayFromBeginning}
                  disabled={audioUnavailable}
                  aria-label="Replay sonic translation from beginning"
                  className="inline-flex h-14 w-14 items-center justify-center text-neutral-950 transition-colors hover:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 disabled:cursor-default disabled:text-neutral-300"
                >
                  <LoopIcon className="h-7 w-7" />
                </button>
              </div>

              <div
                className="mt-3 h-1 overflow-hidden rounded-full bg-neutral-200"
                role="progressbar"
                aria-label="Audio progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(audioProgress)}
              >
                <div
                  className={`h-full rounded-full transition-[width] duration-200 ${
                    audioPlaying ? "bg-neutral-950" : audioPaused ? "bg-neutral-600" : "bg-neutral-400"
                  }`}
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
            </div>

            {audioUnavailable && (
              <p className="mt-4 text-xs text-neutral-500">Audio file pending.</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-10">
          <p className="w-full text-sm text-neutral-600 leading-relaxed font-light text-justify">
            {project.description}
          </p>
        </div>

        {/* Gallery */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-white rounded-lg overflow-hidden border border-neutral-200 mb-10">
          {galleryImages.length > 0 ? (
            galleryImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt || `${project.title} image ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out ${index === imageIndex ? "opacity-100" : "opacity-0"}`}
              />
            ))
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-600">
              No images available.
            </div>
          )}

          {showManualGalleryControls && activeImage && (
            <button
              onClick={() => setLightboxOpen(true)}
              aria-label="Maximize project image"
              className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/90 text-neutral-950 backdrop-blur transition-colors hover:bg-neutral-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:left-4 sm:top-4 sm:h-11 sm:w-11"
            >
              <MaximizeIcon className="h-5 w-5" />
            </button>
          )}

          {showManualGalleryControls && (
            <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between sm:inset-x-4">
              <button
                onClick={showPreviousImage}
                disabled={!canCycleImages}
                aria-label="Previous project image"
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/90 text-neutral-950 backdrop-blur transition-colors hover:bg-neutral-950 hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white/90 disabled:hover:text-neutral-950 sm:h-11 sm:w-11"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={showNextImage}
                disabled={!canCycleImages}
                aria-label="Next project image"
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/90 text-neutral-950 backdrop-blur transition-colors hover:bg-neutral-950 hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white/90 disabled:hover:text-neutral-950 sm:h-11 sm:w-11"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {activeImage && (
            <div className="absolute bottom-3 right-3 rounded-full border border-neutral-300 bg-white/90 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-neutral-500 backdrop-blur sm:bottom-4 sm:right-4">
              {String(imageIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
            </div>
          )}
        </div>

        {lightboxOpen && activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 p-4 pb-14 pt-16 backdrop-blur-sm md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} enlarged image`}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close enlarged image"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/90 text-neutral-950 backdrop-blur transition-colors hover:bg-neutral-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            {canCycleImages && (
              <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between sm:inset-x-4">
                <button
                  onClick={showPreviousImage}
                  aria-label="Previous enlarged image"
                  className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/90 text-neutral-950 backdrop-blur transition-colors hover:bg-neutral-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:h-11 sm:w-11"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={showNextImage}
                  aria-label="Next enlarged image"
                  className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/90 text-neutral-950 backdrop-blur transition-colors hover:bg-neutral-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:h-11 sm:w-11"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}

            <img
              src={activeImage.src}
              alt={activeImage.alt || `${project.title} enlarged image`}
              className="max-h-full max-w-full object-contain"
            />

            <div className="absolute bottom-4 right-4 rounded-full border border-neutral-300 bg-white/90 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-neutral-500 backdrop-blur">
              {String(imageIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
            </div>
          </div>
        )}

        {/* Prev / Next navigation */}
        <div className="flex flex-col gap-6 border-t border-neutral-200 pt-8 sm:flex-row sm:justify-between">
          {prevProject ? (
            <Link
              to={`/workshop/${prevProject.id}`}
              className="group flex min-w-0 flex-col gap-1 text-left sm:max-w-[45%]"
            >
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 group-hover:text-neutral-700 transition-colors">← Previous</span>
              <span className="text-sm text-neutral-700 group-hover:text-neutral-950 transition-colors">{prevProject.title}</span>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              to={`/workshop/${nextProject.id}`}
              className="group flex min-w-0 flex-col gap-1 text-right sm:max-w-[45%]"
            >
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 group-hover:text-neutral-700 transition-colors">Next →</span>
              <span className="text-sm text-neutral-700 group-hover:text-neutral-950 transition-colors">{nextProject.title}</span>
            </Link>
          ) : <div />}
        </div>

      </div>
    </main>
  );
}
