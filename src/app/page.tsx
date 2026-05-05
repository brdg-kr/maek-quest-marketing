import { BenefitsSection } from "./components/BenefitsSection";
import { CTASection } from "./components/CTASection";
import { FlowSection } from "./components/FlowSection";
import { Hero3D } from "./components/Hero3D";
import { Reveal } from "./components/Reveal";
import { UseCaseSection } from "./components/UseCaseSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#04060b] text-slate-100">
      <section
        id="hero"
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-[92svh] flex-col overflow-hidden border-b border-white/10"
      >
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_76%_38%,rgba(14,165,233,0.26),transparent_30%),radial-gradient(circle_at_48%_30%,rgba(79,70,229,0.16),transparent_24%),linear-gradient(140deg,#030409_0%,#07111d_52%,#020308_100%)]" />
        <div className="absolute inset-0 -z-20 opacity-[0.15] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute inset-y-0 right-0 -z-10 w-[64vw] bg-[radial-gradient(circle_at_60%_44%,rgba(147,197,253,0.12),transparent_36%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#04060b] to-transparent" />

        <header className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-5 px-5 py-6 sm:px-7">
          <a
            href="#hero"
            className="flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-white"
            aria-label="MAEK 홈"
          >
            <span className="grid h-9 w-9 place-items-center border border-cyan-100/25 bg-white/5 shadow-[0_0_38px_rgba(14,165,233,0.18)]">
              <span className="h-3 w-3 rotate-45 border border-cyan-100 bg-cyan-200/20 shadow-[0_0_18px_rgba(165,243,252,0.9)]" />
            </span>
            <span>MAEK</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex" aria-label="주요 내비게이션">
            <a className="hover:text-white" href="#why">
              소개
            </a>
            <a className="hover:text-white" href="#flow">
              흐름
            </a>
            <a className="hover:text-white" href="#use-cases">
              활용
            </a>
            <a className="hover:text-white" href="#benefits">
              효과
            </a>
          </nav>
          <a className="hidden text-sm font-semibold text-cyan-100 sm:inline-flex" href="#final">
            데모 보기
          </a>
        </header>

        <div className="mx-auto grid w-full max-w-[1280px] flex-1 items-center gap-3 px-5 pb-12 pt-3 sm:px-7 lg:grid-cols-[0.72fr_1.28fr] lg:pb-16">
          <Reveal className="relative z-20 min-w-0 max-w-2xl">
            <h1
              id="hero-title"
              className="text-[2.8rem] font-semibold leading-[1.02] text-white sm:text-balance sm:text-6xl lg:text-7xl"
            >
              데이터가 쌓이면,
              <span className="block text-cyan-100">지능이 확장됩니다</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
              흩어진 데이터를 모아 구조화하고, 확장 가능한 브레인으로 진화시키세요.
              데이터가 저장을 넘어 연결되고 축적되고 확장되도록 설계합니다.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a className="btn-primary" href="#final">
                시작하기
              </a>
              <a className="btn-secondary" href="#flow">
                데모 보기
              </a>
            </div>
          </Reveal>

          <div className="relative -mx-8 -mt-12 min-w-0 sm:-mx-12 sm:-mt-20 lg:-mx-24 lg:-my-16">
            <Hero3D />
          </div>
        </div>
      </section>

      <section id="why" className="py-24 sm:py-32" aria-labelledby="why-title">
        <Reveal className="mx-auto grid w-full max-w-[1160px] gap-10 px-5 sm:px-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="section-label">INTRODUCTION</p>
            <h2 id="why-title" className="section-title">
              데이터의 흐름을 설계하고, 지능의 미래를 만듭니다.
            </h2>
          </div>
          <p className="text-xl leading-9 text-slate-300">
            MAEK은 데이터를 모으고 구조화해 확장 가능한 작은 브레인으로 만드는 시스템입니다.
            흩어진 자료가 다시 맥락이 되고, 맥락이 다음 아이디어를 움직입니다.
          </p>
        </Reveal>
      </section>

      <FlowSection />
      <UseCaseSection />
      <BenefitsSection />
      <div id="final">
        <CTASection />
      </div>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        MAEK - Data flows into living intelligence.
      </footer>
    </main>
  );
}
