"use client";

import Image from "next/image";
import { LanguageToggle } from "../components/LanguageToggle";
import { useLocale } from "../components/LocaleProvider";
import { MaekLogo } from "../components/MaekLogo";

const stageMapCopy = {
  en: {
    navHome: "Home",
    navSystemFlow: "System Flow",
    heroTitle: "Where is your company in the AI transition?",
    heroLead: "This change is not a vague future. It is a sequence already unfolding inside companies.",
    heroBody:
      "Employees start building work tools with AI, and data access plus operational control soon become the standard of competition. MAEK is a diagnostic frame for that transition point.",
    comparisonEyebrow: "Competitive Question",
    comparisonTitle: "How far have competitors moved?",
    comparisonBody:
      "In sales conversations, replace Company A and Company B with real customer interviews or named examples. This page creates one pressure: we need to answer where we are now.",
    stageEyebrow: "Eight Predictable Moves",
    stageTitle: "The 8 stages that actually happen inside companies",
    stageBody:
      "Experience and prediction are compressed into one diagnostic map. Each stage leads from signal, to question, to the next bottleneck.",
    diagnosisEyebrow: "Boardroom Diagnostic",
    diagnosisTitle: "You need to be able to answer this question now.",
    diagnosisBody:
      "The next competitive question is not \"Are we using AI?\" It is \"Can AI-built work tools connect safely to company data?\"",
    maekEyebrow: "MAEK Position",
    maekTitle: "The next stage combines a brain, a data query engine, and vibe coding governance.",
    maekBody:
      "MAEK organizes scattered documents and data into AI-ready knowledge, then connects them to app-ready data interfaces that employee-built apps can use. IT keeps control over security, permissions, audit, and operations.",
    maekLinkLabel: "Open system flow",
    figureAlt:
      "MAEK system flow connecting source materials, dataset package, knowledge graph, and knowledge in use.",
    competitors: [
      {
        name: "Our company",
        stage: "Stage 2-3",
        status: "AI use cases and small internal tools are starting to appear.",
      },
      {
        name: "Competitor A",
        stage: "Stage 4-5",
        status: "Business apps are increasing, but data connection and security review are becoming bottlenecks.",
      },
      {
        name: "Leader B",
        stage: "Stage 6-8",
        status: "Moving beyond document cleanup toward app-ready data structures and query engines.",
      },
    ],
    stages: [
      {
        number: "01",
        title: "AI adoption pressure",
        signal: "CEOs, executives, and team leads start asking where AI should be used.",
        question: "Do you have a plan that goes beyond tool subscriptions and changes the work itself?",
      },
      {
        number: "02",
        title: "Vibe coding enters",
        signal: "Non-developers start building automations, internal web pages, and small apps themselves.",
        question: "Are you ready to bring employee-built outputs into official workflows?",
      },
      {
        number: "03",
        title: "Results become visible",
        signal: "Team leads and managers see small wins and encourage more AI use.",
        question: "Do you have operating standards when personal tools become organizational tools?",
      },
      {
        number: "04",
        title: "Data demand explodes",
        signal: "Apps can be built, but they need ERP, project, HR, and contract data.",
        question: "Is there a standard path for safe access to business data?",
      },
      {
        number: "05",
        title: "IT bottleneck",
        signal: "Business teams want fast connections, while IT worries about security and maintenance responsibility.",
        question: "Do you have a structure beyond CSV handoffs and one-off copies?",
      },
      {
        number: "06",
        title: "AI-ready documents",
        signal: "Markdown files, meeting notes, manuals, and policy documents accumulate in AI-readable form.",
        question: "Are those documents connected to business concepts and data structures?",
      },
      {
        number: "07",
        title: "App-ready data bottleneck",
        signal: "Documents exist, but apps lack stable entities, APIs, and permissions for reliable queries.",
        question: "Are you managing the difference between AI-ready documents and app-ready data?",
      },
      {
        number: "08",
        title: "Brain + query engine",
        signal: "Companies require a knowledge brain, data query engine, vibe coding environment, and governance together.",
        question: "Can employee-built apps safely use company knowledge?",
      },
    ],
    diagnosis: [
      "Small employee-built apps or automations already exist.",
      "Business teams are asking to connect ERP, project, customer, or contract data.",
      "IT hesitates to officially support them because of security, permissions, and maintenance responsibility.",
      "Markdown files and meeting notes are accumulating, but they are hard to use directly in business apps.",
      "When competitor examples come up, your company cannot clearly answer its current stage.",
    ],
  },
  ko: {
    navHome: "홈",
    navSystemFlow: "시스템 흐름",
    heroTitle: "당신 회사는 AI 전환의 어느 단계에 있습니까?",
    heroLead: "이 변화는 막연한 미래가 아니라 기업 안에서 이미 벌어지는 순서입니다.",
    heroBody:
      "직원은 AI로 업무 도구를 만들기 시작하고, 곧 데이터 연결과 운영 통제가 경쟁력의 기준이 됩니다. MAEK은 그 전환 지점을 설명하는 진단 프레임입니다.",
    comparisonEyebrow: "Competitive Question",
    comparisonTitle: "경쟁사는 어느 단계까지 왔습니까?",
    comparisonBody:
      "제안 현장에서는 실명 사례나 고객 인터뷰에 맞춰 A사, B사를 교체하면 됩니다. 페이지의 역할은 “우리도 지금 어디쯤인지 답해야 한다”는 압박을 만드는 것입니다.",
    stageEyebrow: "Eight Predictable Moves",
    stageTitle: "기업 안에서 실제로 벌어지는 8단계",
    stageBody:
      "경험과 예측을 한 장의 진단 맵으로 압축했습니다. 각 단계는 증상, 질문, 다음 병목으로 이어집니다.",
    diagnosisEyebrow: "Boardroom Diagnostic",
    diagnosisTitle: "지금 이 질문에 답할 수 있어야 합니다.",
    diagnosisBody:
      "“AI를 쓰고 있나요?”가 아니라 “AI로 만들어진 업무 도구가 회사 데이터와 안전하게 연결되고 있나요?”가 다음 경쟁 질문입니다.",
    maekEyebrow: "MAEK Position",
    maekTitle: "다음 단계는 브레인, 데이터조회엔진, 바이브코딩의 결합입니다.",
    maekBody:
      "MAEK은 흩어진 문서와 데이터를 AI-ready 지식으로 정리하고, 직원이 만든 앱이 사용할 수 있는 app-ready 데이터 인터페이스로 연결합니다. 전산팀은 보안, 권한, 감사, 운영을 통제합니다.",
    maekLinkLabel: "시스템 흐름 열기",
    figureAlt:
      "원천 자료, 데이터셋 패키지, 지식 그래프, 지식 활용을 연결하는 MAEK 시스템 흐름.",
    competitors: [
      {
        name: "우리 회사",
        stage: "2-3단계",
        status: "AI 활용 사례와 작은 내부 도구가 보이기 시작한 상태",
      },
      {
        name: "경쟁사 A",
        stage: "4-5단계",
        status: "현업 앱은 늘고 있지만 데이터 연결과 보안 검토가 병목인 상태",
      },
      {
        name: "선도사 B",
        stage: "6-8단계",
        status: "문서 정비를 넘어 app-ready 데이터 구조와 조회 엔진을 준비하는 상태",
      },
    ],
    stages: [
      {
        number: "01",
        title: "AI 도입 압박",
        signal: "대표, 임원, 팀장이 AI를 어디에 써야 하는지 묻기 시작합니다.",
        question: "도구 구독을 넘어 업무 변화로 연결할 계획이 있습니까?",
      },
      {
        number: "02",
        title: "바이브코딩 유입",
        signal: "개발자가 아닌 직원이 자동화 도구, 내부 웹페이지, 작은 앱을 직접 만듭니다.",
        question: "직원이 만든 결과물을 공식 업무 흐름 안에서 볼 준비가 되어 있습니까?",
      },
      {
        number: "03",
        title: "성과가 보이기 시작",
        signal: "팀장과 리더가 작은 성공 사례를 보고 더 많은 AI 활용을 독려합니다.",
        question: "개인 도구가 조직 도구로 이동할 때 운영 기준이 있습니까?",
      },
      {
        number: "04",
        title: "데이터 요구 폭발",
        signal: "앱은 만들 수 있지만 ERP, 프로젝트, 인사, 계약 데이터가 필요해집니다.",
        question: "업무 데이터에 안전하게 접근하는 표준 경로가 있습니까?",
      },
      {
        number: "05",
        title: "전산팀 병목",
        signal: "현업은 빠른 연결을 원하고, 전산팀은 보안과 유지보수 책임을 걱정합니다.",
        question: "CSV 전달과 일회성 복사에서 벗어날 구조가 있습니까?",
      },
      {
        number: "06",
        title: "AI-ready 문서 정비",
        signal: "마크다운, 회의록, 매뉴얼, 정책 문서가 AI가 읽기 쉬운 형태로 쌓입니다.",
        question: "정리된 문서를 업무 개념과 데이터 구조로 연결하고 있습니까?",
      },
      {
        number: "07",
        title: "App-ready 데이터 병목",
        signal: "문서는 많아졌지만 앱에서 안정적으로 조회할 엔티티, API, 권한이 없습니다.",
        question: "AI-ready 문서와 app-ready 데이터의 차이를 관리하고 있습니까?",
      },
      {
        number: "08",
        title: "브레인 + 조회 엔진",
        signal: "기업은 지식 브레인, 데이터조회엔진, 바이브코딩 환경, 거버넌스를 함께 요구합니다.",
        question: "직원이 만든 앱이 안전하게 회사 지식을 사용할 수 있습니까?",
      },
    ],
    diagnosis: [
      "직원이 만든 작은 앱이나 자동화 도구가 이미 존재한다.",
      "현업이 ERP, 프로젝트, 고객, 계약 데이터 연결을 요청한다.",
      "전산팀은 보안, 권한, 유지보수 책임 때문에 공식 지원을 망설인다.",
      "마크다운이나 회의록은 쌓이고 있지만 업무 앱에서 바로 쓰기 어렵다.",
      "경쟁사 사례를 들었을 때 우리 회사의 현재 단계가 명확히 답변되지 않는다.",
    ],
  },
} as const;

