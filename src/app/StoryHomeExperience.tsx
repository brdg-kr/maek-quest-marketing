import Image from "next/image";
import { MaekLogo } from "./components/MaekLogo";

const articleNav = [
  { href: "#morning", label: "대표의 새벽" },
  { href: "#afternoon", label: "직원의 오후" },
  { href: "#meeting", label: "회의실의 언어" },
  { href: "#night", label: "밤의 질문" },
];

const promptExamples = [
  {
    label: "고객 문의",
    prompt: "지난달 반복된 문의를 제품 개선 항목으로 묶어줘.",
    answer: "문의 42건 중 배송, 가격, 설치 문서를 분리하고 원문 링크를 남깁니다.",
  },
  {
    label: "회의록",
    prompt: "회의록에서 이번 주 실행 항목과 근거 자료를 찾아줘.",
    answer: "담당자, 마감일, 관련 문서 위치를 함께 보여주고 빠진 결정을 표시합니다.",
  },
  {
    label: "내부 자료",
    prompt: "이 제안서가 어떤 이전 자료를 기반으로 만들어졌는지 확인해줘.",
    answer: "출처가 있는 문장과 추정으로 보이는 문장을 분리해 검토 순서를 만듭니다.",
  },
];

const glossaryRows = [
  {
    term: "RAG",
    heard: "우리 자료를 붙이면 정확해진다.",
    question: "어떤 자료를 믿고, 오래된 자료는 어떻게 제외하나.",
    maek: "자료 출처, 생성 시점, 사용 위치를 함께 남긴다.",
  },
  {
    term: "Agent",
    heard: "사람 대신 알아서 처리한다.",
    question: "실패했을 때 누가 확인하고 어디서 멈추나.",
    maek: "자동화보다 먼저 승인 지점과 책임 경계를 만든다.",
  },
  {
    term: "Workflow",
    heard: "업무를 연결하면 된다.",
    question: "현업이 바꾼 절차가 시스템에도 반영되나.",
    maek: "업무 단계를 문서, 데이터, 실행 기록과 함께 묶는다.",
  },
  {
    term: "Vibe coding",
    heard: "빠르게 만들 수 있다.",
    question: "개인 도구가 팀 업무가 되면 무엇이 필요하나.",
    maek: "권한, 유지 방식, 근거 자료를 공식 흐름으로 옮긴다.",
  },
];

const relatedPages = [
  {
    href: "/design-system",
    eyebrow: "Design system",
    title: "차분한 AI 전환 페이지를 위한 시각 언어",
    image: "/images/mobile-knowledge-graph.png",
  },
  {
    href: "/ai-stage-map",
    eyebrow: "Stage map",
    title: "회사의 AI 도입 단계를 한 장으로 보기",
    image: "/images/mobile-dataset-package.png",
  },
  {
    href: "/system-flow",
    eyebrow: "System flow",
    title: "자료에서 실행까지 이어지는 MAEK 구조",
    image: "/images/mobile-knowledge-in-use.png",
  },
];

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8 border-t border-[#d6d0c7] pt-7">
      <p className="text-sm font-semibold text-[#6f6a62]">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(2.2rem,5vw,4.7rem)] font-semibold leading-[1.02] tracking-normal text-[#161616]">
        {title}
      </h2>
    </div>
  );
}

