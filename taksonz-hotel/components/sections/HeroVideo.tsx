"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { HeroMediaFx } from "@/components/ui/ScrollFx";
import styles from "./HeroVideo.module.scss";

interface Props {
  /** Poster image element (rendered on the server, eager-loaded). Always visible until the video plays. */
  children: ReactNode;
  sources: readonly string[];
}

/**
 * Looping, muted background video over a poster image.
 * - Poster is always the fallback: if the video can't load, nothing breaks.
 * - Skipped entirely for reduced-motion and data-saver users.
 * - Pauses off-screen to save battery; a visible pause/play button satisfies WCAG 2.2.2.
 */
export function HeroVideo({ children, sources }: Props) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setEnabled(!reduce && !conn?.saveData);
  }, [reduce]);

  // Pause when the hero scrolls out of view; resume when it returns (unless the visitor paused it).
  useEffect(() => {
    const el = box.current;
    const v = video.current;
    if (!enabled || !el || !v) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e) return;
      if (e.isIntersecting) {
        if (!userPaused.current) void v.play().catch(() => undefined);
      } else v.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  function toggle() {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      void v.play().catch(() => undefined);
    } else {
      userPaused.current = true;
      v.pause();
    }
  }

  return (
    <>
      <div ref={box} className={styles.media}>
        <HeroMediaFx>
          {children}
          {enabled && (
            <video
              ref={video}
              className={[styles.video, ready ? styles.on : ""].join(" ")}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              tabIndex={-1}
              onPlaying={() => { setReady(true); setPlaying(true); }}
              onPause={() => setPlaying(false)}
            >
              {sources.map((src) => <source key={src} src={src} type="video/mp4" />)}
            </video>
          )}
        </HeroMediaFx>
      </div>
      {enabled && ready && (
        <button type="button" className={styles.toggle} onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}>
          {playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
        </button>
      )}
    </>
  );
}
