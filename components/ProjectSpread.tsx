'use client';

import Link from 'next/link';
import { CopywritingSpread } from './CopywritingSpread';
import { EditorialSpread } from './EditorialSpread';
import { Reveal } from './Reveal';
import { WorkChapterMotion } from './WorkChapterMotion';
import { ProjectImage } from './ProjectVisual';
import { projectDetails } from '../src/data/projectDetails';

const categoryNames: Record<string, string> = {
  editorial: 'EDITORIAL',
  copywriting: 'COPYWRITING',
  'moving-image': 'MOVING IMAGE',
  'visual-interactive': 'VISUAL & INTERACTIVE',
};

const projectsWithoutLinks = new Set(['boundary', 'xunwei', 'panda-life']);

type Project = {
  id: string;
  order: number;
  category: string;
  layout: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  tags: string[];
  url: string;
  cta: string;
};

type Detail = {
  statement: string;
  brief: string;
  role: string;
  contribution: string;
  outcome: string;
  gallery: string[];
  needs: string[];
};

const imagePurposes: Record<string, string[]> = {
  'bird-retirement': [
    '完整长图 / 证明内容全貌与整体结构',
    '开篇细节 / 展示标题层级与视觉调性',
    '正文中段 / 展示图文编辑与信息组织',
  ],
  'shehong-city': [
    '完整城市图文 / 展示作品全貌',
    '城市主题页 / 展示主题建立与图文结合',
    '中段图组 / 展示素材组织与叙事连续性',
  ],
  'ronghua-city': [
    '主题横幅 / 展示园区餐饮指南主视觉',
    '园区餐饮 / 展示店铺与菜品信息',
    '店铺推荐 / 展示位置与就餐特色',
    '日常便利 / 展示园区周边配套',
  ],
};

const scriptSections = [
  [
    '01 / OPENING',
    '一针一线，穿过古蜀千年的时间，也穿过一代代绣娘的指尖。针脚起落之间，山川草木、飞禽走兽被留在细密的经纬里。',
  ],
  [
    '02 / 蜀绣介绍',
    '针作笔，线为墨。蜀绣以柔软的丝线承载巴蜀风物，也以严谨的针法记录手艺人的耐心。光泽随角度流转，色彩在层层铺陈中生出呼吸。',
  ],
  [
    '03 / 采访引入',
    '技艺被传承，不只因为它古老，更因为仍有人愿意把今天绣进其中。当传统走入当代生活，每一次落针，都是过去与现在的一次相遇。',
  ],
  [
    '04 / ENDING',
    '一针一线，绣的是风物，也是时间。经纬未尽，故事仍在继续。古蜀遗绣，也正沿着新的生活与新的目光，走向更远的地方。',
  ],
];

const brandCopy = [
  '光与影，是自然的笔触。\n当明暗相生，万物就有了廓形。',
  '东方之美，不止于被看见的颜色，也存在于留白、转折与若隐若现之间。光落下，勾勒骨相；影停驻，收住锋芒。',
  '浓淡并非对立，虚实亦可相生。循着面部本来的起伏，让每一道光都有来处，让每一处影都成为气韵的一部分。',
  '其实，讲述美，亦是一种修行。\n光影为笔，万物相生。\n浓淡之间，自然妆成。',
];

const acts = [
  [
    '01 / DATE · 约会',
    '奔赴所爱',
    '期待已久的相见，不该被突如其来的不适打断。整理好状态，也整理好心情，让每一步都朝着想见的人靠近。',
    '奔赴所爱，脚步不停。',
  ],
  [
    '02 / WORK · 职场',
    '奔赴所愿',
    '重要的提案、临时的任务、必须在场的时刻，都值得全力以赴。快速找回状态，让身体跟得上每一个想实现的愿望。',
    '奔赴所愿，脚步不停。',
  ],
  [
    '03 / TRAVEL · 旅行',
    '奔赴所想',
    '车票已经收好，风景也已经出发。别让身体的不适留住想远行的心，把轻松带在身边，继续去看更大的世界。',
    '奔赴所想，脚步不停。',
  ],
];

