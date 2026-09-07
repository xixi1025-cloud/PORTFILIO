import { profile } from '../src/data/profile'; import { Container } from './Container';
export function Footer() { return <footer><Container className="footer-inner"><span>© 2026 {profile.englishName}</span><span>CONTENT / VISUAL / STORYTELLING</span><a href="#top">BACK TO TOP ↑</a></Container></footer>; }
