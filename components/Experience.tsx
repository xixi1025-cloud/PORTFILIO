'use client';

import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { experiences } from '../src/data/experience';
import { Container } from './Container';
import { ExperienceItem } from './ExperienceItem';
import { SectionHeader } from './SectionHeader';

export function Experience() {
  const reduced = useReducedMotion();

  return (
    <section
      id="experience"
      className="section section-surface experience-section"
    >
      <Container>
        <SectionHeader
          number="02"
          label="EXPERIENCE"
          title="Practice and accumulation."
        />
        <div className="experience-timeline">
          <div className="experience-line" aria-hidden="true">
            <MotionConfig reducedMotion="never">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: reduced ? 0 : 1.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </MotionConfig>
          </div>
          {experiences.map((item, index) => (
            <ExperienceItem
              key={item.period + item.organization}
              item={item}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
