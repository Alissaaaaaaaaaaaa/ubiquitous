import type { Metadata } from 'next';
import './globals.css';

const siteUrl =
  process.env.GITHUB_PAGES === 'true'
    ? 'https://alissaaaaaaaaaaaa.github.io/ubiquitous/'
    : 'https://a-signal-ai-briefing.hushed-owlet-9905.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'A/Signal — 每日 AI 资讯简报',
  description:
    '每日筛选并核验全球公开渠道中的重要 AI 动态，按时间、背景、内容与来源整理。',
  openGraph: {
    title: 'A/Signal — 每日 AI 资讯简报',
    description: '快讯很多，事实只有一个。每日 5–8 条经核验 AI 动态。',
    type: 'website',
    images: [
      {
        url: '/og.jpg',
        width: 1731,
        height: 909,
        alt: 'A/Signal — AI，不止快。还要准。',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A/Signal — 每日 AI 资讯简报',
    description: '快讯很多，事实只有一个。每日 5–8 条经核验 AI 动态。',
    images: ['/og.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
