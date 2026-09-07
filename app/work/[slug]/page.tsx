import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '../../../components/Navbar';
import {
  ProjectCover,
  ProjectGallery,
} from '../../../components/ProjectVisual';
import { Reveal } from '../../../components/Reveal';
import { projectDetails } from '../../../src/data/projectDetails';
import { projects } from '../../../src/data/projects';

type Detail = (typeof projectDetails)[keyof typeof projectDetails];

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) return {};
  return {
    title: `${project.title}｜赵雨鑫作品集`,
    description: project.description,
    openGraph: {
      title: `${project.title}｜赵雨鑫作品集`,
      description: project.description,
      images: [],
    },
    twitter: {
      title: `${project.title}｜赵雨鑫作品集`,
      description: project.description,
      images: [],
    },
  };
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  const detail = projectDetails[slug as keyof typeof projectDetails] as
    | Detail
    | undefined;
  if (!project || !detail) notFound();
  const currentIndex = projects.findIndex((item) => item.id === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main
        className={`work-detail work-detail--split work-detail--${project.id}`}
      >
        <aside className="detail-overview">
          <div className="detail-overview-copy">
            <div className="detail-overline">
              <a href="/#work">← ALL WORK</a>
              <span>
                {String(currentIndex + 1).padStart(2, '0')} /{' '}
                {String(projects.length).padStart(2, '0')}
              </span>
            </div>
            <div className="detail-title-block">
              <p className="detail-category">
                {project.category.toUpperCase()} / {project.year}
              </p>
              <h1>{project.title}</h1>
              <p className="detail-subtitle">{project.subtitle}</p>
            </div>
            <dl className="detail-meta">
              <div>
                <dt>ROLE</dt>
                <dd>{detail.role}</dd>
              </div>
              <div>
                <dt>YEAR</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>OUTPUT</dt>
                <dd>{project.tags.slice(0, 3).join(' / ')}</dd>
              </div>
            </dl>
            <div
              className={`detail-overview-visual detail-overview-visual--${detail.presentation}`}
            >
              <ProjectCover image={project.image} title={project.title} />
            </div>
          </div>
        </aside>

        <div
          className="detail-scroll"
          tabIndex={0}
          aria-label={`${project.title}项目详情`}
        >
          <div className="detail-scroll-intro">
            <span>SCROLL TO EXPLORE</span>
            <span aria-hidden="true">↓</span>
          </div>

          {project.id !== 'kaoyan-story' && (
            <section className="detail-statement">
              <Reveal>
                <p className="detail-label">PROJECT STATEMENT</p>
                <h2>{detail.statement}</h2>
              </Reveal>
            </section>
          )}

          <section className="detail-story">
            <div className="detail-story-label">
              <span>01</span>
              <p>
                CONTEXT
                <br />& CONTRIBUTION
              </p>
            </div>
            <div className="detail-story-copy">
              <Reveal>
                <article>
                  <h3>项目背景</h3>
                  <p>{detail.brief}</p>
                </article>
              </Reveal>
              <Reveal delay={0.06}>
                <article>
                  <h3>我的贡献</h3>
                  <p>{detail.contribution}</p>
                </article>
              </Reveal>
              <Reveal delay={0.1}>
                <article>
                  <h3>项目结果</h3>
                  <p>{detail.outcome}</p>
                </article>
              </Reveal>
            </div>
          </section>

          <section className="detail-work">
            {project.id !== 'kaoyan-story' && (
              <div className="detail-work-heading">
                <p>
                  <span>02</span> / SELECTED MATERIAL
                </p>
                <h2>
                  作品不只是结果，
                  <br />
                  也是内容如何被组织。
                </h2>
              </div>
            )}
            <ProjectGallery
              slug={slug}
              files={detail.gallery}
              presentation={detail.presentation}
              title={project.title}
            />
          </section>

          <section className="detail-additions">
            <p className="detail-label">MATERIALS TO ADD</p>
            <div>
              <h2>待你补充的素材</h2>
              <ul>
                {detail.needs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  VIEW CURRENT LINK ↗
                </a>
              )}
            </div>
          </section>

          <a className="next-project" href={`/work/${next.id}/`}>
            <span>NEXT PROJECT</span>
            <strong>{next.title}</strong>
            <i aria-hidden="true">↗</i>
          </a>
          <div className="detail-endnote">
            © 2026 ZHAO YUXIN <span>CONTENT / VISUAL / STORYTELLING</span>
          </div>
        </div>
      </main>
    </>
  );
}
