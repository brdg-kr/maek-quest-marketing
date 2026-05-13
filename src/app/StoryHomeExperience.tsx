import Image from "next/image";
import { MaekLogo } from "./components/MaekLogo";

const deploymentSteps = [
  {
    index: "01",
    title: "상황을 먼저 정리",
    body: "대표의 교육, 직원의 바이브코딩, 회의실의 용어 충돌을 하나의 전환 신호로 묶습니다.",
  },
  {
    index: "02",
    title: "자료와 기준을 고정",
    body: "답변보다 먼저 출처, 최신성, 권한, 책임자를 보이게 만들어 개인 실험을 팀 자산으로 옮깁니다.",
  },
  {
    index: "03",
    title: "실행과 검증을 연결",
    body: "만든 도구가 실제 업무에 쓰일 때 승인, 기록, 재사용 기준이 함께 남도록 설계합니다.",
  },
];

const workLoopPanels = [
  {
    title: "AI 교육은 늘어나는데 적용 기준은 없다",
    body: "CEO는 뒤처지지 않으려 배우지만, 돌아오면 우리 자료와 업무에 어디부터 적용할지 다시 막힙니다.",
    meta: "Need / 적용 지도",
  },
  {
    title: "개인 도구가 팀 업무가 되는 순간",
    body: "직원이 만든 작은 자동화가 공유되면 속도보다 출처, 권한, 유지 방식이 먼저 필요해집니다.",
    meta: "Need / 운영 기준",
  },
  {
    title: "용어가 회의보다 앞서간다",
    body: "RAG, Agent, MCP 같은 단어가 늘수록 같은 문제를 다르게 이해하고 결정이 늦어집니다.",
    meta: "Need / 공통 언어",
  },
];

const accessRows = [
  {
    level: "개인 실험",
    situation: "바이브코딩, 프롬프트, 작은 업무 자동화",
    need: "출처 메모, 사용 범위, 실패 시 멈출 기준",
    output: "개인 도구를 팀에 보여줄 수 있는 초안",
  },
  {
    level: "팀 업무",
    situation: "문의 정리, 회의록, 견적, 제안서 초안",
    need: "공유 자료 패키지, 권한, 리뷰 흐름",
    output: "반복 업무에 붙일 수 있는 검증된 워크플로",
  },
  {
    level: "회사 운영",
    situation: "고객 응대, 내부 지식, 부서 간 의사결정",
    need: "감사 기록, 책임자, 업데이트 주기",
    output: "AI 사용이 회사 기준 안에 들어오는 운영 체계",
  },
];

const fieldSignals = [
  "경쟁사는 한다는데 우리는 어디서 시작해야 하는지 모른다.",
  "직원이 만든 도구가 좋아 보이지만 회사가 계속 써도 되는지 판단하기 어렵다.",
  "회의에서는 기술 용어가 늘고, 실제 불편함은 정리되지 않는다.",
  "AI를 도입했다는 말은 있지만 자료, 권한, 검증은 여전히 흩어져 있다.",
];

