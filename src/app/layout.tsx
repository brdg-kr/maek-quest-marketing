import type { Metadata, Viewport } from "next";
import { LocaleProvider } from "./components/LocaleProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://maek.quest"),
  title: {
    default: "MAEK | 바이브 코딩을 회사의 실제 업무 도구로 바꾸는 플랫폼",
    template: "%s | MAEK",
  },
  description:
    "개발을 모르는 직원도 아이디어를 입력하고 사내에서 바로 사용할 수 있는 업무 웹 서비스를 만들 수 있게 돕는 플랫폼.",
  keywords: [
    "바이브 코딩",
    "사내 업무 도구",
    "AI 업무 자동화",
    "내부 도구",
    "업무앱",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MAEK | 바이브 코딩을 회사의 실제 업무 도구로 바꾸는 플랫폼",
    description:
      "기획, 화면 구성, 기능 설명, 배포, 실행 환경까지 한 번에 지원합니다.",
    url: "https://maek.quest",
    siteName: "MAEK",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAEK | 바이브 코딩을 회사의 실제 업무 도구로 바꾸는 플랫폼",
    description:
      "개발을 모르는 직원도 만드는 사내 업무 서비스.",
  },
  icons: {
    icon: "/maek-logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