function Meta({
  project,
  detail,
  sticky = false,
  light = false,
}: {
  project: Project;
  detail: Detail;
  sticky?: boolean;
  light?: boolean;
}) {
  const href = project.url || `/work/${project.id}/`;
  const external = Boolean(project.url);
  const showLink = !projectsWithoutLinks.has(project.id);
  return (
    <aside
      className={`chapter-meta${sticky ? ' chapter-meta--sticky' : ''}${light ? ' chapter-meta--light' : ''}`}
    >
      <div className="chapter-index">
        <span>PROJECT NO.</span>
        <strong>{String(project.order).padStart(2, '0')}</strong>
      </div>
      <div className="chapter-category">
        <span>CATEGORY</span>
        <strong>{categoryNames[project.category]}</strong>
      </div>
      <div className="chapter-title">
        <p>{project.subtitle}</p>
        <h3>{project.title}</h3>
      </div>
      <div className="chapter-facts">
        <div>
          <span>PROJECT BACKGROUND</span>
          <p>{detail.brief}</p>
        </div>
        <div>
          <span>MY ROLE</span>
          <p>{detail.role}</p>
        </div>
        <div>
          <span>YEAR</span>
          <p>{project.year}</p>
        </div>
      </div>
      <p className="chapter-tags">{project.tags.join(' · ')}</p>
      {showLink && (
        <Link
          className="chapter-cta"
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
        >
          <span>{project.cta}</span>
          <i aria-hidden="true">↗</i>
        </Link>
      )}
    </aside>
  );
}

function Image({
  project,
  file,
  className = '',
}: {
  project: Project;
  file: string;
  className?: string;
}) {
  return (
    <ProjectImage
      slug={project.id}
      file={file}
      title={project.title}
      className={className}
    />
  );
}

