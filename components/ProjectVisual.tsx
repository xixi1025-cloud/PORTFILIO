'use client';
import { useState } from 'react';

const imageModules = {
  ...import.meta.glob('../src/assets/projects/*.webp', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
  ...import.meta.glob('../src/assets/projects/**/*.webp', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
  ...import.meta.glob('../src/assets/projects/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
  ...import.meta.glob('../src/assets/projects/**/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
  ...import.meta.glob('../src/assets/projects/*.jpg', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
  ...import.meta.glob('../src/assets/projects/**/*.jpg', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
} as Record<string, string>;

export function resolveImage(ending: string) {
  const source = Object.entries(imageModules).find(([path]) =>
    path.replaceAll('\\', '/').endsWith(ending),
  )?.[1];

  // Vite adds a dev-only HMR timestamp on one render path. Removing only that
  // transient suffix keeps the server and client markup identical.
  return source?.replace(/\?t=\d+$/, '');
}

export function ProjectImage({
  slug,
  file,
  title,
  className = '',
  eager = false,
}: {
  slug: string;
  file: string;
  title: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src = resolveImage(`/projects/${slug}/${file}`);

  if (!src || failed) {
    return (
      <div className={`spread-image-fallback ${className}`}>
        <span>VISUAL ASSET PENDING</span>
        <strong>{title}</strong>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={`${title}作品展示`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export function ProjectCover({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = resolveImage(`/projects/${image}`);
  if (!src || failed)
    return (
      <div className="detail-cover-fallback">
        <span>IMAGE TO BE PROVIDED</span>
        <strong>{title}</strong>
      </div>
    );
  return (
    <img
      className="detail-cover-image"
      src={src}
      alt={`${title}项目主视觉`}
      width="1600"
      height="1200"
      onError={() => setFailed(true)}
    />
  );
}

export function ProjectGallery({
  slug,
  files,
  presentation,
  title,
}: {
  slug: string;
  files: string[];
  presentation: string;
  title: string;
}) {
  return (
    <div className={`detail-gallery detail-gallery--${presentation}`}>
      {files.map((file, index) => {
        const src = resolveImage(`/projects/${slug}/${file}`);
        return (
          <figure key={file}>
            {src ? (
              <img
                src={src}
                alt={`${title}作品展示 ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="gallery-missing">
                IMAGE {String(index + 1).padStart(2, '0')}
              </div>
            )}
            <figcaption>
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(files.length).padStart(2, '0')}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
