'use client';

import Image from 'next/image';
import { HeroWaterEffect } from './HeroWaterEffect';

export function Hero() {
  return (
    <section
      id="top"
      className="hero hero-cover hero-cover--image-only"
      aria-label="赵雨鑫个人作品集首页"
    >
      <Image
        className="hero-art-layer hero-art-background"
        src="/hero-water-background.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        priority
        unoptimized
      />
      <div className="hero-art-layer hero-art-butterfly" aria-hidden="true">
        <Image src="/hero-butterfly.webp" alt="" fill sizes="100vw" unoptimized />
      </div>
      <HeroWaterEffect />
      <div
        className="hero-art-layer hero-art-title hero-art-title--large"
        aria-hidden="true"
      >
        <Image src="/hero-title-large.png" alt="" fill sizes="100vw" unoptimized />
      </div>
      <div
        className="hero-art-layer hero-art-title hero-art-title--center"
        aria-hidden="true"
      >
        <Image src="/hero-title-center.png" alt="" fill sizes="100vw" unoptimized />
      </div>
      <div className="hero-art-caption">
        <h1 className="hero-sr-only">Portfolio</h1>
        <p className="hero-art-gratitude">感谢目光抵达</p>
        <p className="hero-art-credit">ZHAO YUXIN · PORTFOLIO 2026</p>
      </div>
    </section>
  );
}
