import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface MagnetProps {
  children: ReactNode;
  /** How strongly the element pulls toward the cursor (px at edge). */
  strength?: number;
  className?: string;
}

/**
 * Wraps content and gently pulls it toward the cursor on hover,
 * springing back to center on leave. GPU-friendly transform only.
 */
export default function Magnet({
  children,
  strength = 24,
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setPos({ x: relX * strength * 2, y: relY * strength * 2 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 16, mass: 0.4 }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
