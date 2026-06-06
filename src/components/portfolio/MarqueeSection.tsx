import { motion } from "framer-motion";
import styles from "./MarqueeSection.module.css";

const WORDS = [
  "Machine Learning",
  "Full-Stack",
  "Python",
  "Data Science",
  "React",
  "AI Systems",
  "Problem Solving",
];

export default function MarqueeSection() {
  // Duplicate the list so the loop is seamless.
  const loop = [...WORDS, ...WORDS];

  return (
    <div className={styles.marquee} aria-hidden="true">
      <motion.div
        className={styles.track}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {loop.map((word, i) => (
          <span key={`${word}-${i}`} className={styles.item}>
            {word}
            <span className={styles.star}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
