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

const referenceSignals = [
  {
    source: "Voice intelligence",
    pattern: "Article launch",
    signal:
      "Centered date, category tags, oversized headline, wide video, article tools, voice demo, tabs, and long-form sections.",
  },
  {
    source: "Daybreak",
    pattern: "Symbolic hero",
    signal:
      "White field, huge wordmark, single accent, small pill CTAs, symbolic system graphic, table, tabs, partner proof.",
  },
  {
    source: "Frontier",
    pattern: "Enterprise platform",
    signal:
      "Centered platform statement, customer logo strip, architecture diagram, feature blocks, industry proof, governance copy.",
  },
  {
    source: "Small business stories",
    pattern: "Editorial story",
    signal:
      "Real video, large photo grids, founder quotes, compact prompt-response examples, and generous section spacing.",
  },
];

const colorTokens = [
  ["Canvas", "#ffffff", "Page background"],
  ["Soft canvas", "#f7f5f0", "Secondary surface"],
  ["Ink", "#171717", "Primary text"],
  ["Muted", "#5f6470", "Secondary text"],
  ["Line", "#e7e2d9", "Hairline borders"],
  ["Signal", "#0f766e", "Primary accent"],
  ["Sage", "#edf4ef", "Quiet proof panels"],
  ["Steel", "#edf3f4", "Technical diagrams"],
];

const components = [
  {
    title: "Hero",
    body: "One message, centered. Use a date or context line above, one large headline, one plain lead, and one media asset below.",
  },
  {
    title: "Media",
    body: "Use actual product, workflow, or customer evidence. Keep it wide, unframed, and separated by generous whitespace.",
  },
  {
    title: "Proof",
    body: "Use logo rows, architecture diagrams, tables, quotes, and short tabs. Avoid stacked decorative cards.",
  },
  {
    title: "Story",
    body: "Long-form sections can breathe. Pair paragraphs with images, prompt examples, and short pull quotes.",
  },
];

