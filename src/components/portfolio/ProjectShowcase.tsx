import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectShowcase.module.css";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Role-Based Authentication",
    desc: "Secure, scoped access for students, hostel owners, and admins with granular permissions.",
  },
  {
    title: "AI Review Summarization",
    desc: "Large language models distill hundreds of reviews into concise, trustworthy insights.",
  },
  {
    title: "Real-Time Analytics",
    desc: "Owner dashboards surface occupancy, revenue, and engagement as it happens.",
  },
  {
    title: "Predictive Price Optimization",
    desc: "Machine learning recommends optimal pricing from demand and seasonality signals.",
  },
];

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.card}`, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.card}`,
          start: "top 80%",
        },
      });
      gsap.from(`.${styles.feature}`, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.featureGrid}`,
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="project">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Featured Project</span>
        <h2 className={styles.heading}>HostelMate</h2>
        <p className={styles.sub}>
          Smart Hostel Discovery &amp; Management Platform
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardGlow} aria-hidden="true" />
        <div className={styles.cardInner}>
          <div className={styles.cardLeft}>
            <span className={styles.badge}>Full-Stack · AI</span>
            <h3 className={styles.cardTitle}>
              An intelligent platform that reimagines how students discover and
              owners manage hostels.
            </h3>
            <p className={styles.cardDesc}>
              HostelMate blends a polished discovery experience with an
              analytics-rich owner suite — powered by AI that summarizes reviews
              and optimizes pricing in real time.
            </p>
            <div className={styles.stack}>
              {["Python", "JavaScript", "AI/ML", "Analytics"].map((t) => (
                <span key={t} className={styles.stackChip}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.feature}>
                <span className={styles.featureDot} />
                <h4 className={styles.featureTitle}>{f.title}</h4>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
