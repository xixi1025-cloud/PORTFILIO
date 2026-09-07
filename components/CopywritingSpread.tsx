'use client';

import Link from 'next/link';
import { ProjectCover, ProjectImage } from './ProjectVisual';
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

const gushuSections = [
  {
    label: '01 / 开头文案',
    copy: `沃土之上，古老的文明在这里流淌，
寻脉而往，千年的遗风有迹可循。

有一种美，始于针尖，韵泽八方，
讲述着流传千年的蜀中之宝，
念念不忘的东方印记。`,
  },
  {
    label: '02 / 蜀绣介绍',
    copy: `针法交错，绣出天地山川。
千变万化，勾勒人世锦绣。

蜀绣讲究以线代墨，以针代笔，
特点是针法严谨、片线光亮、针脚平齐、色彩明快，
各种针法交错使用，达到光色神韵，绣画合一之效。

蜀绣作品选材丰富，花草树木、飞禽走兽、
山水鱼虫、人物肖像等皆可入画，
是集美观性与实用性一体的艺术品。`,
  },
  {
    label: '03 / 采访引入',
    copy: `千年的重，指尖的轻，
拿得起，又岂能轻易放下。

一个人要穷尽多少巧思，耗尽多少坚持，
才能有精品传世？
千年前的古人不会隔空应答，
我们却在今天找到了答案。`,
  },
  {
    label: '04 / 结尾',
    copy: `一根简单的绣花针，绣出千变万化的绚烂光彩；
一条细弱的丝线，承接着传统技法的独特魅力。
十年如一日飞针走线，她的蜀绣针法在今天惊艳世人。

千年来，蜀绣有过繁华，也有过落寞，
正是一代又一代手艺人用守候、以创新来传承，
让这古老的技艺在新的时代焕发崭新的生命张力。

文化根脉不绝，
这张川渝大地传承千年的城市名片，
终将走向世界。`,
  },
];

const kuaikeScenes = [
  {
    label: '01 / DATE · 约会篇',
    copy: `你准备了很久，
一条裙子，试了半条街，
一张车票，省了半个月。
总觉得隔着电话线，思念太远，
于是你说见一面吧，
美好相约，共同期待。
可突如其来的感冒，
给你带来一场小风暴。`,
    ending: '还好有快克，\n奔赴所爱，脚步不停。',
  },
  {
    label: '02 / WORK · 职场篇',
    copy: `你熬了几个大夜，
发誓要做出点成绩。
城市里，霓虹灯耀眼繁华，
找不到几颗星星。
多写一份策划，多完成一份报表，
抓住任何可能，
你也想成为意气风发人们的其中一个。
这一次，机会终于降临。
可突如其来的感冒，让你乱了阵脚。`,
    ending: '还好有快克，\n奔赴所愿，脚步不停。',
  },
  {
    label: '03 / TRAVEL · 旅行篇',
    copy: `你习惯了忙碌，
好像生活被画了一个框，
每天都在原地打转。
他们说世界很美，
山川湖海，日月星辰，万物共生。
有一天，你突然厌倦了一成不变的生活，
想看看长白山的雪，做一回远行客。
收拾行囊，即刻出发，
可突如其来的感冒，延迟了你的步伐。`,
    ending: '还好有快克，\n奔赴所想，脚步不停。',
  },
];

