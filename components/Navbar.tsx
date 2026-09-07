'use client';
import { useEffect, useState } from 'react';
import { profile } from '../src/data/profile';

export function Navbar({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionHref = (href: string) => (home ? href : `../../${href}`);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a
        className="wordmark"
        href={home ? '#top' : '../../'}
        onClick={() => setOpen(false)}
      >
        {profile.englishName}
      </a>
      <nav className="nav-links" aria-label="主导航">
        {profile.nav.map((item) => (
          <a key={item.href} href={sectionHref(item.href)}>
            {item.label}
          </a>
        ))}
      </nav>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? '关闭导航菜单' : '打开导航菜单'}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <nav
        id="mobile-menu"
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        aria-label="移动端导航"
      >
        {profile.nav.map((item, index) => (
          <a
            key={item.href}
            href={sectionHref(item.href)}
            onClick={() => setOpen(false)}
          >
            <span>0{index + 1}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
