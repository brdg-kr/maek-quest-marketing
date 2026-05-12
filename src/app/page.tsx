import type { Metadata } from "next";
import { LandingExperience } from "./LandingExperience";

export const metadata: Metadata = {
  title: "바이브 코딩을 회사의 실제 업무 도구로 바꾸는 플랫폼",
  description:
    "MAEK은 개발을 모르는 직원도 아이디어를 입력하고 사내에서 바로 사용할 수 있는 업무 웹 서비스를 만들 수 있게 돕습니다.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <LandingExperience />;
}
