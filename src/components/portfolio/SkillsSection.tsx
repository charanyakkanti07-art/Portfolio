import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SkillsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const GROUPS = [
  {
    label: "Programming Languages",
    skills: ["Python", "Java", "JavaScript"],
  },
  {
    label: "Web Technologies",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    label: "CS Fundamentals",
    skills: ["Data Structures", "Algorithms", "OOP"],
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub", "VS Code"],
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
          <div key={group.label} className={styles.group}>
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

      <footer className={styles.footer}>
        <p className={styles.footerName}>Charan Reddy Yakkanti</p>
        <p className={styles.footerMeta}>
          AI &amp; Data Science · Andhra Pradesh, India
        </p>
      </footer>
    </section>
  );
}
