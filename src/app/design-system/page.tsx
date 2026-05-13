import type { Metadata } from "next";
import Image from "next/image";
import { MaekLogo } from "../components/MaekLogo";

export const metadata: Metadata = {
  title: "Editorial Intelligence Design System",
  description:
    "A MAEK subpage defining an editorial, OpenAI-reference-informed design system for explaining evidence intelligence.",
  alternates: {
    canonical: "/design-system",
  },
};

const adoptionFriction = [
  {
    title: "적용의 막막함",
    body: [
      "AI 교육은 들었지만, 막상 보고서·기획·고객 대응·개발 업무에 어떻게 연결해야 할지 모릅니다.",
      "배운 것은 많은데, 실제 업무로 옮기는 기준이 없습니다.",
    ],
  },
  {
    title: "팀 안의 격차",
    body: [
      "어떤 직원은 AI로 업무 속도를 높이고, 어떤 직원은 아직 첫 프롬프트도 어렵게 느낍니다.",
      "조직 안에서 AI 활용 수준의 차이가 점점 커집니다.",
    ],
  },
  {
    title: "기준의 부재",
    body: [
      "리더는 어디까지 도입할지 고민하고, 실무자는 어디까지 믿고 써도 되는지 묻습니다.",
      "방향은 있지만, 함께 따를 기준은 아직 명확하지 않습니다.",
    ],
  },
  {
    title: "낯선 개발 언어",
    body: [
      "footer, header, popup, modal, API key, Next.js.",
      "어려운 기술 용어는 아닌데도, 익숙하지 않은 단어들이 계속 쏟아지면서 작은 수정 하나에도 긴장하게 됩니다.",
      "모두가 빠르게 배우고 있지만, 따라가는 것만으로도 이미 많은 에너지를 쓰고 있습니다.",
    ],
  },
];

const solutionAreas = [
  ["보고서", "회의록과 자료를 넣으면 요약, 목차, 핵심 주장, 근거 문장을 함께 정리합니다."],
  ["기획", "아이디어가 흐릿할 때 목표, 대상, 기능, 일정, 우선순위를 질문하며 기획안 형태로 바꿉니다."],
  ["고객 대응", "자주 들어오는 문의를 상황별 답변 템플릿으로 만들고, 말투와 책임 범위를 맞춥니다."],
  ["개발 요청", "footer, modal, API key처럼 낯선 단어가 나와도 수정 요청을 개발자가 이해할 문장으로 바꿉니다."],
  ["운영 체크", "반복 업무를 체크리스트, 승인 흐름, 담당자 메모로 정리해 놓치는 일을 줄입니다."],
  ["교육 자료", "부서별 수준에 맞춰 실습 예제, 용어 설명, 따라 해볼 과제를 작게 나눕니다."],
  ["배포 준비", "도메인, 환경 변수, 저장소, 권한, 테스트 URL처럼 배포 전에 필요한 항목을 점검합니다."],
  ["내부 확산", "잘 된 예시를 사내 템플릿으로 남기고, 다음 팀이 그대로 시작할 수 있게 만듭니다."],
];

const supportTools = [
  {
    title: "쉬운 용어집",
    body: "header, footer, popup, modal, API, prompt 같은 단어를 업무 상황 안에서 바로 찾아볼 수 있게 정리합니다.",
  },
  {
    title: "그림 용어집",
    body: "말로만 들으면 헷갈리는 흐름을 화면, 화살표, 전후 비교로 보여줘 비개발자도 맥락을 잡게 합니다.",
  },
  {
    title: "업무 템플릿",
    body: "보고서, 기획안, 고객 답변, 회의 정리, 개발 수정 요청을 바로 복사해 쓸 수 있는 형태로 제공합니다.",
  },
  {
    title: "역방향 프롬프팅",
    body: "내가 뭘 원하는지 설명하지 못할 때 AI가 목적, 대상, 제약, 결과물 형식을 먼저 물어보게 만듭니다.",
  },
];

const promptExamples = [
  {
    title: "무엇을 만들지 모를 때",
    text: "AI가 먼저 묻습니다. 누구를 위한 결과물인가요? 오늘 바로 필요한 건 초안인가요, 의사결정인가요, 실행 체크리스트인가요?",
  },
  {
    title: "용어가 막힐 때",
    text: "AI가 단어를 설명하는 데서 멈추지 않고, 지금 화면에서 그 단어가 어디에 있고 무엇을 바꾸는지 함께 보여줍니다.",
  },
  {
    title: "배포가 어려울 때",
    text: "AI가 회사의 도메인, 저장소, 보안 규칙, 승인 절차를 확인하고 지금 환경에서 가능한 배포 경로를 제안합니다.",
  },
];

