import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://maek.quest"),
  title: {
    default: "MAEK | 데이터가 쌓이면, 지능이 확장됩니다",
    template: "%s | MAEK",
  },
  description:
    "흩어진 데이터를 모아 구조화하고, 확장 가능한 브레인으로 진화시키는 AI 데이터 인텔리전스 시스템입니다.",
  keywords: [
    "AI 데이터 인텔리전스",
    "데이터 구조화",
    "컨텍스트 브레인",
    "지식 시스템",
    "아이디어 생성",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MAEK | 데이터가 쌓이면, 지능이 확장됩니다",
    description:
      "데이터가 단순히 저장되는 것이 아니라, 연결되고 축적되고 확장되도록 설계합니다.",
    url: "https://maek.quest",
    siteName: "MAEK",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAEK | 데이터가 쌓이면, 지능이 확장됩니다",
    description:
      "흩어진 데이터를 살아있는 지능 시스템으로 만드는 MAEK의 데이터 엔진.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04060b",
  colorScheme: "dark",
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
