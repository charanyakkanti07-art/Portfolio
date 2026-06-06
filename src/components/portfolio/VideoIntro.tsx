import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [muted, setMuted] = useState(true);
  const [showSoundBadge, setShowSoundBadge] = useState(true);

  // Hologram 3D Canvas Sphere Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 370;
    let height = 180;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = entry.contentRect.width || canvas.clientWidth || 370;
        height = entry.contentRect.height || canvas.clientHeight || 180;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
    });
    resizeObserver.observe(canvas);

    const pointsCount = 180;
    const points: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < pointsCount; i++) {
      const theta = Math.acos(-1 + (2 * i) / pointsCount);
      const phi = Math.sqrt(pointsCount * Math.PI) * theta;
      const r = 60;

      points.push({
        x: r * Math.sin(theta) * Math.cos(phi),
        y: r * Math.sin(theta) * Math.sin(phi),
        z: r * Math.cos(theta),
      });
    }

    let angleY = 0.005;
    let angleX = 0.003;

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 0.05;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 0.05;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleY += (mouseX - angleY) * 0.05 + 0.003;
      angleX += (mouseY - angleX) * 0.05 + 0.002;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const centerX = width / 2;
      const centerY = height / 2;
      const cameraDistance = 250;

      ctx.strokeStyle = "rgba(255, 155, 77, 0.04)";
      ctx.lineWidth = 1;
      for (let y = 10; y < height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(10, y);
        ctx.lineTo(width - 10, y);
        ctx.stroke();
      }

      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        
        let x1 = p1.x * cosY - p1.z * sinY;
        let z1 = p1.x * sinY + p1.z * cosY;
        let y1_2 = p1.y * cosX - z1 * sinX;
        let z1_2 = p1.y * sinX + z1 * cosX;

        const scale1 = cameraDistance / (cameraDistance + z1_2);
        const projX1 = centerX + x1 * scale1;
        const projY1 = centerY + y1_2 * scale1;

        for (let j = i + 1; j < Math.min(i + 8, points.length); j++) {
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 32) {
            let x2 = p2.x * cosY - p2.z * sinY;
            let z2 = p2.x * sinY + p2.z * cosY;
            let y2_2 = p2.y * cosX - z2 * sinX;
            let z2_2 = p2.y * sinX + z2 * cosX;

            const scale2 = cameraDistance / (cameraDistance + z2_2);
            const projX2 = centerX + x2 * scale2;
            const projY2 = centerY + y2_2 * scale2;

            const avgZ = (z1_2 + z2_2) / 2;
            const alpha = Math.max(0.02, (cameraDistance - avgZ) / (cameraDistance * 2)) * (1 - dist / 32);

            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 243, 226, ${alpha * 0.22})`;
            ctx.moveTo(projX1, projY1);
            ctx.lineTo(projX2, projY2);
            ctx.stroke();
          }
        }

        const alpha = Math.max(0.1, (cameraDistance - z1_2) / (cameraDistance * 1.5));
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 155, 77, ${alpha * 0.85})`;
        ctx.arc(projX1, projY1, Math.max(0.8, scale1 * 1.6), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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

      {/* Futuristic Hologram Terminal on the Right */}
      <motion.div
        className={styles.rightStage}
        initial={{ opacity: 0, x: 40, y: "-50%", scale: 0.95 }}
        animate={{ opacity: 1, x: 0, y: "-50%", scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.terminalCard}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <span className={styles.terminalTitle}>ai_hologram_core.sys</span>
            <span className={styles.terminalStatus}>ONLINE</span>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.canvasContainer}>
              <canvas ref={canvasRef} className={styles.hologramCanvas} />
            </div>
            <div className={styles.terminalData}>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>[SYS]:</span>
                <span className={styles.dataVal}>CHARAN_CINEMATIC_V1.0</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>[LOC]:</span>
                <span className={styles.dataVal}>ANDHRA PRADESH, IN</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>[CORE]:</span>
                <span className={styles.dataVal}>AI & DATA SCIENCE SPECIALIST</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>[STATUS]:</span>
                <span className={styles.dataVal}>SYSTEM RUNNING CHIP_82</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>[METRIC]:</span>
                <span className={styles.dataVal}>EPOCH 1204 / LOSS 0.0014</span>
              </div>
            </div>
            <div className={styles.terminalFooter}>
              <div className={styles.activityPulse} />
              <span className={styles.footerText}>NEURAL NETWORKS INITIALIZED</span>
            </div>
          </div>
        </div>
      </motion.div>
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

