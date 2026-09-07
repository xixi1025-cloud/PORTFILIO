'use client';

import { motion, MotionConfig, useReducedMotion } from 'framer-motion';

export function WorkChapterMotion({
  children,
  className,
  id,
  order,
}: {
  children: React.ReactNode;
  className: string;
  id: string;
  order: number;
}) {
  const reduced = useReducedMotion();
  const direction = order % 2 === 0 ? -1 : 1;

  return (
    <MotionConfig reducedMotion="never">
      <motion.section
        id={id}
        className={className}
        initial={reduced ? false : { y: 68, x: direction * 14, scale: 0.988 }}
        whileInView={{ y: 0, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.06 }}
        transition={{
          duration: reduced ? 0 : 1.05,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.section>
    </MotionConfig>
  );
}
