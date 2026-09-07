'use client';

import Link from 'next/link';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { ProjectImage } from './ProjectVisual';
import { Reveal } from './Reveal';

type Project = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  url: string;
};

const collageFrames: Record<string, string[]> = {
  'bird-retirement': ['01.webp', '02.webp', '03.webp'],
  'shehong-city': ['01.webp', '02.webp', '03.webp'],
  'ronghua-city': ['display-01.png', 'display-02.png', 'display-03.png'],
  'shehong-food': ['01.png'],
};

function Overview({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  return (
    <MotionConfig reducedMotion="never">
    <motion.div
      className="editorial-spread-visual"
      initial={{ opacity: 0, y: 32, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduced ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="editorial-collage" aria-label={`${project.title}公众号作品版面节选`}>
        {(collageFrames[project.id] || ['01.webp']).map((file, index) => (
          <figure className="editorial-collage-panel" key={file}>
            <ProjectImage
              slug={project.id}
              file={file}
              title={`${project.title}公众号作品版面 ${index + 1}`}
            />
            <figcaption>
              {String(index + 1).padStart(2, '0')} / ARTICLE FRAME
            </figcaption>
          </figure>
        ))}
      </div>
    </motion.div>
    </MotionConfig>
  );
}

export function EditorialSpread({ project }: { project: Project }) {
  const reverse = project.order % 2 === 0;
  return (
    <div
      className={`editorial-spread${reverse ? ' editorial-spread--reverse' : ''}`}
    >
      <Reveal className="editorial-spread-info">
        <p className="editorial-spread-kicker">
          {String(project.order).padStart(2, '0')} / EDITORIAL
        </p>
        <div className="editorial-spread-heading">
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
        </div>
        <p className="editorial-spread-description">{project.description}</p>
        <ul className="editorial-spread-keywords">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {project.id === 'ronghua-city' && (
          <figure className="editorial-spread-cover editorial-spread-cover--park-dining">
            <ProjectImage
              slug={project.id}
              file="04.png"
              title={`${project.title}公众号首图`}
              eager
            />
          </figure>
        )}
        {project.url ? (
          <Link
            className="editorial-spread-cta editorial-spread-cta--desktop"
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            <span>VIEW ARTICLE</span>
            <i aria-hidden="true">↗</i>
          </Link>
        ) : (
          <p className="editorial-spread-available editorial-spread-available--desktop">
            FULL ARTICLE AVAILABLE
          </p>
        )}
      </Reveal>
      <Overview project={project} />
      <div className="editorial-spread-action--mobile">
        {project.url ? (
          <Link
            className="editorial-spread-cta"
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            <span>VIEW ARTICLE</span>
            <i aria-hidden="true">↗</i>
          </Link>
        ) : (
          <p className="editorial-spread-available">FULL ARTICLE AVAILABLE</p>
        )}
      </div>
    </div>
  );
}