const resources = [
  {
    href: "/design-system",
    image: "/images/mobile-knowledge-graph.png",
    eyebrow: "Design system",
    title: "흰 배경과 미색 보조면으로 정리한 MAEK 시각 언어",
  },
  {
    href: "/ai-stage-map",
    image: "/images/mobile-dataset-package.png",
    eyebrow: "Stage map",
    title: "AI 전환의 현재 단계를 업무 기준으로 나누기",
  },
  {
    href: "/system-flow",
    image: "/images/mobile-knowledge-in-use.png",
    eyebrow: "System flow",
    title: "자료에서 실행까지 이어지는 구조 보기",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none">
      <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SmallMark({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#69707a]">{children}</p>;
}

export function StoryHomeExperience() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <header className="sticky top-0 z-20 border-b border-[#e7e2d9] bg-white/92 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5">
          <MaekLogo />
          <nav className="hidden items-center gap-7 text-sm font-medium text-[#4f555b] md:flex">
            <a href="/stories" className="transition hover:text-[#171717]">
              Stories
            </a>
            <a href="/design-system" className="transition hover:text-[#171717]">
              Design system
            </a>
            <a href="/system-flow" className="transition hover:text-[#171717]">
              System flow
            </a>
          </nav>
          <a
            href="/system-flow"
            className="inline-flex min-h-10 items-center rounded-full bg-[#171717] px-4 text-sm font-semibold text-white transition hover:bg-[#27313a]"
            style={{ color: "#ffffff" }}
          >
            System flow
          </a>
        </div>
      </header>

      <section className="px-4 pb-12 pt-16 sm:px-6 md:pb-16 md:pt-24 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold text-[#69707a]">MAEK for AI transition</p>
            <h1 className="mt-8 text-[clamp(5rem,16vw,13.5rem)] font-semibold leading-[0.82] tracking-normal text-[#1f2a44]">
              MAEK
            </h1>
            <p className="mx-auto mt-8 max-w-[760px] text-[clamp(1.25rem,2.2vw,1.9rem)] font-medium leading-9 text-[#27313a]">
              AI를 배워야 하는 압박을, 회사가 운영할 수 있는 자료와 기준으로 바꾸는 구조.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#field"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#171717] px-5 text-sm font-semibold text-white transition hover:bg-[#27313a]"
                style={{ color: "#ffffff" }}
              >
                현장 이슈 보기
                <ArrowIcon />
              </a>
              <a
                href="/design-system"
                className="inline-flex min-h-11 items-center rounded-full bg-[#f3f1ec] px-5 text-sm font-semibold text-[#171717] transition hover:bg-[#e9e4dc]"
              >
                디자인 시스템
              </a>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-[1120px]">
            <div className="relative min-h-[24rem] overflow-hidden rounded-[8px] border border-[#e7e2d9] bg-[#f7f5f0] md:min-h-[34rem]">
              <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-[#eaf3ef] ring-1 ring-[#0f766e]/20 md:top-20 md:h-80 md:w-80" />
              <div className="absolute left-1/2 top-48 h-44 w-[38rem] -translate-x-1/2 bg-gradient-to-b from-white/92 to-[#f7f5f0] md:top-60" />
              <div className="absolute left-1/2 top-28 grid w-[22rem] -translate-x-1/2 gap-2 text-center text-xs font-semibold text-[#0f766e]/50 md:top-36 md:w-[32rem] md:grid-cols-3">
                <span>교육</span>
                <span>바이브코딩</span>
                <span>용어 충돌</span>
                <span>자료 분산</span>
                <span>권한 불명확</span>
                <span>검증 부재</span>
              </div>
              <div className="absolute bottom-8 left-4 right-4 mx-auto max-w-3xl text-center">
                <h2 className="text-[clamp(2rem,4.2vw,4.1rem)] font-semibold leading-[0.98] tracking-normal">
                  현장의 불편함을 운영 구조로.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5a6168] md:text-lg md:leading-8">
                  애환을 그대로 보여주는 것이 아니라, 애환이 생기는 반복 상황과 그 안의 Needs를 정리합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="field" className="border-t border-[#e7e2d9] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[760px]">
          <SmallMark>Field premise</SmallMark>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,5.5rem)] font-semibold leading-[1] tracking-normal">
            빠른 도구보다 먼저 필요한 것은 계속 버틸 기준입니다.
          </h2>
          <div className="mt-8 grid gap-6 text-lg leading-9 text-[#30363d]">
            <p>
              회사 안의 AI 전환은 하나의 극적인 사건이 아니라 반복되는 운영 문제입니다. 교육은 늘어나고,
              직원은 작은 도구를 만들고, 회의실에는 새로운 용어가 들어오지만 자료와 책임의 기준은 그대로
              비어 있습니다.
            </p>
            <p>
              MAEK의 홈은 그 불편함을 감성 문장으로 소비하지 않습니다. 어떤 상황이 반복되는지, 그 상황에서
              어떤 Needs가 생기는지, 그리고 어떤 구조가 있어야 회사가 실제로 쓸 수 있는지 보여줍니다.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="text-center text-[clamp(2.1rem,4vw,4rem)] font-semibold leading-tight">
            현장 AI 전환을 배포하는 방법
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[8px] border border-[#e7e2d9] bg-[#e7e2d9] md:grid-cols-3">
            {deploymentSteps.map((step) => (
              <article key={step.index} className="bg-white p-6 md:min-h-[17rem] md:p-8">
                <p className="font-mono text-sm font-semibold text-[#0f766e]">{step.index}</p>
                <h3 className="mt-10 text-2xl font-semibold leading-tight">{step.title}</h3>
                <p className="mt-5 text-base leading-7 text-[#5a6168]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[1440px] rounded-[8px] bg-[#f3f3f3] px-4 py-12 sm:px-8 md:py-20 lg:px-16">
          <h2 className="mx-auto max-w-5xl text-center text-[clamp(2.3rem,4.2vw,4.3rem)] font-semibold leading-[1] tracking-normal">
            MAEK을 업무 루프 안에 배치하기
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(18rem,0.34fr)_minmax(0,0.66fr)] lg:items-center">
            <div className="grid gap-px overflow-hidden rounded-[8px] border border-[#d9d9d9] bg-[#d9d9d9]">
              {workLoopPanels.map((panel, index) => (
                <article key={panel.title} className={index === 0 ? "bg-white p-6" : "bg-[#f3f3f3] p-6"}>
                  <p className="text-sm font-semibold text-[#0f766e]">{panel.meta}</p>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight">{panel.title}</h3>
                  <p className="mt-4 text-base leading-7 text-[#5a6168]">{panel.body}</p>
                </article>
              ))}
            </div>
            <figure className="overflow-hidden rounded-[8px] border border-[#d9d9d9] bg-white">
              <Image
                src="/images/maek-system-flow-cropped.png"
                alt="MAEK system flow from source materials to knowledge in use."
                width={1536}
                height={790}
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="h-auto w-full"
              />
              <figcaption className="border-t border-[#d9d9d9] px-5 py-4 text-sm leading-6 text-[#5f6470]">
                Daybreak의 데모 패널처럼, 여기서는 애환 자체가 아니라 애환이 생기는 업무 루프와 필요한 구조를 보여줍니다.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-[clamp(2.3rem,5vw,5rem)] font-semibold leading-[1] tracking-normal">
              어느 수준의 구조가 필요한가
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#5a6168]">
              모든 회사가 처음부터 거대한 AI 시스템을 필요로 하지는 않습니다. 문제는 지금 만든 것이 다음 단계로
              넘어갈 때 무엇을 갖춰야 하는지 아는 것입니다.
            </p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[8px] border border-[#d8d8d8] bg-[#d8d8d8] md:hidden">
            {accessRows.map((row) => (
              <article key={row.level} className="bg-white p-5">
                <h3 className="text-xl font-semibold">{row.level}</h3>
                <dl className="mt-5 grid gap-4 text-base leading-7 text-[#30363d]">
                  <div>
                    <dt className="text-sm font-semibold text-[#0f766e]">현재 상황</dt>
                    <dd className="mt-1">{row.situation}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-[#0f766e]">Needs</dt>
                    <dd className="mt-1">{row.need}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-[#0f766e]">남겨야 할 결과</dt>
                    <dd className="mt-1">{row.output}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <div className="mt-12 hidden md:block">
            <table className="w-full border-collapse text-left text-base">
              <thead>
                <tr className="border-b border-[#d8d8d8]">
                  <th className="px-4 py-5 font-semibold">수준</th>
                  <th className="px-4 py-5 font-semibold">현재 상황</th>
                  <th className="px-4 py-5 font-semibold">Needs</th>
                  <th className="px-4 py-5 font-semibold">남겨야 할 결과</th>
                </tr>
              </thead>
              <tbody>
                {accessRows.map((row) => (
                  <tr key={row.level} className="border-b border-[#d8d8d8]">
                    <td className="px-4 py-6 align-top font-semibold">{row.level}</td>
                    <td className="px-4 py-6 align-top leading-7 text-[#30363d]">{row.situation}</td>
                    <td className="px-4 py-6 align-top leading-7 text-[#30363d]">{row.need}</td>
                    <td className="px-4 py-6 align-top leading-7 text-[#30363d]">{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[1440px] rounded-[8px] bg-[#f3f3f3] px-5 py-14 text-center sm:px-8 md:py-20">
          <h2 className="text-[clamp(2.3rem,5vw,5rem)] font-semibold leading-[1] tracking-normal">
            현장이 반복해서 보내는 신호
          </h2>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2 rounded-full border border-[#d8d8d8] bg-white p-1">
            {["대표", "일반 직원", "전산/보안", "운영팀"].map((label, index) => (
              <span
                key={label}
                className={index === 0 ? "rounded-full bg-[#f3f3f3] px-5 py-2 text-sm font-semibold" : "px-5 py-2 text-sm font-semibold text-[#5a6168]"}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-px overflow-hidden rounded-[8px] border border-[#d8d8d8] bg-[#d8d8d8] text-left md:grid-cols-2">
            {fieldSignals.map((signal) => (
              <p key={signal} className="bg-white p-6 text-[clamp(1.25rem,2vw,1.9rem)] font-medium leading-tight">
                {signal}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <h2 className="text-center text-[clamp(2.3rem,4.8vw,5rem)] font-semibold leading-[1] tracking-normal">
            이어서 볼 페이지
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {resources.map((item) => (
              <a key={item.href} href={item.href} className="group block">
                <div className="overflow-hidden rounded-[8px] bg-[#f3f3f3]">
                  <Image
                    src={item.image}
                    alt=""
                    width={720}
                    height={840}
                    loading="eager"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-5 text-sm font-semibold text-[#0f766e]">{item.eyebrow}</p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight">{item.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-[1180px] rounded-[8px] bg-[#f3f3f3] px-5 py-14 text-center sm:px-8 md:py-20">
          <h2 className="text-[clamp(2.5rem,5vw,5.2rem)] font-semibold leading-[1] tracking-normal">
            AI 전환의 불안을 업무 기준으로 바꾸기
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#5a6168]">
            MAEK은 현장의 피로를 소설처럼 전시하지 않고, 반복되는 불편함을 회사가 운영할 수 있는 구조로 정리합니다.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/system-flow"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#171717] px-5 text-sm font-semibold text-white transition hover:bg-[#27313a]"
              style={{ color: "#ffffff" }}
            >
              시스템 흐름 보기
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e7e2d9] bg-white px-4 py-8 text-sm text-[#5f6470] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <MaekLogo />
          <p>현장 상황, 반복 이슈, Needs, 운영 구조를 연결하는 MAEK 홈.</p>
          <a href="/design-system" className="font-semibold text-[#171717]">
            디자인 시스템
          </a>
        </div>
      </footer>
    </main>
  );
}