const prompts = [
  {
    title: "Question",
    text: "What evidence supports this answer, and where did it come from?",
  },
  {
    title: "System answer",
    text: "Show the source package, linked entities, exact passage, and workflow output in one traceable view.",
  },
  {
    title: "Design rule",
    text: "Make the evidence visible before describing the interface.",
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
          <nav className="hidden items-center gap-7 text-[0.78rem] font-semibold text-[#171717]/72 md:flex">
            <a href="#references" className="transition hover:text-[#171717]">
              References
            </a>
            <a href="#tokens" className="transition hover:text-[#171717]">
              Tokens
            </a>
            <a href="#components" className="transition hover:text-[#171717]">
              Components
            </a>
          </nav>
          <a
            href="/system-flow"
            className="rounded-full bg-[#171717] px-4 py-2 text-[0.78rem] font-semibold text-white transition hover:bg-[#27313a]"
            style={{ color: "#ffffff" }}
          >
            System flow
          </a>
        </div>
      </header>

      <section className="px-4 pb-12 pt-20 sm:px-6 md:pb-16 md:pt-24 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-[0.78rem] font-semibold text-[#5f6470]">
              Reference audit / OpenAI editorial system / MAEK adaptation
            </p>
            <h1 className="mt-7 text-[clamp(3.5rem,8vw,8.6rem)] font-semibold leading-[0.92] tracking-normal">
              Editorial intelligence, not another dashboard.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-[clamp(1.05rem,1.5vw,1.35rem)] leading-8 text-[#4f555b]">
              This subpage defines a quieter MAEK design language based on the observed OpenAI page patterns:
              large type, real evidence media, restrained color, and structured proof.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#tokens"
                className="rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#27313a]"
                style={{ color: "#ffffff" }}
              >
                View tokens
              </a>
              <a
                href="#references"
                className="rounded-full bg-[#f7f5f0] px-5 py-3 text-sm font-semibold text-[#171717] transition hover:bg-[#eee9df]"
              >
                Reference signals
              </a>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-[68rem]">
            <div className="relative overflow-hidden rounded-[8px] border border-[#e7e2d9] bg-white">
              <div className="grid min-h-[30rem] place-items-center px-6 py-12 text-center">
                <div>
                  <p className="text-[clamp(4rem,12vw,11rem)] font-semibold leading-none text-[#1f2a44]">MAEK</p>
                  <div className="mx-auto mt-6 h-28 w-56 overflow-hidden">
                    <div className="mx-auto h-40 w-40 rounded-full bg-[#edf4ef] ring-1 ring-[#0f766e]/20" />
                    <div className="-mt-20 h-24 bg-white/92 shadow-[0_-28px_64px_rgba(255,255,255,0.95)]" />
                  </div>
                  <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-[#4f555b]">
                    Source material becomes a system of evidence that can be read, questioned, and reused.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="references" className="border-t border-[#e7e2d9] bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(18rem,0.32fr)_minmax(0,0.68fr)]">
            <div>
              <SectionLabel>Verified Reference Signals</SectionLabel>
              <h2 className="mt-4 text-[clamp(2.4rem,4.6vw,5.2rem)] font-semibold leading-[0.98] tracking-normal">
                What the pages actually use.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[8px] border border-[#e7e2d9] bg-[#e7e2d9] md:grid-cols-2">
              {referenceSignals.map((item) => (
                <article key={item.source} className="bg-[#f7f5f0] p-6 md:p-7">
                  <p className="text-sm font-semibold text-[#0f766e]">{item.source}</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">{item.pattern}</h3>
                  <p className="mt-5 text-base leading-7 text-[#5a6168]">{item.signal}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="tokens" className="bg-[#f7f5f0] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.52fr)_minmax(20rem,0.48fr)] lg:items-start">
            <div>
              <SectionLabel>Design Tokens</SectionLabel>
              <h2 className="mt-4 text-[clamp(2.6rem,5vw,6rem)] font-semibold leading-[0.96] tracking-normal">
                White space first. Color second.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5a6168]">
                The system should feel editorial and inspectable: black text, calm signal color, thin borders,
                large open sections, and only enough UI chrome to support the story.
              </p>
            </div>
            <div className="grid gap-3">
              {colorTokens.map(([name, value, use]) => (
                <div key={name} className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-4 border-t border-[#e7e2d9] py-4">
                  <span className="h-14 w-14 rounded-[8px] border border-[#e7e2d9]" style={{ backgroundColor: value }} />
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="mt-1 font-mono text-xs text-[#5f6470]">
                      {value} / {use}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-6 border-t border-[#e7e2d9] pt-8 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)]">
            <div>
              <p className="text-[clamp(2.4rem,5vw,5.6rem)] font-semibold leading-[0.96] tracking-normal">
                Use type as the visual system.
              </p>
            </div>
            <div className="grid gap-4 text-[#4f555b]">
              <p className="text-2xl font-semibold leading-tight text-[#171717]">Scale</p>
              <p className="text-base leading-7">
                Hero headlines should be 64-138px on desktop and reduce with clamp. Section titles should
                stay compact enough to leave the next section visible.
              </p>
              <p className="text-base leading-7">
                Body copy should use high line-height and narrow measure. Do not explain the UI in the UI;
                let the evidence, media, and component shape carry meaning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="components" className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionLabel>Component System</SectionLabel>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.6rem,5vw,6rem)] font-semibold leading-[0.96] tracking-normal">
                Components that prove, not decorate.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#5a6168] md:text-right">
              Each component must answer one evidence question: what happened, what supports it, who trusts it,
              or what action follows.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[8px] border border-[#e7e2d9] bg-[#e7e2d9] md:grid-cols-4">
            {components.map((item) => (
              <article key={item.title} className="bg-[#f7f5f0] p-6">
                <h3 className="text-2xl font-semibold leading-tight">{item.title}</h3>
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
                Media block: a real workflow asset, not a decorative illustration.
              </figcaption>
            </figure>

            <div className="grid gap-3">
              {prompts.map((item) => (
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
              Page Template
            </p>
            <h2 className="mt-4 text-[clamp(2.6rem,5vw,6rem)] font-semibold leading-[0.96] tracking-normal">
              Build pages as evidence essays.
            </h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[8px] border border-white/18 bg-white/18">
            {[
              "Start with one clear thesis and one real media object.",
              "Move into a proof section: customer logos, architecture, table, or tabs.",
              "Use prompt-response cards only where they reveal actual workflow behavior.",
              "End with one focused action, not a generic feature grid.",
            ].map((item, index) => (
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
