import type { Metadata } from "next";
import { MechanicalBrainVisual } from "../components/MechanicalBrainVisual";

export const metadata: Metadata = {
  title: "Where Data Becomes Intelligence",
  description:
    "A cinematic MAEK landing page for transforming collected data into expandable micro-brains that continuously generate insights, ideas, and strategic value.",
  alternates: {
    canonical: "/3",
  },
};

const conceptSteps = [
  ["Collect", "Raw data flows in from documents, notes, calls, research, feedback, and operational signals."],
  ["Refine", "The system compresses scattered fragments into clean structures, relationships, and reusable context."],
  ["Assemble", "Structured knowledge forms modular micro-brains that stay focused while continuing to expand."],
  ["Generate", "Connected brains keep producing insights, ideas, strategies, reports, and planning paths."],
];

const values = [
  ["Structured intelligence", "Turn fragmented information into a system that can be searched, reused, compared, and reasoned through."],
  ["Compounding knowledge", "Let every collected source strengthen the intelligence engine instead of disappearing into static storage."],
  ["Continuous creation", "Generate patterns, opportunities, ideas, recommendations, and strategy from accumulated context."],
  ["Reusable brains", "Build durable intelligence systems for markets, products, audiences, research, operations, and decisions."],
];

const outputs = [
  "Insights",
  "Ideas",
  "Reports",
  "Comparisons",
  "Strategies",
  "Planning",
  "Knowledge expansion",
];