export function StoryHomeExperience() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
      <header className="border-b border-[#d6d0c7] bg-[#f7f4ee]/95 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5">
          <MaekLogo />
          <nav className="hidden items-center gap-7 text-sm font-medium text-[#5f5a52] md:flex">
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
            href="/design-system"
            className="inline-flex min-h-10 items-center rounded-full bg-[#171717] px-4 text-sm font-semibold text-white transition hover:bg-[#33312e]"
            style={{ color: "#ffffff" }}
          >
            디자인 시스템
          </a>
        </div>
      </header>

      <article>
        <section className="px-4 pb-10 pt-16 sm:px-6 md:pb-14 md:pt-24 lg:px-8">
          <div className="mx-auto max-w-[1120px] text-center">
            <p className="text-sm font-semibold text-[#6d675f]">MAEK Stories</p>
            <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-[#787168]">
              <span>AI transition</span>
              <span aria-hidden="true">/</span>
              <span>Workplace story</span>
              <span aria-hidden="true">/</span>
              <span>2026</span>
            </div>

            <h1 className="mx-auto mt-9 max-w-[1040px] text-[clamp(3.2rem,8.6vw,8.8rem)] font-semibold leading-[0.95] tracking-normal text-[#161616]">
              AI를 배워야 하는 회사의 하루
            </h1>
            <p className="mx-auto mt-8 max-w-[760px] text-[clamp(1.2rem,2.2vw,1.7rem)] font-medium leading-9 text-[#45413b]">
              빠르게 지나가는 교육, 툴, 데모 사이에서 대표와 직원은 같은 질문을 반복합니다. 이게 우리 회사에
              정말 맞는 길인지, 그리고 내일도 버틸 수 있는 방식인지.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-2 border-y border-[#d6d0c7] py-4">
              {articleNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-[#4d4942] transition hover:bg-[#e9e2d7] hover:text-[#171717]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
          <figure className="mx-auto max-w-[1320px] overflow-hidden rounded-[8px] border border-[#d6d0c7] bg-[#ebe4d8]">
            <div className="relative">
              <Image
                src="/images/maek-system-flow-cropped.png"
                alt="Source materials becoming a dataset package, knowledge graph, and knowledge in use."
                width={1536}
                height={790}
                priority
                sizes="(min-width: 1024px) 86vw, 100vw"
                className="h-auto w-full"
              />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                {["자료", "맥락", "판단", "실행"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-[#171717]/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
                    style={{ color: "#ffffff" }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <figcaption className="border-t border-[#d6d0c7] px-5 py-4 text-sm leading-6 text-[#655f56]">
              MAEK의 이야기는 기능을 나열하기보다, 회사 안의 흩어진 자료가 어떻게 믿을 수 있는 업무 흐름으로
              이어지는지 보여주는 데서 시작합니다.
            </figcaption>
          </figure>
        </section>

        <section className="border-y border-[#d6d0c7] bg-[#fffdf8] px-4 py-12 sm:px-6 md:py-18 lg:px-8">
          <div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#81796f]">In this story</p>
                <nav className="mt-5 grid gap-3 text-sm font-medium text-[#5e584f]">
                  {articleNav.map((item) => (
                    <a key={item.href} href={item.href} className="transition hover:text-[#171717]">
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="w-full min-w-0 lg:max-w-[760px]">
              <p className="text-[clamp(1.45rem,2.8vw,2.35rem)] font-medium leading-[1.28] text-[#24211d]">
                AI 전환은 발표 자료처럼 한 번에 오지 않습니다. 어느 날 대표가 조용히 교육장 맨 뒤에 앉고,
                어느 날 직원이 점심시간에 작은 자동화 도구를 만들고, 어느 회의에서는 모르는 단어가 먼저
                회의실을 차지합니다.
              </p>
              <p className="mt-7 text-lg leading-9 text-[#514c44]">
                그래서 이 홈은 “무엇을 제공한다”보다 “어떤 하루를 이해한다”에서 출발해야 합니다. 제품의
                자신감보다 현장의 피로를 먼저 인정할 때, 복잡한 도입 이야기도 조금 부드러워집니다.
              </p>

              <section id="morning" className="scroll-mt-24 pt-16">
                <SectionHeading eyebrow="01 / Morning" title="대표의 새벽" />
                <p className="text-lg leading-9 text-[#514c44]">
                  경쟁사는 이미 AI를 쓴다고 합니다. 고객 응대도, 제안서도, 내부 문서도 바뀌고 있다는데 우리
                  회사만 늦는 것 같아 새벽 교육을 신청합니다. 강의장에서는 모델 이름, 자동화 사례, 프롬프트
                  템플릿이 빠르게 지나갑니다.
                </p>
                <p className="mt-6 text-lg leading-9 text-[#514c44]">
                  하지만 돌아오는 길에 남는 질문은 더 단순합니다. 우리 회사의 자료는 어디에 있고, 누가
                  최신이라고 말할 수 있으며, 직원들이 만든 작은 도구를 어디까지 믿어도 되는가. 대표의 불안은
                  기술을 모르는 데서만 오지 않습니다. 책임질 수 있는 구조가 아직 보이지 않는 데서 옵니다.
                </p>

                <figure className="my-12 grid overflow-hidden rounded-[8px] border border-[#d6d0c7] bg-[#f2ede4] md:grid-cols-[0.44fr_0.56fr]">
                  <div className="p-6 md:p-8">
                    <p className="font-mono text-sm font-semibold text-[#9b6b35]">07:20</p>
                    <blockquote className="mt-6 text-[clamp(1.65rem,3vw,2.7rem)] font-semibold leading-[1.12] text-[#171717]">
                      “배워야 한다는 마음은 있는데, 회사 안에서 어디부터 시작해야 할지 모르겠습니다.”
                    </blockquote>
                  </div>
                  <Image
                    src="/images/mobile-source-materials.png"
                    alt="Mobile interface showing source materials."
                    width={720}
                    height={840}
                    sizes="(min-width: 768px) 380px, 100vw"
                    className="h-full min-h-[22rem] w-full object-cover"
                  />
                </figure>
              </section>

              <section id="afternoon" className="scroll-mt-24 pt-8">
                <SectionHeading eyebrow="02 / Afternoon" title="직원의 오후" />
                <p className="text-lg leading-9 text-[#514c44]">
                  직원은 살아남기 위해 배웁니다. 반복되는 고객 문의를 줄이고, 회의록을 정리하고, 견적서 초안을
                  빠르게 만들고 싶습니다. 바이브코딩으로 만든 작은 도구는 처음에는 개인용이지만, 어느 순간 팀의
                  일이 됩니다.
                </p>
                <p className="mt-6 text-lg leading-9 text-[#514c44]">
                  그때부터 필요한 것은 더 빠른 제작만이 아닙니다. 이 답이 어떤 파일에서 왔는지, 누가 수정할 수
                  있는지, 다음 달에도 같은 방식으로 돌아갈지 확인할 수 있어야 합니다.
                </p>

                <div className="my-12 border-y border-[#d6d0c7] py-7">
                  <p className="text-sm font-semibold text-[#6d675f]">Example prompts</p>
                  <div className="mt-5 grid gap-4">
                    {promptExamples.map((item) => (
                      <article key={item.label} className="rounded-[8px] border border-[#d6d0c7] bg-[#f7f4ee] p-5">
                        <p className="text-sm font-semibold text-[#9b6b35]">{item.label}</p>
                        <p className="mt-4 text-lg font-medium leading-7 text-[#171717]">“{item.prompt}”</p>
                        <p className="mt-4 border-t border-[#d6d0c7] pt-4 text-base leading-7 text-[#5b554c]">
                          {item.answer}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section id="meeting" className="scroll-mt-24 pt-8">
                <SectionHeading eyebrow="03 / Meeting" title="회의실의 언어" />
                <p className="text-lg leading-9 text-[#514c44]">
                  회의에서는 용어가 먼저 들어옵니다. RAG, 에이전트, 워크플로, MCP, 파인튜닝. 각자 들은 말은
                  많지만 같은 장면을 보고 있지는 않습니다. 누군가는 속도를 말하고, 누군가는 보안을 말하고,
                  누군가는 현업의 피로를 말합니다.
                </p>
                <p className="mt-6 text-lg leading-9 text-[#514c44]">
                  MAEK의 페이지는 이 단어들을 더 멋지게 포장하는 대신, 회의실에서 실제로 생기는 질문으로
                  내려놓아야 합니다.
                </p>

                <div className="my-12 overflow-x-auto rounded-[8px] border border-[#d6d0c7]">
                  <table className="min-w-[760px] border-collapse bg-[#fffdf8] text-left text-sm">
                    <thead className="bg-[#ebe4d8] text-[#3b3732]">
                      <tr>
                        <th className="w-[7rem] border-b border-[#d6d0c7] px-4 py-4 font-semibold">용어</th>
                        <th className="border-b border-[#d6d0c7] px-4 py-4 font-semibold">회의실에서 들리는 말</th>
                        <th className="border-b border-[#d6d0c7] px-4 py-4 font-semibold">현장의 질문</th>
                        <th className="border-b border-[#d6d0c7] px-4 py-4 font-semibold">MAEK의 기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      {glossaryRows.map((row) => (
                        <tr key={row.term} className="border-b border-[#d6d0c7] last:border-b-0">
                          <td className="px-4 py-4 font-mono font-semibold text-[#9b6b35]">{row.term}</td>
                          <td className="px-4 py-4 leading-6 text-[#514c44]">{row.heard}</td>
                          <td className="px-4 py-4 leading-6 text-[#514c44]">{row.question}</td>
                          <td className="px-4 py-4 leading-6 text-[#514c44]">{row.maek}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="night" className="scroll-mt-24 pt-8">
                <SectionHeading eyebrow="04 / Night" title="밤의 질문" />
                <p className="text-lg leading-9 text-[#514c44]">
                  밤늦게 다시 묻습니다. 우리가 오늘 만든 것은 내일도 쓸 수 있을까. 직원이 만든 도구는 회사의
                  자산이 될 수 있을까. 교육에서 배운 말들이 우리 자료와 연결될 수 있을까.
                </p>
                <p className="mt-6 text-lg leading-9 text-[#514c44]">
                  위로는 “AI가 다 해줄 것”이라는 말에서 오지 않습니다. 어디서 왔는지 보이는 자료, 틀렸을 때
                  멈출 수 있는 흐름, 사람이 판단을 놓치지 않는 인터페이스에서 옵니다. 이 페이지의 홈은 그
                  감각을 먼저 전달해야 합니다.
                </p>

                <blockquote className="my-12 border-l-2 border-[#171717] pl-6 text-[clamp(1.8rem,3.8vw,3.6rem)] font-semibold leading-[1.1] text-[#171717]">
                  복잡한 전환을 조금 덜 외롭게. 기능보다 먼저, 오늘의 일을 이해하는 페이지.
                </blockquote>
              </section>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-8 flex flex-col gap-3 border-b border-[#d6d0c7] pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#6d675f]">Keep reading</p>
                <h2 className="mt-3 text-[clamp(2.2rem,4.2vw,4.6rem)] font-semibold leading-none tracking-normal">
                  다음에 이어질 페이지들
                </h2>
              </div>
              <a href="/stories" className="text-sm font-semibold text-[#514c44]">
                MAEK Stories
              </a>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[8px] border border-[#d6d0c7] bg-[#d6d0c7] md:grid-cols-3">
              {relatedPages.map((page) => (
                <a key={page.href} href={page.href} className="group bg-[#fffdf8]">
                  <div className="aspect-[4/3] overflow-hidden bg-[#ebe4d8]">
                    <Image
                      src={page.image}
                      alt=""
                      width={720}
                      height={840}
                      loading="eager"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <p className="text-sm font-semibold text-[#9b6b35]">{page.eyebrow}</p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#171717]">{page.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </article>

      <footer className="border-t border-[#d6d0c7] bg-[#f7f4ee] px-4 py-8 text-sm text-[#625c54] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <MaekLogo />
          <p>AI 전환의 애환을 자료와 구조로 정리하는 MAEK 이야기.</p>
          <a href="/system-flow" className="font-semibold text-[#171717]">
            시스템 흐름 보기
          </a>
        </div>
      </footer>
    </main>
  );
}
