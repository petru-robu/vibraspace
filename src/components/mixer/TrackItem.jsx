import { useEffect, useRef, useState } from "react";
import { InfoIcon, MusicAnimation, PlayIcon } from "../icons/AudioIcons";
import Slider from "./Slider";

const DEFAULT_TRACK_STATE = { volume: 0.7, pan: 0, isPlaying: false };

export default function TrackItem({ item, onOpenDetails, getAudioCtx, getMasterGain, trackStatesRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_TRACK_STATE.volume);
  const [pan, setPan] = useState(DEFAULT_TRACK_STATE.pan);

  const audioRef = useRef(null);
  const gainNode = useRef(null);
  const panNode = useRef(null);
  const ownCtxRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (trackStatesRef) {
      trackStatesRef.current[item.id] = { ...DEFAULT_TRACK_STATE };
    }

    return () => {
      ownCtxRef.current?.close();
    };
  }, [item.id, trackStatesRef]);

  const updateSavedTrackState = (nextState) => {
    if (!trackStatesRef) return;
    trackStatesRef.current[item.id] = {
      ...trackStatesRef.current[item.id],
      ...nextState,
    };
  };

  const initNodes = () => {
    if (initialized.current) return;
    initialized.current = true;

    const ctx = getAudioCtx ? getAudioCtx() : new (window.AudioContext || window.webkitAudioContext)();
    const destination = getMasterGain ? getMasterGain() : ctx.destination;

    if (!getAudioCtx) ownCtxRef.current = ctx;

    gainNode.current = ctx.createGain();
    gainNode.current.gain.value = volume;
    panNode.current = ctx.createStereoPanner();
    panNode.current.pan.value = pan;

    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(panNode.current).connect(gainNode.current).connect(destination);
  };

  const getCtx = () => getAudioCtx ? getAudioCtx() : ownCtxRef.current;

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (gainNode.current) gainNode.current.gain.value = value;
    updateSavedTrackState({ volume: value });
  };

  const handlePanChange = (value) => {
    setPan(value);
    if (panNode.current) panNode.current.pan.value = value;
    updateSavedTrackState({ pan: value });
  };

  const toggleAudio = () => {
    initNodes();
    const ctx = getCtx();
    if (ctx?.state === "suspended") ctx.resume();

    const nextIsPlaying = !isPlaying;
    nextIsPlaying ? audioRef.current.play() : audioRef.current.pause();
    setIsPlaying(nextIsPlaying);
    updateSavedTrackState({ isPlaying: nextIsPlaying });
  };

  return (
    <div className="group relative bg-white border border-neutral-200 rounded-xl p-5 hover:border-neutral-400 transition-colors">
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onOpenDetails(item)}
          className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100"
          aria-label={`Show details for ${item.label}`}
        >
          <InfoIcon />
        </button>
        <button
          type="button"
          onClick={toggleAudio}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isPlaying ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
          }`}
          aria-label={isPlaying ? `Pause ${item.label}` : `Play ${item.label}`}
        >
          {isPlaying ? <MusicAnimation /> : <PlayIcon />}
        </button>
      </div>

      <div className="pr-20">
        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium mb-1">{item.type}</p>
        <h4 className="text-sm font-medium text-neutral-900 truncate">{item.label}</h4>
      </div>

      <div className="hidden md:block space-y-4 mt-6">
        <Slider label="VOL" value={volume} min="0" max="1" step="0.01" onChange={handleVolumeChange} />
        <Slider label="PAN" value={pan} min="-1" max="1" step="0.1" onChange={handlePanChange} isPan />
      </div>

      <audio ref={audioRef} src={item.audio} loop />
    </div>
  );
}
