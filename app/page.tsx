import { About } from '../components/About';
import { Awards } from '../components/Awards';
import { Contact } from '../components/Contact';
import { Experience } from '../components/Experience';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { Navbar } from '../components/Navbar';
import { Portfolio } from '../components/Portfolio';

export default function Home() {
  return <><Navbar /><main><Hero /><About /><Experience /><Portfolio /><Awards /><Contact /></main><Footer /></>;
}