const deploymentSteps = [
  "먼저 회사가 이미 쓰는 도구를 확인합니다: GitHub, Vercel, Cloudflare, 사내 서버, 도메인, 계정 권한.",
  "테스트 URL을 만들고, 실제 화면에서 깨지는 지점과 수정해야 할 문구를 함께 점검합니다.",
  "환경 변수, API key, 이미지, sitemap, 검색 등록 파일처럼 배포에서 자주 막히는 항목을 체크합니다.",
  "대표님과 실무자가 같은 화면을 보며 승인할 수 있도록 변경 내역과 확인 기준을 짧게 남깁니다.",
  "배포 후에도 수정, 롤백, 검색 등록, 내부 공유까지 이어지는 운영 절차를 정리합니다.",
];

const principles = [
  {
    title: "People before tools.",
    body: "AI 전환의 시작점은 기술이 아니라 사람입니다. 직원들은 낯선 프롬프트와 바이브코딩 사이에서 매일 새로운 방식을 익히고, 리더는 뒤처지지 않기 위해 빠르게 판단해야 합니다. 우리는 조직 구성원이 불안이 아니라 이해를 바탕으로 AI를 사용할 수 있도록 돕습니다.",
  },
  {
    title: "Make AI practical.",
    body: "AI는 멋진 데모보다 실제 업무에서 작동해야 합니다. 보고서, 기획, 개발, 고객 대응, 운영 업무처럼 반복되는 일 속에서 AI가 어디에 도움이 되는지 찾고, 바로 사용할 수 있는 워크플로우로 바꿉니다.",
  },
  {
    title: "Align leaders and teams.",
    body: "CEO는 방향을 고민하고, 실무자는 기준을 묻습니다. AI를 어디까지 도입할지, 어떤 결과물을 신뢰할지, 누가 검토하고 책임질지를 함께 정리해야 조직이 같은 속도로 움직일 수 있습니다.",
  },
  {
    title: "Build calm momentum.",
    body: "AI 변화는 너무 빠르고, 정보는 너무 많습니다. 우리는 조직이 유행을 따라가기보다 필요한 것부터 작게 시작하고, 검증하고, 확장할 수 있도록 돕습니다. 빠르지만 무리하지 않고, 신중하지만 멈추지 않는 전환을 만듭니다.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.72rem] font-semibold uppercase leading-none tracking-[0.18em] text-[#5f6470]">
      {children}
    </p>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <header className="sticky top-0 z-20 border-b border-[#e7e2d9]/80 bg-white/92 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5">
          <MaekLogo />
          <nav className="hidden">
            <a href="#references" className="transition hover:text-[#171717]">
              Context
            </a>
            <a href="#tokens" className="transition hover:text-[#171717]">
              Examples
            </a>
            <a href="#components" className="transition hover:text-[#171717]">
              Toolkit
            </a>
          </nav>
          <a
            href="/system-flow"
            className="hidden"
            style={{ color: "#ffffff" }}
          >
            System flow
          </a>
        </div>
      </header>

      <section className="px-4 pb-12 pt-20 sm:px-6 md:pb-16 md:pt-24 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-[880px] text-center">
            <p className="text-[0.78rem] font-semibold text-[#5f6470]">
              Design system
            </p>
            <h1 className="mt-7 text-[clamp(3rem,4.4vw,5rem)] font-semibold leading-[1.02] tracking-normal">
              Design systems that make evidence easier to trust.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-[clamp(1rem,1.25vw,1.18rem)] leading-8 text-[#4f555b]">
              MAEK pages should feel like evidence essays: restrained, readable, and built around source material
              people can inspect.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#tokens"
                className="rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#27313a]"
                style={{ color: "#ffffff" }}
              >
                사례 보기
              </a>
              <a
                href="#references"
                className="rounded-full bg-[#f7f5f0] px-5 py-3 text-sm font-semibold text-[#171717] transition hover:bg-[#eee9df]"
              >
                전환 맥락
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="references" className="border-t border-[#e7e2d9] bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto max-w-[820px] text-center">
            <SectionLabel>Reference method</SectionLabel>
            <h2 className="mt-5 text-[clamp(2rem,2.8vw,3rem)] font-semibold leading-[1.08] tracking-normal">
              AI pages need restraint, proof, and room for context.
            </h2>
          </div>

          <div className="mx-auto mt-14 max-w-[860px] text-lg leading-8 text-[#171717]">
            <p>
              <strong>AI Transformation:</strong> 우리는 AI 도입을 단순히 새로운 도구를 배우는 일이 아니라, 조직이 더
              빠른 변화 속에서도 흔들리지 않고 일하는 방식을 다시 정리하는 과정으로 봅니다. AI가 복잡해질수록
              중요한 것은 더 많은 용어를 아는 것이 아니라, 우리 조직에 맞는 기준과 실행 방식을 갖추는 것입니다.
            </p>
            <ul className="mx-auto mt-8 max-w-[800px] list-disc space-y-5 pl-6 marker:text-[#171717] sm:-translate-x-3">
              {principles.map((item) => (
                <li key={item.title} className="pl-2">
                  <strong className="font-semibold text-[#171717]">{item.title}</strong> {item.body}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-24 max-w-5xl divide-y divide-[#e7e2d9] border-y border-[#e7e2d9]">
            {adoptionFriction.map((item) => (
              <article key={item.title} className="grid gap-4 py-6 md:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
                <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>
                <div className="grid gap-1 text-base leading-6 text-[#5a6168]">
                  {item.body.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tokens" className="bg-[#f7f5f0] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-[820px] text-center">
            <SectionLabel>What teams can build</SectionLabel>
            <h2 className="mt-5 text-[clamp(2rem,2.8vw,3rem)] font-semibold leading-[1.08] tracking-normal">
              작은 사례를 많이 보면서 감을 잡습니다.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5a6168]">
              AI를 어디에 써야 할지 모를 때는 거창한 전략보다 바로 눈앞의 예시가 먼저 필요합니다.
              보고서, 기획, 고객 대응, 개발 요청, 배포까지 실제 업무 단위로 쪼개 보여줍니다.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-[#e7e2d9] bg-[#e7e2d9] sm:grid-cols-2 lg:grid-cols-4">
            {solutionAreas.map(([name, body], index) => (
              <div key={name} className="bg-white p-5">
                <span className="grid h-10 w-10 place-items-center rounded-[8px] border border-[#e7e2d9] bg-[#f7f5f0] font-mono text-xs text-[#0f766e]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 font-semibold">{name}</p>
                <p className="mt-2 text-sm leading-6 text-[#5f6470]">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-6 border-t border-[#e7e2d9] pt-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)]">
            <div>
              <p className="text-[clamp(1.9rem,2.8vw,3rem)] font-semibold leading-[1.08] tracking-normal">
                모르는 단어를 넘기지 않게 합니다.
              </p>
            </div>
            <div className="grid gap-4 text-[#4f555b]">
              <p className="text-xl font-semibold leading-tight text-[#171717]">Living glossary</p>
              <p className="text-base leading-7">
                용어집은 사전처럼 멀리 떨어져 있으면 잘 쓰이지 않습니다. 직원이 막히는 순간 바로 찾고,
                지금 보고 있는 화면과 연결해서 이해할 수 있어야 합니다.
              </p>
              <p className="text-base leading-7">
                그래서 footer, header, popup, modal, API key, Next.js 같은 기본 단어를 짧은 설명,
                그림, 실제 수정 사례와 함께 보여주는 방식이 필요합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="components" className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionLabel>Support toolkit</SectionLabel>
              <h2 className="mt-4 max-w-4xl text-[clamp(2rem,2.8vw,3rem)] font-semibold leading-[1.08] tracking-normal">
                설명보다 바로 써볼 수 있는 도구가 필요합니다.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#5a6168] md:text-right">
              교육 자료만 쌓이면 다시 막막해집니다. 용어, 그림, 템플릿, 질문 흐름을 한 화면에서 연결해
              다음 행동으로 넘어가게 만듭니다.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[8px] border border-[#e7e2d9] bg-[#e7e2d9] md:grid-cols-4">
            {supportTools.map((item) => (
              <article key={item.title} className="bg-[#f7f5f0] p-6">
                <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>
                <p className="mt-5 text-sm leading-6 text-[#5a6168]">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.56fr)_minmax(20rem,0.44fr)] lg:items-start">
            <figure className="overflow-hidden rounded-[8px] border border-[#e7e2d9] bg-white">
              <Image
                src="/images/maek-system-flow-cropped.png"
                alt="MAEK system flow diagram used as evidence media in the design system."
                width={1536}
                height={790}
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="h-auto w-full"
              />
              <figcaption className="border-t border-[#e7e2d9] px-5 py-4 text-sm text-[#5f6470]">
                그림으로 보는 용어집: 데이터, 화면, 질문, 결과물이 어떻게 이어지는지 한 장에서 확인합니다.
              </figcaption>
            </figure>

            <div className="grid gap-3">
              {promptExamples.map((item) => (
                <article key={item.title} className="rounded-[8px] border border-[#e7e2d9] bg-white p-5">
                  <p className="text-sm font-semibold text-[#0f766e]">{item.title}</p>
                  <p className="mt-3 text-base leading-7 text-[#27313a]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#171717] px-4 py-14 text-white sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)]">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase leading-none tracking-[0.18em] text-white/58">
              Deployment support
            </p>
            <h2 className="mt-4 text-[clamp(2rem,2.8vw,3rem)] font-semibold leading-[1.08] tracking-normal">
              회사 환경에 맞게 끝까지 올리는 절차.
            </h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[8px] border border-white/18 bg-white/18">
            {deploymentSteps.map((item, index) => (
              <li key={item} className="grid grid-cols-[4rem_minmax(0,1fr)] bg-[#171717]">
                <span className="border-r border-white/18 p-5 font-mono text-sm text-[#5eead4]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="p-5 text-lg leading-7 text-white/86">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="border-t border-[#e7e2d9] bg-white px-4 py-8 text-sm text-[#5f6470] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <MaekLogo />
          <p>MAEK editorial design system / 2026</p>
          <a href="/" className="font-semibold text-[#171717]">
            <span style={{ color: "#171717" }}>Home</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
