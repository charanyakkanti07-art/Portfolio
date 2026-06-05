import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import CinematicLayer from "./CinematicLayer";
import videoAsset from "@/assets/charan-intro.mp4.asset.json";
import styles from "./VideoIntro.module.css";

interface VideoIntroProps {
  onScrollDown?: () => void;
}

export default function VideoIntro({ onScrollDown }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showSoundBadge, setShowSoundBadge] = useState(true);

  // GSAP entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(rootRef.current, { opacity: 0, duration: 1.1 })
        .from(
          `.${styles.tagline}`,
          { y: 24, opacity: 0, duration: 0.8 },
          "-=0.4",
        )
        .from(
          `.${styles.nameLine}`,
          { y: 60, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.3",
        )
        .from(
          `.${styles.subtitle}`,
          { y: 20, opacity: 0, duration: 0.8 },
          "-=0.4",
        )
        .from(
          `.${styles.controls}`,
          { opacity: 0, y: 16, duration: 0.7 },
          "-=0.5",
        )
        .from(
          `.${styles.scrollIndicator}`,
          { opacity: 0, duration: 0.8 },
          "-=0.3",
        );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  // Auto-hide the "tap for sound" badge
  useEffect(() => {
    const id = window.setTimeout(() => setShowSoundBadge(false), 5000);
    return () => window.clearTimeout(id);
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    setShowSoundBadge(false);
    if (!next) void v.play().catch(() => undefined);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    const bg = bgVideoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play().catch(() => undefined);
      void bg?.play().catch(() => undefined);
      setPlaying(true);
    } else {
      v.pause();
      bg?.pause();
      setPlaying(false);
    }
  };

  return (
    <section ref={rootRef} className={styles.hero}>
      {/* Ambient blurred background layer */}
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        src={videoAsset.url}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Foreground talking-head video */}
      <div className={styles.videoStage}>
        <video
          ref={videoRef}
          className={styles.fgVideo}
          src={videoAsset.url}
          autoPlay
          loop
          muted={muted}
          playsInline
        />
      </div>

      {/* Cinematic gradient overlays */}
      <div className={styles.gradientTop} aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      {/* Three.js bokeh particles */}
      <CinematicLayer />

      {/* Content */}
      <div ref={contentRef} className={styles.content}>
        <p className={styles.tagline}>Computer Science &amp; AI Undergraduate</p>
        <h1 className={styles.name}>
          <span className={styles.nameLine}>Charan Reddy</span>
          <span className={`${styles.nameLine} ${styles.nameAccent}`}>
            Yakkanti
          </span>
        </h1>
        <p className={styles.subtitle}>
          AI &amp; Data Science Specialist — building intelligent full-stack
          applications. Based in Andhra Pradesh, India.
        </p>
      </div>

      {/* Glassmorphism controls */}
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.glassBtn}
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          type="button"
          className={styles.glassBtn}
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? <MutedIcon /> : <SoundIcon />}
        </button>
      </div>

      {/* Tap for sound badge */}
      {showSoundBadge && muted && (
        <button
          type="button"
          className={styles.soundBadge}
          onClick={toggleMute}
        >
          <span className={styles.soundPulse} />
          Tap for sound
        </button>
      )}

      {/* Scroll indicator */}
      <button
        type="button"
        className={styles.scrollIndicator}
        onClick={onScrollDown}
        aria-label="Scroll to portfolio"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine}>
          <span className={styles.scrollDot} />
        </span>
      </button>
    </section>
  );
}

/* --- Inline icons --- */
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}
function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.06a7 7 0 0 1 0 13.48v2.06A9 9 0 0 0 14 3.2z" />
    </svg>
  );
}
function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M3 10v4h4l5 5V5L7 10H3zm18.3-1.3-1.4-1.4L17 10.2 14.1 7.3l-1.4 1.4L15.6 11.6 12.7 14.5l1.4 1.4L17 13l2.9 2.9 1.4-1.4L18.4 11.6z" />
    </svg>
  );
}
