import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./ServicesSection.module.css";

const SERVICES = [
  {
    title: "Full-Stack Development",
    desc: "End-to-end web applications with clean architecture — responsive front-ends backed by robust APIs and databases.",
  },
  {
    title: "AI & Machine Learning",
    desc: "Designing and integrating ML models, LLM-powered features, and intelligent automation into real products.",
  },
  {
    title: "Data Science & Analytics",
    desc: "Turning raw datasets into actionable insight with statistical analysis, visualization, and predictive modeling.",
  },
  {
    title: "Product Engineering",
    desc: "Shipping polished, performant experiences — from interaction design to deployment and optimization.",
  },
];

export default function ServicesSection() {
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  };

  return (
    <section className={styles.section} id="services">
      <div className={styles.header}>
        <span className={styles.eyebrow}>What I Do</span>
        <h2 className={styles.heading}>Services</h2>
      </div>

      <div className={styles.list}>
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            className={styles.row}
            onMouseMove={handleMove}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <span className={styles.rowGlow} aria-hidden="true" />
            <span className={styles.num}>0{i + 1}</span>
            <div className={styles.center}>
              <h3 className={styles.title}>
                <span className={styles.dot} aria-hidden="true" />
                {s.title}
              </h3>
              <p className={styles.desc}>{s.desc}</p>
            </div>
            <ArrowUpRight className={styles.arrow} size={28} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
