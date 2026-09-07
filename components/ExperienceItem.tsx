'use client';

import { motion, MotionConfig, useReducedMotion } from 'framer-motion';

const experienceImages = [
  { src: '/experience-01.webp', alt: '新媒体运营与数据复盘场景' },
  { src: '/experience-02.webp', alt: '新闻编辑与融媒体工作场景' },
  { src: '/experience-03.webp', alt: '中铁产业园公众号视觉作品' },
  { src: '/experience-04.webp', alt: '北京国际电影节短视频单元荣誉盛典' },
];

type ExperienceEntry = {
  period: string;
  organization: string;
  role: string;
  descriptions: string[];
  outcome?: string;
  imageSuggestion: string;
};

export function ExperienceItem({
  item,
  index,
}: {
  item: ExperienceEntry;
  index: number;
}) {
  const reduced = useReducedMotion();
  const number = String(index + 1).padStart(2, '0');
  const image = experienceImages[index];

  return (
    <MotionConfig reducedMotion="never">
    <motion.article
      className="experience-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{
        duration: reduced ? 0 : 0.78,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="experience-meta">
        <span>STAGE {number}</span>
        <time>{item.period}</time>
      </div>
      <div className="experience-marker" aria-hidden="true">
        <motion.i
          initial={{ scale: 0.45, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: reduced ? 0 : 0.14,
          }}
        />
      </div>
      <div className="experience-stage">
        <div className="experience-content">
          <div className="experience-heading">
            <p>{item.role}</p>
            <h3>{item.organization}</h3>
          </div>
          <div className="experience-copy">
            {item.descriptions.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {item.outcome && (
              <p className="experience-outcome">{item.outcome}</p>
            )}
          </div>
        </div>
        <motion.figure
          className="experience-image-slot"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: reduced ? 0 : 0.72,
            delay: reduced ? 0 : 0.12,
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
          />
        </motion.figure>
      </div>
    </motion.article>
    </MotionConfig>
  );
}
