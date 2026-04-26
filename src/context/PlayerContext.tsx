"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export interface Track {
  id: number;
  title: string;
  src: string;
}

export const TRACKS: Track[] = [
  { id: 1, title: "Black Mags (DnB Remix)", src: "/mp3s/black-mags-remix.mp3" },
  { id: 2, title: "The Movement", src: "/mp3s/the-movement.mp3" },
  { id: 3, title: "Heavy", src: "/mp3s/heavy-mix.mp3" },
  { id: 4, title: "Impulse Theory", src: "/mp3s/impulse-theory.m4a" },
  { id: 5, title: "Shut Up (RMX)", src: "/mp3s/shut-up-rmx.m4a" },
  { id: 6, title: "Like A Pimp (RMX)", src: "/mp3s/like-a-pimp-rmx.m4a" },
  { id: 7, title: "If U Think I'm Pretty (RMX)", src: "/mp3s/pretty-rmx.mp3" },
  { id: 8, title: "Mr. Me Too", src: "/mp3s/mr-me-too.m4a" },
];

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  currentTime: number;
  play: (track: Track) => void;
  togglePlay: () => void;
  seek: (ratio: number) => void;
  playNext: () => void;
  playPrev: () => void;
}

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Store currentTrack in a ref so the onEnded callback always sees latest value
  const currentTrackRef = useRef<Track | null>(null);
  currentTrackRef.current = currentTrack;

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      // Auto-advance to next track
      const track = currentTrackRef.current;
      if (track) {
        const idx = TRACKS.findIndex((t) => t.id === track.id);
        const next = TRACKS[(idx + 1) % TRACKS.length];
        audio.src = next.src;
        audio.load();
        audio.play();
        setCurrentTrack(next);
        setIsPlaying(true);
        setProgress(0);
        setCurrentTime(0);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const play = useCallback(
    (track: Track) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (currentTrack?.id === track.id) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          audio.play();
          setIsPlaying(true);
        }
        return;
      }
      audio.src = track.src;
      audio.load();
      audio.play().then(() => {
        setCurrentTrack(track);
        setIsPlaying(true);
        setProgress(0);
        setCurrentTime(0);
      });
      setCurrentTrack(track);
    },
    [currentTrack, isPlaying]
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }, [isPlaying, currentTrack]);

  const seek = useCallback((ratio: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = ratio * audio.duration;
  }, []);

  const playNext = useCallback(() => {
    if (!currentTrack) return;
    const idx = TRACKS.findIndex((t) => t.id === currentTrack.id);
    play(TRACKS[(idx + 1) % TRACKS.length]);
  }, [currentTrack, play]);

  const playPrev = useCallback(() => {
    if (!currentTrack) return;
    const idx = TRACKS.findIndex((t) => t.id === currentTrack.id);
    play(TRACKS[(idx - 1 + TRACKS.length) % TRACKS.length]);
  }, [currentTrack, play]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        currentTime,
        play,
        togglePlay,
        seek,
        playNext,
        playPrev,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
