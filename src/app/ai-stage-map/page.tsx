import Image from "next/image";
import type { Metadata } from "next";
import { MaekLogo } from "../components/MaekLogo";

export const metadata: Metadata = {
  title: "당신 회사는 AI 전환의 어느 단계에 있습니까?",
  description:
    "AI 도입, 바이브코딩 확산, 데이터 연결 병목, MAEK 전환 구조를 한 페이지에서 진단하는 단계 지도입니다.",
};

const competitors = [
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
];

const stages = [
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
];

const diagnosis = [
  "직원이 만든 작은 앱이나 자동화 도구가 이미 존재한다.",
  "현업이 ERP, 프로젝트, 고객, 계약 데이터 연결을 요청한다.",
  "전산팀은 보안, 권한, 유지보수 책임 때문에 공식 지원을 망설인다.",
  "마크다운이나 회의록은 쌓이고 있지만 업무 앱에서 바로 쓰기 어렵다.",
  "경쟁사 사례를 들었을 때 우리 회사의 현재 단계가 명확히 답변되지 않는다.",
];

export default function AiStageMapPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#07100c]">
      <section className="border-b border-[#0a2a57]/12 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5">
          <MaekLogo />
          <a
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10251a]/58 transition hover:text-[#087a45]"
          >
            MAEK
          </a>
        </div>
      </section>

      <section className="px-4 pb-12 pt-10 sm:px-6 md:pb-16 md:pt-14 lg:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(26rem,0.42fr)] lg:items-end">
          <div>
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[#087a45]">
              AI Adoption Stage Map
            </p>
            <h1 className="mt-5 max-w-5xl text-[clamp(2.6rem,6.4vw,6.8rem)] font-semibold leading-[0.95] tracking-normal text-[#07100c]">
              당신 회사는 AI 전환의 어느 단계에 있습니까?
            </h1>
          </div>
          <div className="border-l-4 border-[#087a45] pl-5">
            <p className="text-xl font-semibold leading-8 text-[#0d2b57] md:text-2xl md:leading-9">
              이 변화는 막연한 미래가 아니라 기업 안에서 이미 벌어지는 순서입니다.
            </p>
            <p className="mt-4 text-base leading-7 text-[#34473d]">
              직원은 AI로 업무 도구를 만들기 시작하고, 곧 데이터 연결과 운영 통제가 경쟁력의 기준이 됩니다.
              MAEK은 그 전환 지점을 설명하는 진단 프레임입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 md:py-12 lg:px-8" aria-labelledby="comparison-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-[24rem_minmax(0,1fr)] lg:items-start">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#087a45]">
                Competitive Question
              </p>
              <h2 id="comparison-title" className="mt-3 text-3xl font-semibold leading-tight text-[#061d48] md:text-4xl">
                경쟁사는 어느 단계까지 왔습니까?
              </h2>
              <p className="mt-4 text-base leading-7 text-[#425a6d]">
                제안 현장에서는 실명 사례나 고객 인터뷰에 맞춰 A사, B사를 교체하면 됩니다. 페이지의 역할은
                “우리도 지금 어디쯤인지 답해야 한다”는 압박을 만드는 것입니다.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {competitors.map((item) => (
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
                Eight Predictable Moves
              </p>
              <h2 id="stage-title" className="mt-3 text-3xl font-semibold leading-tight text-[#061d48] md:text-5xl">
                기업 안에서 실제로 벌어지는 8단계
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#425a6d] md:text-right">
              경험과 예측을 한 장의 진단 맵으로 압축했습니다. 각 단계는 증상, 질문, 다음 병목으로 이어집니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stages.map((stage) => (
              <article key={stage.number} className="rounded-[6px] border border-[#d7dee9] bg-white p-5 shadow-[0_14px_42px_rgba(10,42,87,0.05)]">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-sm font-semibold text-[#087a45]">{stage.number}</p>
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#087a45]" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-tight text-[#061d48]">{stage.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#0d2b57]">{stage.signal}</p>
                <p className="mt-5 border-t border-[#0a2a57]/14 pt-4 text-sm font-semibold leading-6 text-[#34473d]">
                  {stage.question}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#061d48] px-4 py-12 text-white sm:px-6 md:py-16 lg:px-8" aria-labelledby="diagnosis-title">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(22rem,0.42fr)_minmax(0,0.58fr)] lg:items-start">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#9fd8b8]">
              Boardroom Diagnostic
            </p>
            <h2 id="diagnosis-title" className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              지금 이 질문에 답할 수 있어야 합니다.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#d7eee0]">
              “AI를 쓰고 있나요?”가 아니라 “AI로 만들어진 업무 도구가 회사 데이터와 안전하게 연결되고 있나요?”가
              다음 경쟁 질문입니다.
            </p>
          </div>
          <div className="grid gap-3">
            {diagnosis.map((item, index) => (
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
              MAEK Position
            </p>
            <h2 id="maek-title" className="mt-3 text-3xl font-semibold leading-tight text-[#061d48] md:text-5xl">
              다음 단계는 브레인, 데이터조회엔진, 바이브코딩의 결합입니다.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#34473d]">
              MAEK은 흩어진 문서와 데이터를 AI-ready 지식으로 정리하고, 직원이 만든 앱이 사용할 수 있는
              app-ready 데이터 인터페이스로 연결합니다. 전산팀은 보안, 권한, 감사, 운영을 통제합니다.
            </p>
            <div className="mt-7 grid gap-3 text-sm font-semibold text-[#061d48] sm:grid-cols-3">
              <p className="rounded-[6px] border border-[#d7dee9] bg-white p-4">Brain</p>
              <p className="rounded-[6px] border border-[#d7dee9] bg-white p-4">Data Query Engine</p>
              <p className="rounded-[6px] border border-[#d7dee9] bg-white p-4">Vibe Coding Governance</p>
            </div>
          </div>
          <figure className="overflow-hidden rounded-[6px] border border-[#d7dee9] bg-white">
            <Image
              src="/images/maek-system-flow-cropped.png"
              alt="MAEK system flow connecting source materials, dataset package, knowledge graph, and knowledge in use."
              width={1536}
              height={790}
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="h-auto w-full"
              loading="eager"
            />
          </figure>
        </div>
      </section>

      <footer className="border-t border-[#0a2a57]/14 px-4 py-8 text-[#34473d] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <MaekLogo />
          <p>AI 전환 단계 진단 페이지</p>
          <p className="text-[#34473d]/70">© 2026 MAEK. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
