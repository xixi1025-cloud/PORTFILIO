'use client';

import {
  Cpu,
  FileText,
  GraduationCap,
  Grid2X2,
  ImageIcon,
  PenLine,
  Video,
} from 'lucide-react';
import { useState } from 'react';
import { profile } from '../src/data/profile';

const skillIcons = [FileText, PenLine, Video, ImageIcon, Cpu];

export function About() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const activate = (card: string) => setActiveCard(card);
  const finish = (card: string) => {
    setActiveCard((current) => (current === card ? null : current));
  };

  return (
    <section id="about" className="about-glass-section" aria-labelledby="about-title">
      <div className="about-glass-shell">
        <div className="about-glass-index">
          <i aria-hidden="true" />
          <span>01 / ABOUT</span>
        </div>

        <div className="about-glass-primary">
          <article className="about-glass-card about-glass-profile">
            <button
              type="button"
              className={activeCard === 'profile' ? 'is-active' : ''}
              onClick={() => activate('profile')}
              onAnimationEnd={() => finish('profile')}
              aria-label="个人介绍"
            >
              <span className="about-photo-placeholder">
                <img
                  src="/about-avatar.webp"
                  alt="赵雨鑫个人头像"
                  width="900"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="about-profile-copy">
                <h2 id="about-title">Hi, I’m {profile.name}</h2>
                <strong>Content Creator / New Media Storyteller</strong>
                <span className="about-profile-paragraphs">
                  {profile.aboutParagraphs.map((paragraph) => (
                    <span key={paragraph}>{paragraph}</span>
                  ))}
                </span>
              </span>
            </button>
          </article>

          <article className="about-glass-card about-glass-education">
            <button
              type="button"
              className={activeCard === 'education' ? 'is-active' : ''}
              onClick={() => activate('education')}
              onAnimationEnd={() => finish('education')}
              aria-label="教育经历"
            >
              <span className="about-card-heading">
                <span className="about-heading-icon" aria-hidden="true">
                  <GraduationCap />
                </span>
                <span>
                  <b>Education</b>
                  <small>教育经历</small>
                </span>
              </span>
              <span className="about-education-timeline">
                <span className="about-education-entry">
                  <b>西南交通大学｜新闻与传播｜硕士在读</b>
                  <small>2025.9 - Present</small>
                </span>
                <span className="about-education-entry">
                  <b>四川师范大学｜网络与新媒体｜本科</b>
                  <small>2021.9 - 2025.6</small>
                </span>
              </span>
            </button>
          </article>
        </div>

        <section className="about-skills-panel" aria-labelledby="skills-title">
          <div className="about-card-heading about-skills-heading">
            <span className="about-heading-icon about-heading-icon--small" aria-hidden="true">
              <Grid2X2 />
            </span>
            <span>
              <b id="skills-title">My Skills</b>
              <small>核心能力</small>
            </span>
          </div>
          <div className="about-skill-grid">
            {profile.skills.map((skill, index) => {
              const Icon = skillIcons[index];
              const card = `skill-${skill.id}`;

              return (
                <button
                  key={skill.id}
                  type="button"
                  className={activeCard === card ? 'about-skill-card is-active' : 'about-skill-card'}
                  onClick={() => activate(card)}
                  onAnimationEnd={() => finish(card)}
                  aria-label={`${skill.name}：${skill.detail}`}
                >
                  <span className="about-skill-number">{skill.id}</span>
                  <span className="about-skill-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <b>{skill.name}</b>
                  <small>{skill.detail}</small>
                </button>
              );
            })}
          </div>
        </section>

        <footer className="about-glass-footer" aria-hidden="true">
          <span>ZHAO YUXIN&nbsp;&nbsp; · &nbsp;&nbsp;PORTFOLIO 2026</span>
          <span>—&nbsp;&nbsp; A BRIGHTER TOMORROW &nbsp;&nbsp;—</span>
        </footer>
      </div>
    </section>
  );
}
