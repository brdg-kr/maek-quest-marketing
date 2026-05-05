import type { Metadata } from "next";
import { MechanicalBrainVisual } from "../components/MechanicalBrainVisual";

export const metadata: Metadata = {
  title: "Modular Expanding Brains",
  description:
    "A cinematic MAEK landing page for turning collected data into modular, expanding intelligence cores.",
  alternates: {
    canonical: "/2",
  },
};

const sequence = [
  ["Input", "Collected sources enter as high-density streams."],
  ["Core", "Mechanical layers compress signal into modular intelligence."],
  ["Expansion", "New connections radiate as ideas, insights, and decisions."],
];

const modules = [
  "Research",
  "Market signals",
  "Customer memory",
  "Product strategy",
  "Campaign intelligence",
  "Founder context",
];

export default function PageTwo() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030405] text-stone-100">
      <section
        id="hero"
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-[92svh] flex-col overflow-hidden border-b border-white/10"
      >
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(120deg,#030405_0%,#07100f_36%,#100f0b_62%,#030405_100%)]" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_72%_42%,rgba(32,211,238,0.17),transparent_42%),radial-gradient(ellipse_at_30%_18%,rgba(244,211,126,0.12),transparent_34%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#030405] via-[#030405]/72 to-transparent" />

        <MechanicalBrainVisual />

        <header className="relative z-10 mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-6 sm:px-8">
          <a href="#hero" className="flex items-center gap-3 text-sm font-semibold text-white" aria-label="MAEK home">
            <span className="relative h-8 w-8 border border-stone-200/25 bg-white/5 shadow-[0_0_28px_rgba(125,211,252,0.18)]">
              <span className="absolute inset-[9px] bg-cyan-100 shadow-[0_0_20px_rgba(165,243,252,0.95)]" />
            </span>
            <span>MAEK</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-stone-300 md:flex" aria-label="Primary navigation">
            <a className="transition hover:text-white" href="#system">
              System
            </a>
            <a className="transition hover:text-white" href="#modules">
              Modules
            </a>
            <a className="transition hover:text-white" href="#access">
              Access
            </a>
          </nav>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 items-end px-5 pb-14 pt-20 sm:px-8 sm:pb-20 lg:pb-24">
          <div className="max-w-4xl">
            <p className="mb-5 text-[0.74rem] font-bold uppercase leading-none tracking-[0.28em] text-amber-100/80">
              Mechanical intelligence for collected data
            </p>
            <h1
              id="hero-title"
              className="max-w-5xl text-[3.55rem] font-semibold leading-[0.92] text-white sm:text-7xl lg:text-[8.6rem]"
            >
              <span className="block">MAEK</span>
              <span className="block text-stone-300">expands brains.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
              Collected data compresses into intelligent cores. New connections
              expand outward as ideas, signals, and decisions.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#access"
                className="inline-flex min-h-12 items-center justify-center border border-amber-100/30 bg-[#f4d37e] px-5 text-sm font-bold text-black shadow-[0_20px_70px_rgba(244,211,126,0.18)] transition hover:-translate-y-0.5"
              >
                Request access
              </a>
              <a
                href="#system"
                className="inline-flex min-h-12 items-center justify-center border border-white/15 bg-white/[0.045] px-5 text-sm font-bold text-stone-100 backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-100/35"
              >
                View system
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="system" className="border-b border-white/10 bg-[#050607] px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="system-title">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="mb-5 text-[0.74rem] font-bold uppercase leading-none tracking-[0.26em] text-cyan-100/70">
              System
            </p>
            <h2 id="system-title" className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Data in. Cognition out.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {sequence.map(([title, body]) => (
              <article key={title} className="bg-[#070b0c] p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-stone-300">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="modules" className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="modules-title">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#030405_0%,#08100d_52%,#030405_100%)]" />
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="mb-5 text-[0.74rem] font-bold uppercase leading-none tracking-[0.26em] text-amber-100/70">
              Modules
            </p>
            <h2 id="modules-title" className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Separate brains for serious questions.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
            {modules.map((module) => (
              <div key={module} className="min-h-24 bg-white/[0.035] p-5 text-sm font-semibold text-stone-200">
                {module}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="access" className="border-t border-white/10 bg-[#050607] px-5 py-20 sm:px-8 sm:py-24" aria-labelledby="access-title">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[0.74rem] font-bold uppercase leading-none tracking-[0.26em] text-cyan-100/70">
              Access
            </p>
            <h2 id="access-title" className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Build the brain your data has been waiting for.
            </h2>
          </div>
          <a
            href="mailto:hello@maek.quest"
            className="inline-flex min-h-12 shrink-0 items-center justify-center border border-amber-100/30 bg-[#f4d37e] px-5 text-sm font-bold text-black transition hover:-translate-y-0.5"
          >
            hello@maek.quest
          </a>
        </div>
      </section>
    </main>
  );
}
