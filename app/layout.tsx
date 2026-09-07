import type { Metadata } from 'next';
import { GlowCursor } from '../components/GlowCursor';
import './globals.css';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '赵雨鑫｜新媒体内容创作者 Portfolio',
  description: '赵雨鑫个人作品集，涵盖新闻采编、公众号运营、品牌文案、短视频、视觉设计及 AIGC 创作。',
  alternates: { canonical: siteUrl },
  icons: { icon: `${siteUrl}/favicon.svg` },
  openGraph: {
    type: 'website', locale: 'zh_CN', url: siteUrl,
    title: '赵雨鑫｜新媒体内容创作者 Portfolio',
    description: '赵雨鑫个人作品集，涵盖新闻采编、公众号运营、品牌文案、短视频、视觉设计及 AIGC 创作。',
    images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: '赵雨鑫新媒体内容创作者作品集' }],
  },
  twitter: { card: 'summary_large_image', title: '赵雨鑫｜新媒体内容创作者 Portfolio', description: '内容 / 视觉 / 故事叙述', images: [`${siteUrl}/og.png`] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}<GlowCursor /></body></html>;
}
