import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '하나루프',
  description: '하나루프 프론트엔드 개발자 채용 과제',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