export function AiStageMapExperience() {
  const { locale } = useLocale();
  const copy = stageMapCopy[locale];

  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#07100c]">
      <section className="border-b border-[#0a2a57]/12 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5">
          <MaekLogo />
          <nav className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#10251a]/58" aria-label="Primary navigation">
            <a href="/" className="transition hover:text-[#087a45]">
              {copy.navHome}
            </a>
            <a href="/system-flow" className="transition hover:text-[#087a45]">
              {copy.navSystemFlow}
            </a>
          </nav>
        </div>
      </section>

      <section className="px-4 pb-20 pt-16 sm:px-6 md:min-h-[30rem] md:pb-24 md:pt-20 lg:flex lg:min-h-[34rem] lg:items-center lg:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(26rem,0.42fr)] lg:items-end">
          <div>
            <h1 className="max-w-5xl text-[clamp(2.6rem,6.4vw,6.8rem)] font-semibold leading-[0.95] tracking-normal text-[#07100c]">
              {copy.heroTitle}
            </h1>
          </div>
          <div className="border-l-4 border-[#087a45] pl-5">
            <p className="text-xl font-semibold leading-8 text-[#0d2b57] md:text-2xl md:leading-9">
              {copy.heroLead}
            </p>
            <p className="mt-4 text-base leading-7 text-[#34473d]">{copy.heroBody}</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 md:py-12 lg:px-8" aria-labelledby="comparison-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-[24rem_minmax(0,1fr)] lg:items-start">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#087a45]">
                {copy.comparisonEyebrow}
              </p>
              <h2 id="comparison-title" className="mt-3 text-3xl font-semibold leading-tight text-[#061d48] md:text-4xl">
                {copy.comparisonTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-[#425a6d]">{copy.comparisonBody}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {copy.competitors.map((item) => (
                <article key={item.name} className="rounded-[6px] border border-[#d7dee9] bg-[#f7f8f4] p-5">
                  <p className="text-sm font-semibold text-[#34473d]">{item.name}</p>
                  <p className="mt-4 text-4xl font-semibold tracking-normal text-[#087a45]">{item.stage}</p>
                  <p className="mt-4 text-sm leading-6 text-[#0d2b57]">{item.status}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-8" aria-labelledby="stage-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex flex-col justify-between gap-4 border-t border-[#0a2a57]/18 pt-7 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#087a45]">
                {copy.stageEyebrow}
              </p>
              <h2 id="stage-title" className="mt-3 text-3xl font-semibold leading-tight text-[#061d48] md:text-5xl">
                {copy.stageTitle}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#425a6d] md:text-right">{copy.stageBody}</p>
          </div>

          <ol className="relative mx-auto max-w-5xl">
            <span className="absolute bottom-3 left-[1.125rem] top-3 w-px bg-[#0a2a57]/18" aria-hidden="true" />
            {copy.stages.map((stage) => (
              <li key={stage.number} className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 pb-5 last:pb-0 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-6">
                <div className="relative z-10 pt-1">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#087a45]/35 bg-[#f7f8f4] font-mono text-xs font-semibold text-[#087a45] shadow-[0_8px_24px_rgba(8,122,69,0.12)]">
                    {stage.number}
                  </span>
                </div>
                <article className="rounded-[6px] border border-[#d7dee9] bg-white p-5 shadow-[0_14px_42px_rgba(10,42,87,0.05)] md:p-6">
                  <div className="flex flex-col gap-3 md:grid md:grid-cols-[14rem_minmax(0,1fr)] md:gap-6">
                    <h3 className="text-xl font-semibold leading-tight text-[#061d48] md:text-2xl">{stage.title}</h3>
                    <div>
                      <p className="text-sm leading-6 text-[#0d2b57] md:text-base md:leading-7">{stage.signal}</p>
                      <p className="mt-4 border-t border-[#0a2a57]/14 pt-4 text-sm font-semibold leading-6 text-[#34473d] md:text-base md:leading-7">
                        {stage.question}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#061d48] px-4 py-12 text-white sm:px-6 md:py-16 lg:px-8" aria-labelledby="diagnosis-title">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(22rem,0.42fr)_minmax(0,0.58fr)] lg:items-start">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#9fd8b8]">
              {copy.diagnosisEyebrow}
            </p>
            <h2 id="diagnosis-title" className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {copy.diagnosisTitle}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#d7eee0]">{copy.diagnosisBody}</p>
          </div>
          <div className="grid gap-3">
            {copy.diagnosis.map((item, index) => (
              <div key={item} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-t border-white/18 py-4">
                <p className="font-mono text-sm font-semibold text-[#9fd8b8]">{String(index + 1).padStart(2, "0")}</p>
                <p className="text-lg font-medium leading-7 text-[#f7fff9]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-8" aria-labelledby="maek-title">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:items-center">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#087a45]">
              {copy.maekEyebrow}
            </p>
            <h2 id="maek-title" className="mt-3 text-3xl font-semibold leading-tight text-[#061d48] md:text-5xl">
              <a
                href="/system-flow"
                style={{
                  textDecorationLine: "underline",
                  textDecorationColor: "rgba(8, 122, 69, 0.72)",
                  textDecorationThickness: "0.06em",
                  textUnderlineOffset: "0.13em",
                }}
              >
                {copy.maekTitle}
              </a>
            </h2>
            <p className="mt-5 text-base leading-7 text-[#34473d]">{copy.maekBody}</p>
            <div className="mt-7 grid gap-3 text-sm font-semibold text-[#061d48] sm:grid-cols-3">
              <p className="rounded-[6px] border border-[#d7dee9] bg-white p-4">Brain</p>
              <p className="rounded-[6px] border border-[#d7dee9] bg-white p-4">Data Query Engine</p>
              <p className="rounded-[6px] border border-[#d7dee9] bg-white p-4">Vibe Coding Governance</p>
            </div>
          </div>
          <figure className="overflow-hidden rounded-[6px] border border-[#d7dee9] bg-white">
            <a
              href="/system-flow"
              aria-label={copy.maekLinkLabel}
              className="block transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#087a45]/45"
            >
              <Image
                src="/images/maek-system-flow-cropped.png"
                alt={copy.figureAlt}
                width={1536}
                height={790}
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="h-auto w-full"
                loading="eager"
              />
            </a>
          </figure>
        </div>
      </section>

      <footer className="border-t border-[#0a2a57]/14 px-4 py-8 text-[#34473d] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[#34473d]/70">© 2026 MAEK. All rights reserved.</p>
          <LanguageToggle />
        </div>
      </footer>
    </main>
  );
}