const qingshenSections = [
  {
    heading: '',
    paragraphs: [
      '“在离成都一百二十公里之外，坐大巴需要两个小时”。这是记者出发前对于眉山市青神县仅有的认知。',
      '但这是一个很好的春日，天气朗晴，空气清新，在万物生长的季节里，生命力独享风流，一枝花，一棵草都充满生机，于是我开始期待这场即行的旅途将会遇见的风景、发生的故事。',
    ],
  },
  {
    heading: '人文之韵　品苏母风华',
    paragraphs: [
      '“劝夫以进、持家以智，孝以侍亲、柔以睦族，力学显门、直道荣世，家风润泽、光耀三苏”，苏东坡的母亲程夫人，一位伟大的传奇女性。',
      '探访苏母祠，似乎仍能从精美的建筑与展陈间窥见如诗如画的宋风胜景，沉浸在动静相宜的场景设计中，幻想千年前，她如何母仪若水，成为如此传世女子。',
      '一个个故事、一幅幅图片、一帧帧视频，恍惚跨越千年，与那位智慧与坚韧兼备的女子相见，读懂她为女、为妻、为媳、为母的一生，也就读懂了自古从未熄灭的女性力量是如何生生不息地磅礴与坚持。',
      '那些流传后世的人文精粹，那些传承永续的民风民俗，那份沉淀千年的历史韵味，就是一方土地精与魂。于是这方土地的厚重也昭然显现，浩荡的岷江穿流而过，孕育出代代英雄儿女，今天我们传颂着苏母诸流的故事，让她的精神成风化俗，流传在千万家中——文化根脉不绝。',
    ],
  },
  {
    heading: '自然之韵　访中古之地',
    paragraphs: [
      '青神，苏东坡的初恋地与求学地。',
      '九百多年前的一天，唤鱼池畔，那天的风应当如今日一般惬意，漫林碧透，鸟鸣声声。“十年生死两茫茫，不思量，自难忘”自此缘起。',
      '东坡先生在这留下的万千故事有多少湮灭了，我未可知，只能从崖壁仅存的古迹想象：那一年，他手书“唤鱼池”三字，春风得意，于是刀刻斧凿间，岩壁上红粉飘落，再经由岁月渐渐染上斑驳，直到今天，仍然有迹可循。',
      '至于其它，我亦只能从后人的口中窥见一二了。',
      '少有一次，离一方土地如此相近。“蜀国多仙山，青神中岩秀，细草微风，小桥流水，钟灵毓秀。”竹影摇曳，千岩竞秀，幽林静谧，寺庙庄重，一路走走停停，随喜随叹，仿若朝圣，也多了几分虔诚。',
      '步入深林，灵魂仿佛沾染上绿意，冥冥中听见来自千年前的耳语，是谁在轻叹，多少人踏入此地，那些近千年前的往事就多少次被提起，爱与遗憾的情早已与土地骨血相融，化为风，化为林，化为檐角的尘，石板的土，土地在，它们就能永存。',
      '这里有扎根生长的树，有四时流动的风，有亘古盘桓的石。于是你见过树，就见到生命的长青，听过风，就听过自然的韵律，触过石，就触到了千万年的历史。',
    ],
  },
  {
    heading: '生命之韵　寻春日流萤',
    paragraphs: [
      '山间的夜寒意料峭，有一种冷冷的寂静，天与地都静下来了，唯有风与不知名的虫在幽幽地鸣。为了等待萤火，我们此地停留。',
      '这是从未见过的春夜。溪水窄窄，月光明灭，草色如烟，流萤翩翩，我与一星漂浮的萤火短暂达成奇妙的共情。',
      '“逢君拾光彩，不吝此生轻”。传说腐草为萤，生为微光，却在最灿烂时结束一生，它如此美丽，幽微的绿光一现一隐，如此悲壮的美丽。',
      '它若浮游般生命中短短的一瞬，我第二十个青春的凡常日子，那一抹轻盈，缓缓地落在我心头，开始经年久月地闪动。',
      '几千年来，人们不止于仰望头顶，追逐苍穹与星光，亦会步入山野、小径、幽林，感动于大自然的馈赠与浪漫。',
      '最美人间四月天，来青神见一面吧。去苏母祠领略一位传奇女子的风采，在岷江河畔触摸流动千年的微风，行于千年中岩，栖于人间星河，望看竹里萤火，感受古朴的历史与自然的气息……这一方神奇的土地，若非亲自来过，难以体会它的奥秘；若非亲自走过，难以品味它的柔情。',
    ],
  },
];

function RepresentativeImage({ project }: { project: Project }) {
  if (project.id === 'qingshen')
    return (
      <ProjectCover image="qingshen-reading-cover.webp" title="青神地域摄影" />
    );
  if (project.id === 'maogeping')
    return (
      <ProjectCover
        image="maogeping-light-shadow-visual.png"
        title="毛戈平东方光影主题视觉"
      />
    );
  if (project.id === 'kaoyan-story')
    return (
      <ProjectImage
        slug={project.id}
        file="01.jpg"
        title="考研人物特稿开篇"
        className="kaoyan-story-cover"
      />
    );
  return (
    <ProjectImage
      slug={project.id}
      file="01.webp"
      title={`${project.title}代表图片`}
    />
  );
}

function QingshenDocument({ project }: { project: Project }) {
  return (
    <div className="copy-document copy-document--qingshen">
      <p className="copy-document-label">TRAVEL WRITING / 媒体转载作品</p>
      <h4>在青神，惊艳的不止是风景</h4>
      <p className="copy-document-deck">赵雨鑫 · 四川科技网刊发</p>
      <div className="copy-document-rule" />
      <div className="qingshen-article">
        {qingshenSections.map((section, index) => (
          <section key={section.heading || 'intro'}>
            {section.heading && <h5>{section.heading}</h5>}
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {index === 1 && (
              <div className="qingshen-article-break">
                QINGSHEN / SPRING 2024
              </div>
            )}
          </section>
        ))}
      </div>
      {project.url && (
        <Link
          className="copy-document-link"
          href={project.url}
          target="_blank"
          rel="noreferrer"
        >
          READ ORIGINAL <span aria-hidden="true">↗</span>
        </Link>
      )}
    </div>
  );
}

