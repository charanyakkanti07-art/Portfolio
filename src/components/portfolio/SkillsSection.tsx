import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SkillsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const TINTS: Record<string, string> = {
  amber: "var(--tint-amber)",
  purple: "var(--tint-purple)",
  blue: "var(--tint-blue)",
  emerald: "var(--tint-emerald)",
};

const GROUPS: { label: string; tint: keyof typeof TINTS; skills: string[] }[] = [
  {
    label: "Programming Languages",
    tint: "amber",
    skills: ["Python", "Java", "JavaScript"],
  },
  {
    label: "Web Technologies",
    tint: "purple",
    skills: ["HTML", "CSS", "React"],
  },
  {
    label: "CS Fundamentals",
    tint: "blue",
    skills: ["Data Structures", "Algorithms", "OOP"],
  },
  {
    label: "AI & Tools",
    tint: "emerald",
    skills: ["Machine Learning", "Git", "VS Code"],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.group}`, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.grid}`,
          start: "top 82%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="skills">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Capabilities</span>
        <h2 className={styles.heading}>Technical Skills</h2>
        <p className={styles.sub}>
          A foundation in software engineering, AI, and data science.
        </p>
      </div>

      <div className={styles.grid}>
        {GROUPS.map((group) => (
          <div
            key={group.label}
            className={styles.group}
            style={{ ["--tint" as string]: TINTS[group.tint] }}
          >
            <h3 className={styles.groupLabel}>{group.label}</h3>
            <ul className={styles.skillList}>
              {group.skills.map((s) => (
                <li key={s} className={styles.skill}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
