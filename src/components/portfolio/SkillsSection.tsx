import { motion } from "framer-motion";
import { Terminal, Globe, Cpu, Brain } from "lucide-react";
import Magnet from "./Magnet";
import styles from "./SkillsSection.module.css";

const TINTS: Record<string, string> = {
  amber: "var(--tint-amber)",
  purple: "var(--tint-purple)",
  blue: "var(--tint-blue)",
  emerald: "var(--tint-emerald)",
};

const GROUPS = [
  {
    label: "Programming Languages",
    icon: Terminal,
    tint: "amber",
    skills: ["Python", "Java", "JavaScript", "C++"],
  },
  {
    label: "Web Technologies",
    icon: Globe,
    tint: "purple",
    skills: ["HTML", "CSS", "React", "TypeScript"],
  },
  {
    label: "CS Fundamentals",
    icon: Cpu,
    tint: "blue",
    skills: ["Data Structures", "Algorithms", "OOP", "OS"],
  },
  {
    label: "AI & Tools",
    icon: Brain,
    tint: "emerald",
    skills: ["Machine Learning", "Git", "VS Code", "Linux"],
  },
];

export default function SkillsSection() {
  return (
    <section className={styles.section} id="skills">
      {/* Ambient background glowing orbs */}
      <span className={`${styles.orb} ${styles.orbLeft}`} aria-hidden="true" />
      <span className={`${styles.orb} ${styles.orbRight}`} aria-hidden="true" />

      <div className={styles.header}>
        <span className={styles.eyebrow}>Capabilities</span>
        <h2 className={styles.heading}>Technical Skills</h2>
        <p className={styles.sub}>
          A foundation in software engineering, AI, and data science.
        </p>
      </div>

      <div className={styles.grid}>
        {GROUPS.map((group, groupIdx) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.label}
              className={styles.group}
              style={{ ["--tint" as string]: TINTS[group.tint] }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: groupIdx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.groupHeader}>
                <div className={styles.iconWrapper}>
                  <Icon className={styles.groupIcon} size={20} />
                </div>
                <h3 className={styles.groupLabel}>{group.label}</h3>
              </div>
              <div className={styles.skillList}>
                {group.skills.map((s) => (
                  <Magnet key={s} strength={8} className={styles.magnetWrapper}>
                    <div className={styles.skillTag}>
                      <span className={styles.skillDot} />
                      <span className={styles.skillName}>{s}</span>
                    </div>
                  </Magnet>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