export default function PageThree() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020408] text-slate-100">
      <section
        id="hero"
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-svh flex-col overflow-hidden border-b border-cyan-100/10"
      >
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(130deg,#020408_0%,#07111d_42%,#0d0c12_68%,#020408_100%)]" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_73%_42%,rgba(34,211,238,0.22),transparent_43%),radial-gradient(ellipse_at_45%_28%,rgba(167,139,250,0.15),transparent_34%),radial-gradient(ellipse_at_24%_72%,rgba(163,230,53,0.09),transparent_34%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.15] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#020408] via-[#020408]/78 to-transparent" />

        <MechanicalBrainVisual />

        <header className="relative z-20 mx-auto flex w-full max-w-[1320px] items-center justify-between gap-5 px-5 py-6 sm:px-8">
          <a href="#hero" className="flex items-center gap-3 text-sm font-semibold text-white" aria-label="MAEK home">
            <span className="relative h-9 w-9 border border-cyan-100/25 bg-white/5 shadow-[0_0_38px_rgba(34,211,238,0.2)]">
              <span className="absolute inset-[10px] rotate-45 border border-cyan-50 bg-cyan-200/20 shadow-[0_0_18px_rgba(165,243,252,0.95)]" />
            </span>
            <span>MAEK</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex" aria-label="Primary navigation">
            <a className="transition hover:text-white" href="#system">
              System
            </a>
            <a className="transition hover:text-white" href="#value">
              Value
            </a>
            <a className="transition hover:text-white" href="#outputs">
              Outputs
            </a>
          </nav>
          <a className="hidden text-sm font-semibold text-cyan-100 sm:inline-flex" href="#final">
            Start Building
          </a>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 items-end px-5 pb-14 pt-24 sm:px-8 sm:pb-20 lg:pb-24">
          <div className="max-w-5xl">
            <h1
              id="hero-title"
              className="max-w-5xl text-[3.45rem] font-semibold leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-[8.8rem]"
            >
              Where Data Becomes Intelligence
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Collect data, build modular brains, and turn growing knowledge into continuous insight, ideas, and action.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#system"
                className="inline-flex min-h-12 items-center justify-center border border-cyan-50/40 bg-cyan-50 px-5 text-sm font-bold text-[#031018] shadow-[0_22px_80px_rgba(34,211,238,0.24)] transition hover:-translate-y-0.5"
              >
                Explore the System
              </a>
              <a
                href="#final"
                className="inline-flex min-h-12 items-center justify-center border border-white/15 bg-white/[0.055] px-5 text-sm font-bold text-slate-100 backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-100/35"
              >
                Start Building
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1320px] gap-px border border-cyan-100/10 bg-cyan-100/10 sm:grid-cols-2 lg:grid-cols-4">
          {conceptSteps.map(([title, body], index) => (
            <article key={title} className="min-h-36 bg-[#040912]/78 p-5 backdrop-blur-xl">
              <span className="font-mono text-xs text-cyan-100/60">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="system" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" aria-labelledby="system-title">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(34,211,238,0.12),transparent_28rem),radial-gradient(circle_at_78%_70%,rgba(163,230,53,0.07),transparent_24rem)]" />
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="section-label">Concept / How it works</p>
            <h2 id="system-title" className="section-title">
              Data is collected, refined, and assembled into expandable brains.
            </h2>
          </div>
          <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {conceptSteps.map(([title, body]) => (
              <article key={title} className="min-h-56 bg-[#050a12] p-7">
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-5 text-base leading-7 text-slate-300">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="value" className="border-y border-white/10 bg-[#05080e] px-5 py-24 sm:px-8 sm:py-32" aria-labelledby="value-title">
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="section-label">Value</p>
            <h2 id="value-title" className="section-title">
              Convert accumulated information into strategic force.
            </h2>
          </div>
          <div className="divide-y divide-cyan-100/10 border-y border-cyan-100/10">
            {values.map(([title, body], index) => (
              <article key={title} className="grid gap-5 py-8 sm:grid-cols-[5rem_0.8fr_1.2fr]">
                <span className="font-mono text-sm text-cyan-100/60">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl font-semibold leading-tight text-white">{title}</h3>
                <p className="text-base leading-7 text-slate-300">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="outputs" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" aria-labelledby="outputs-title">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_42%,rgba(34,211,238,0.17),transparent_24rem),radial-gradient(circle_at_35%_72%,rgba(167,139,250,0.1),transparent_20rem)]" />
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="section-label">Output / Possibilities</p>
            <h2 id="outputs-title" className="section-title">
              Ideas, patterns, and decisions emerge continuously.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              The engine keeps transforming connected context into useful artifacts for research, product, marketing, planning, and strategy.
            </p>
          </div>
          <div className="relative min-h-[34rem] overflow-hidden border border-cyan-100/10 bg-white/[0.035]">
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-cyan-100/40 bg-cyan-200/10 shadow-[0_0_120px_rgba(34,211,238,0.22)]" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/10" />
            <div className="absolute left-1/2 top-1/2 h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime-100/10 max-sm:h-80 max-sm:w-80" />
            {outputs.map((item, index) => {
              const positions = [
                "left-[8%] top-[11%]",
                "right-[12%] top-[8%]",
                "left-[3%] top-[43%]",
                "right-[3%] top-[42%]",
                "left-[14%] bottom-[12%]",
                "right-[15%] bottom-[10%]",
                "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lime-100",
              ];

              return (
                <div
                  key={item}
                  className={`absolute ${positions[index]} border border-cyan-100/15 bg-[#030811]/72 px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="final" className="border-t border-white/10 bg-[#04070d] px-5 py-24 sm:px-8 sm:py-32" aria-labelledby="final-title">
        <div className="mx-auto max-w-5xl text-center">
          <p className="section-label mx-auto">Final CTA</p>
          <h2 id="final-title" className="mx-auto max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
            Start building your own intelligence engine.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Collect what you know, structure it into modular brains, and let growing knowledge keep generating new strategic value.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#hero"
              className="inline-flex min-h-12 items-center justify-center border border-cyan-50/40 bg-cyan-50 px-5 text-sm font-bold text-[#031018] transition hover:-translate-y-0.5"
            >
              Start Building
            </a>
            <a
              href="#system"
              className="inline-flex min-h-12 items-center justify-center border border-white/15 bg-white/[0.055] px-5 text-sm font-bold text-slate-100 transition hover:-translate-y-0.5"
            >
              Explore the System
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
