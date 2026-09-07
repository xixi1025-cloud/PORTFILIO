import { profile } from '../src/data/profile';
export function SkillsGrid() { return <div className="skills-grid">{profile.skills.map(skill => <article key={skill.id}><span>{skill.id}</span><h3>{skill.name}</h3><p>{skill.detail}</p></article>)}</div>; }