function GushuDocument() {
  return (
    <div className="copy-document copy-document--gushu">
      <header>
        <p className="copy-document-label">PROMOTIONAL FILM SCRIPT</p>
        <h4>《古蜀遗绣》</h4>
      </header>
      <div className="gushu-copy-grid">
        {gushuSections.map((section) => (
          <section key={section.label}>
            <h5>{section.label}</h5>
            <p>{section.copy}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

function MaogepingDocument() {
  return (
    <div className="copy-document copy-document--maogeping">
      <p className="copy-document-label">BRAND NARRATIVE / 东方光影</p>
      <h4>光影为笔，万物相生</h4>
      <div className="maogeping-copy">
        <p className="maogeping-lead">
          光与影，是自然的笔触。
          <br />
          当明暗相生，万物就有了廓形。
          <br />
          光与影，是东方的表达。
          <br />
          雕琢晕染，境界由此显现。
        </p>
        <p>
          我们真实地感知
          <br />
          光影的形塑如何使时间停摆
          <br />
          在一切的形与色之下
          <br />
          流传的气韵，
          <br />
          成为超越年轮的风雅
          <br />
          关于东方的记忆，
          <br />
          早已绵延成不朽的史诗
          <br />
          这一刻，想象，远在感知之外
        </p>
        <p>
          其实，讲述美，
          <br />
          亦是一种修行
          <br />
          如何在一张张东方相上
          <br />
          让光影的想象无限延伸
          <br />
          直到勾勒出深藏的雅韵
          <br />
          让东方之美，落拓于千面万象
          <br />
          直到展示出民族的、文化的、传统的本色
          <br />
        </p>
        <strong>
          这是毛戈平的修行——
          <br />
          光影为笔，万物相生
          <br />
          浓淡之间，自然妆成
        </strong>
      </div>
    </div>
  );
}

function KuaikeDocument() {
  return (
    <div className="copy-document copy-document--kuaike">
      <header>
        <p className="copy-document-label">COMMERCIAL COPY / 长文案</p>
        <h4>快克感冒药</h4>
      </header>
      <div className="kuaike-copy-grid">
        {kuaikeScenes.map((scene) => (
          <section key={scene.label}>
            <h5>{scene.label}</h5>
            <p>{scene.copy}</p>
            <strong>{scene.ending}</strong>
          </section>
        ))}
      </div>
    </div>
  );
}

function KaoyanStoryDocument() {
  const excerpts = [
    ['OPENING / 开篇', '01.jpg'],
    ['02 / 二次坚守', '02.jpg'],
    ['03 / 三次冲锋', '03.jpg'],
  ];

  return (
    <div className="copy-document copy-document--kaoyan-story">
      <header>
        <p className="copy-document-label">FEATURE STORY / 人物特稿</p>
        <h4>一次转身、二次坚守与三次冲锋</h4>
      </header>
      <div className="kaoyan-story-excerpts" aria-label="考研人物特稿版面节选">
        {excerpts.map(([label, file]) => (
          <figure key={label}>
            <ProjectImage
              slug="kaoyan-story"
              file={file}
              title={label}
            />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function OriginalDocument({ project }: { project: Project }) {
  if (project.id === 'qingshen') return <QingshenDocument project={project} />;
  if (project.id === 'gushu-yixiu') return <GushuDocument />;
  if (project.id === 'maogeping') return <MaogepingDocument />;
  if (project.id === 'kaoyan-story') return <KaoyanStoryDocument />;
  return <KuaikeDocument />;
}

export function CopywritingSpread({ project }: { project: Project }) {
  const articleHref =
    project.url || (project.id === 'kaoyan-story' ? `/work/${project.id}/` : '');
  const articleExternal = Boolean(project.url);

  return (
    <div className="copywriting-spread copywriting-spread--document">
      <Reveal className="copywriting-info">
        <p className="copywriting-kicker">
          {String(project.order).padStart(2, '0')} / COPYWRITING
        </p>
        <div className="copywriting-heading">
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
        </div>
        {project.id === 'qingshen' && (
          <p className="copywriting-publication">
            中国经济网、科技日报等媒体转载
          </p>
        )}
        <div className="copywriting-cover">
          <RepresentativeImage project={project} />
        </div>
        <p className="copywriting-description">{project.description}</p>
        <ul className="copywriting-keywords">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {articleHref && (
          <a
            className="copywriting-cta copywriting-cta--desktop"
            href={articleHref}
            target={articleExternal ? '_blank' : undefined}
            rel={articleExternal ? 'noreferrer' : undefined}
          >
            <span>{project.id === 'kaoyan-story' ? 'VIEW FULL ARTICLE' : 'READ ORIGINAL'}</span>
            <i aria-hidden="true">↗</i>
          </a>
        )}
      </Reveal>
      <Reveal className="copywriting-reader" delay={0.08}>
        <OriginalDocument project={project} />
      </Reveal>
      {articleHref && (
        <a
          className="copywriting-cta copywriting-cta--mobile"
          href={articleHref}
          target={articleExternal ? '_blank' : undefined}
          rel={articleExternal ? 'noreferrer' : undefined}
        >
          <span>{project.id === 'kaoyan-story' ? 'VIEW FULL ARTICLE' : 'READ ORIGINAL'}</span>
          <i aria-hidden="true">↗</i>
        </a>
      )}
    </div>
  );
}
