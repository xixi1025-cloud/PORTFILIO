'use client';
import { useState } from 'react';
const imageModules = import.meta.glob('../src/assets/projects/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;
type Project = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  imageAvailable: boolean;
  url: string;
  cta: string;
  featured?: boolean;
};
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const imageSrc = project.imageAvailable
    ? Object.entries(imageModules).find(([path]) =>
        path.endsWith(project.image),
      )?.[1]
    : undefined;
  const [failed, setFailed] = useState(false);
  const content = (
    <>
      <div className="project-image">
        {imageSrc && !failed ? (
          <img
            src={imageSrc}
            alt={`${project.title}项目展示图`}
            width="1600"
            height="1200"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            className="project-fallback"
            role="img"
            aria-label={`${project.title}的作品图待补充`}
          >
            <span>VISUAL MATERIAL</span>
            <strong>{project.title}</strong>
            <small>作品图待补充 / TO BE ADDED</small>
          </div>
        )}
        <span className="project-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="project-meta">
        <span>
          {project.category.toUpperCase()} / {project.year}
        </span>
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h4>{project.title}</h4>
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-description">{project.description}</p>
      <ul className="tag-list">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <p className="project-cta">VIEW PROJECT ↗</p>
    </>
  );
  return (
    <a
      className={`project-card ${project.featured ? 'featured' : ''}`}
      href={`/work/${project.id}/`}
      aria-label={`查看${project.title}项目详情`}
    >
      {content}
    </a>
  );
}