// oxlint-disable-next-line no-unused-vars -- retained as a legacy chapter template for existing project detail pages
function EditorialChapter({
  project,
  detail,
}: {
  project: Project;
  detail: Detail;
}) {
  const files = detail.gallery;
  const purposes = imagePurposes[project.id] || [];
  return (
    <div className="chapter-layout chapter-editorial">
      <Reveal className="chapter-meta-column">
        <Meta project={project} detail={detail} sticky />
      </Reveal>
      <div className="chapter-body editorial-body">
        <Reveal className="chapter-statement">
          <span>CREATIVE NOTE</span>
          <h4>{detail.statement}</h4>
          <p>{detail.contribution}</p>
        </Reveal>
        {files.length ? (
          <>
            <Reveal className="editorial-full" delay={0.06}>
              <figure>
                <Image project={project} file={files[0]} />
                <figcaption>
                  <b>01 / FULL VIEW</b>
                  {purposes[0]}
                </figcaption>
              </figure>
            </Reveal>
            <div className="editorial-details">
              {files.slice(1).map((file, index) => (
                <Reveal key={file} delay={index * 0.07}>
                  <figure>
                    <Image project={project} file={file} />
                    <figcaption>
                      <b>{String(index + 2).padStart(2, '0')} / DETAIL</b>
                      {purposes[index + 1]}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <Reveal className="chapter-material-note">
            <span>FULL ARTICLE AVAILABLE</span>
            <p>
              完整长图与关键页面素材待接入；章节结构已经为原作全貌、封面、信息页和收束页预留。
            </p>
          </Reveal>
        )}
        <Reveal className="chapter-outcome">
          <span>OUTCOME</span>
          <p>{detail.outcome}</p>
        </Reveal>
      </div>
    </div>
  );
}

// oxlint-disable-next-line no-unused-vars -- retained as a legacy chapter template for existing project detail pages
function TravelChapter({
  project,
  detail,
}: {
  project: Project;
  detail: Detail;
}) {
  return (
    <div className="chapter-travel">
      <Reveal>
        <Meta project={project} detail={detail} />
      </Reveal>
      <div className="travel-journal">
        <Reveal className="travel-journal-lead">
          <span>TRAVEL JOURNAL / 媒体转载作品</span>
          <h4>{detail.statement}</h4>
          <p>
            中国科技新闻网转载 ·
            以个人游历视角串联地域文化、自然景观与生活体验。
          </p>
        </Reveal>
        <Reveal className="travel-journal-image">
          <Image project={project} file="01.webp" />
        </Reveal>
        <div className="travel-journal-copy">
          <Reveal>
            <span>01 / 导语</span>
            <p>
              春日抵达青神，山水不是静止的背景，而是地方生活缓慢展开的入口。沿着街巷、江岸与树影，城市的文化气息在行走中逐渐显现。
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <span>02 / 地域与人文</span>
            <p>
              {detail.contribution}{' '}
              写作把景观信息放进真实感受里，让地方记忆与个人观察彼此回应。
            </p>
          </Reveal>
        </div>
        <div className="travel-journal-gallery">
          {detail.gallery.slice(1).map((file, index) => (
            <Reveal key={file} delay={index * 0.06}>
              <figure>
                <Image project={project} file={file} />
                <figcaption>
                  {['景观与地域', '人文与建筑', '环境与氛围'][index]}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="chapter-outcome">
          <span>PUBLICATION</span>
          <p>{detail.outcome}</p>
        </Reveal>
      </div>
    </div>
  );
}

// oxlint-disable-next-line no-unused-vars -- retained as a legacy chapter template for existing project detail pages
function CopyChapter({
  project,
  detail,
}: {
  project: Project;
  detail: Detail;
}) {
  const isScript = project.id === 'gushu-yixiu';
  const isBrand = project.id === 'maogeping';
  return (
    <div className={`chapter-layout chapter-copy chapter-copy--${project.id}`}>
      <Reveal className="chapter-meta-column">
        <Meta project={project} detail={detail} sticky />
      </Reveal>
      <div className="chapter-body copy-reader">
        <Reveal className="chapter-statement">
          <span>WRITING STATEMENT</span>
          <h4>{detail.statement}</h4>
          <p>{detail.contribution}</p>
        </Reveal>
        {isScript && (
          <div className="copy-sections">
            {scriptSections.map(([label, copy], index) => (
              <Reveal
                key={label}
                className="copy-section"
                delay={index * 0.055}
              >
                <span>{label}</span>
                <p>{copy}</p>
                {index === 1 && <Image project={project} file="01.webp" />}
              </Reveal>
            ))}
          </div>
        )}
        {isBrand && (
          <div className="copy-sections brand-copy">
            {brandCopy.map((copy, index) => (
              <Reveal
                key={copy}
                className={`copy-section${index === 0 || index === 3 ? ' copy-section--emphasis' : ''}`}
                delay={index * 0.06}
              >
                <span>
                  {String(index + 1).padStart(2, '0')} / BRAND NARRATIVE
                </span>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        )}
        {!isScript && !isBrand && (
          <div className="copy-scenes">
            {acts.map(([label, title, copy, slogan], index) => (
              <Reveal key={label} className="copy-scene" delay={index * 0.065}>
                <span>{label}</span>
                <h4>{title}</h4>
                <p>{copy}</p>
                <strong>{slogan}</strong>
              </Reveal>
            ))}
          </div>
        )}
        {project.id === 'kuaike' && (
          <Reveal className="copy-product">
            <Image project={project} file="01.webp" />
          </Reveal>
        )}
        <Reveal className="chapter-outcome">
          <span>OUTCOME</span>
          <p>{detail.outcome}</p>
        </Reveal>
      </div>
    </div>
  );
}

function FilmChapter({
  project,
  detail,
}: {
  project: Project;
  detail: Detail;
}) {
  const [cover, ...stills] = detail.gallery;
  return (
    <div className="media-spread media-spread--film">
      <Reveal className="media-overview">
        <Meta project={project} detail={detail} light />
        {cover && (
          <figure className="media-cover media-cover--film">
            <Image project={project} file={cover} />
            {!projectsWithoutLinks.has(project.id) && (
              <a
                className="media-play"
                href={project.url || `/work/${project.id}/`}
                aria-label={`播放《${project.title}》`}
              >
                <span>PLAY FILM</span>
                <i aria-hidden="true">▶</i>
              </a>
            )}
          </figure>
        )}
      </Reveal>
      <div className="media-detail">
        <Reveal className="media-detail-intro">
          <span>SELECTED STILLS / FILM NOTE</span>
          <h4>{detail.statement}</h4>
          <p>{detail.contribution}</p>
        </Reveal>
        <div className="media-detail-grid media-detail-grid--film">
          {stills.slice(0, 4).map((file, index) => (
            <Reveal key={file} delay={index * 0.055}>
              <figure>
                <Image project={project} file={file} />
                <figcaption>
                  {String(index + 1).padStart(2, '0')} / FILM STILL
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="media-outcome">
          <span>RESPONSIBILITIES</span>
          <p>{detail.role}</p>
          <strong>{detail.outcome}</strong>
        </Reveal>
      </div>
    </div>
  );
}

function InterfaceChapter({
  project,
  detail,
}: {
  project: Project;
  detail: Detail;
}) {
  const isJingyun = project.id === 'jingyun';
  const primary = isJingyun ? 'qr.png' : detail.gallery[0];
  const details = isJingyun ? detail.gallery.slice(0, 8) : detail.gallery.slice(1);
  const visibleDetails =
    project.id === 'green-future' || isJingyun
      ? details
      : details.slice(0, 4);
  return (
    <div
      className={`media-spread media-spread--interface media-spread--${project.id}`}
    >
      <Reveal className="media-overview">
        <Meta project={project} detail={detail} />
        {primary && (
          <figure className="media-cover media-cover--interface">
            <Image project={project} file={primary} />
            <figcaption>
              {isJingyun ? 'QR CODE / H5 PREVIEW' : '01 / COMPLETE RESULT'}
            </figcaption>
          </figure>
        )}
      </Reveal>
      <div className="media-detail">
        <Reveal className="media-detail-intro">
          <span>KEY PAGES / DESIGN NOTE</span>
          <h4>{detail.statement}</h4>
          <p>{detail.contribution}</p>
        </Reveal>
        <div className="media-detail-grid media-detail-grid--interface">
          {visibleDetails.map((file, index) => (
            <Reveal key={file} delay={index * 0.055}>
              <figure>
                <Image project={project} file={file} />
                <figcaption>
                  {String(index + (isJingyun ? 1 : 2)).padStart(2, '0')} / KEY
                  PAGE
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="media-outcome">
          <span>OUTCOME</span>
          <p>{detail.outcome}</p>
        </Reveal>
      </div>
    </div>
  );
}

export function ProjectSpread({ project }: { project: Project }) {
  const detail = projectDetails[
    project.id as keyof typeof projectDetails
  ] as Detail;
  let content;
  const isEditorial = [
    'bird-retirement',
    'shehong-city',
    'ronghua-city',
    'shehong-food',
  ].includes(project.id);
  const isCopywriting = [
    'qingshen',
    'gushu-yixiu',
    'maogeping',
    'kuaike',
    'kaoyan-story',
  ].includes(project.id);
  if (isEditorial) content = <EditorialSpread project={project} />;
  else if (isCopywriting) content = <CopywritingSpread project={project} />;
  else if (['cinematic', 'documentary'].includes(project.layout))
    content = <FilmChapter project={project} detail={detail} />;
  else content = <InterfaceChapter project={project} detail={detail} />;

  return (
    <WorkChapterMotion
      id={`project-${project.id}`}
      order={project.order}
      className={`project-spread work-chapter work-chapter--${project.layout}${isEditorial ? ' work-chapter--editorial-spread' : ''}${isCopywriting ? ' work-chapter--copywriting-spread' : ''}`}
    >
      {content}
    </WorkChapterMotion>
  );
}
