import { Reveal } from './Reveal';

export function SectionHeader({ number, label, title, description }: { number: string; label: string; title: string; description?: string }) {
  return <Reveal className="section-header">
    <p className="section-index"><span>{number}</span> / {label}</p>
    <div><h2>{title}</h2>{description && <p className="section-intro">{description}</p>}</div>
  </Reveal>;
}
