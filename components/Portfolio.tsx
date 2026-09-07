import { Container } from './Container';
import { ProjectSpread } from './ProjectSpread';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { projects } from '../src/data/projects';

export function Portfolio() {
  return (
    <section id="work" className="portfolio-editorial">
      <Container className="portfolio-intro">
        <Reveal>
          <SectionHeader
            number="03"
            label="SELECTED WORKS"
            title="Works speak for themselves."
          />
        </Reveal>
      </Container>
      <div className="project-spreads">
        {projects.map((project) => <ProjectSpread key={project.id} project={project} />)}
      </div>
    </section>
  );
}
