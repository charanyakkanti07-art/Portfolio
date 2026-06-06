import { Check } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./ProjectShowcase.module.css";

interface Project {
  badge: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  stack: string[];
  accentGlow: string;
}

const PROJECTS: Project[] = [
  {
    badge: "Full-Stack · AI",
    title: "HostelMate",
    tagline: "Smart Hostel Discovery & Management Platform",
    desc: "An intelligent platform that reimagines how students discover and owners manage hostels — with AI that summarizes reviews and optimizes pricing in real time.",
    features: [
      "Role-based authentication for students, owners & admins",
      "AI review summarization with large language models",
      "Real-time analytics dashboards for owners",
      "Predictive price optimization from demand signals",
    ],
    stack: ["Python", "JavaScript", "AI/ML", "Analytics"],
    accentGlow: "oklch(0.74 0.17 55 / 0.2)",
  },
  {
    badge: "AI · Data Science",
    title: "IHEA",
    tagline: "Intelligent Health & Engagement Assistant",
    desc: "A data-driven assistant that analyzes user activity and surfaces personalized recommendations through a clean, responsive interface backed by ML models.",
    features: [
      "Personalized recommendations via ML models",
      "Interactive data visualization & insights",
      "Responsive, accessible front-end experience",
      "Scalable API with secure data handling",
    ],
    stack: ["Python", "Machine Learning", "React", "Data Viz"],
    accentGlow: "oklch(0.6 0.13 245 / 0.22)",
  },
];

export default function ProjectShowcase() {
  return (
    <section className={styles.section} id="project">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Selected Work</span>
        <h2 className={styles.heading}>Projects</h2>
        <p className={styles.sub}>
          Intelligent products built end to end — design, data, and deployment.
        </p>
      </div>

      <div className={styles.grid}>
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.title}
            className={styles.card}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={styles.cardInner}
              style={{ ["--accentGlow" as string]: p.accentGlow }}
            >
              <span className={styles.cardGlow} aria-hidden="true" />
              <span className={styles.badge}>{p.badge}</span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardTagline}>{p.tagline}</p>
              <p className={styles.cardDesc}>{p.desc}</p>
              <ul className={styles.features}>
                {p.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <Check className={styles.featureIcon} size={16} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className={styles.stack}>
                {p.stack.map((t) => (
                  <span key={t} className={styles.stackChip}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
