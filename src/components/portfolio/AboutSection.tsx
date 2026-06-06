import { motion } from "framer-motion";
import styles from "./AboutSection.module.css";

const SKILL_TINTS: Record<string, string> = {
  amber: "var(--tint-amber)",
  purple: "var(--tint-purple)",
  blue: "var(--tint-blue)",
  emerald: "var(--tint-emerald)",
};

const PILLS: { label: string; tint: keyof typeof SKILL_TINTS }[] = [
  { label: "Python", tint: "amber" },
  { label: "Java", tint: "amber" },
  { label: "JavaScript", tint: "amber" },
  { label: "HTML", tint: "purple" },
  { label: "CSS", tint: "purple" },
  { label: "React", tint: "purple" },
  { label: "Data Structures", tint: "blue" },
  { label: "Algorithms", tint: "blue" },
  { label: "OOP", tint: "blue" },
  { label: "Machine Learning", tint: "emerald" },
  { label: "Data Science", tint: "emerald" },
  { label: "AI/LLMs", tint: "emerald" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  return (
    <section className={styles.section} id="about">
      <motion.span
        className={styles.orb + " " + styles.orbWarm}
        aria-hidden="true"
        animate={{ y: [0, -18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className={styles.orb + " " + styles.orbBlue}
        aria-hidden="true"
        animate={{ y: [0, 22, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className={styles.inner}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.eyebrow}>About</span>
          <h2 className={styles.heading}>
            Engineering intelligence into{" "}
            <span className={styles.headingAccent}>everyday products.</span>
          </h2>
          <p className={styles.body}>
            I'm Charan Reddy Yakkanti, a Computer Science undergraduate
            specializing in Artificial Intelligence and Data Science. I build
            full-stack applications where thoughtful design meets practical
            machine learning — turning raw data into experiences people
            actually enjoy using.
          </p>
          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <span className={styles.metaValue}>AI &amp; DS</span>
              <span className={styles.metaLabel}>Specialization</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaValue}>Full-Stack</span>
              <span className={styles.metaLabel}>Discipline</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaValue}>India</span>
              <span className={styles.metaLabel}>Andhra Pradesh</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.board}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.boardTitle}>Toolbox</p>
          <div className={styles.pills}>
            {PILLS.map((p, i) => (
              <motion.span
                key={p.label}
                className={styles.pill}
                style={{ ["--tint" as string]: SKILL_TINTS[p.tint] }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 * i, duration: 0.4 }}
              >
                {p.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
