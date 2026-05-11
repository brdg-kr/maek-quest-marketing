"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { MaekLogo } from "./components/MaekLogo";

type Hotspot = {
  id: string;
  title: string;
  label: string;
  description: string;
  detail: string;
  metric: string;
  bounds: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
};

type PointerPosition = {
  x: number;
  y: number;
};

const imageSrc = "/images/maek-system-flow-cropped.png";

const mobileSequence = [
  {
    title: "Source Materials",
    src: "/images/mobile-01-source-materials.png",
    alt: "Source Materials section showing documents, tables, audio, media, images, and code sources.",
  },
  {
    title: "Dataset Package",
    src: "/images/mobile-02-dataset-package.png",
    alt: "Dataset Package section showing raw materials transformed into a structured dataset package.",
  },
  {
    title: "Knowledge Graph",
    src: "/images/mobile-03-knowledge-graph.png",
    alt: "Knowledge Graph section showing connected assets, answers, and insights linked back to evidence.",
  },
  {
    title: "Knowledge In Use",
    src: "/images/mobile-04-knowledge-in-use.png",
    alt: "Knowledge In Use section showing brief, evidence Q&A, compare, and report outputs.",
  },
];

const hotspots: Hotspot[] = [
  {
    id: "source",
    title: "Source Materials",
    label: "Capture the raw signal",
    description:
      "Documents, tables, audio, media, images, and code enter as evidence instead of being flattened into a generic upload bin.",
    detail:
      "This is where MAEK preserves the origin and type of every source, so downstream answers can still point back to the material that supports them.",
    metric: "Documents / Tables / Audio / Media / Images",
    bounds: {
      left: "1.8%",
      top: "11.7%",
      width: "21.5%",
      height: "75.2%",
    },
  },
  {
    id: "package",
    title: "Dataset Package",
    label: "Normalize into a portable package",
    description:
      "The source set becomes a structured package with documents, media, audio, tables, images, metadata, and links kept in one contract.",
    detail:
      "The point is portability: the viewer can open the package, validate it, and reuse the same evidence structure without rebuilding the project story.",
    metric: "Portable evidence contract",
    bounds: {
      left: "24%",
      top: "10.5%",
      width: "25.5%",
      height: "80.4%",
    },
  },
  {
    id: "graph",
    title: "Knowledge Graph",
    label: "Connect evidence into structure",
    description:
      "Entities, media, documents, and table facts are connected into a graph that can be checked and traversed.",
    detail:
      "This layer changes the package from storage into reasoning material: relationships become visible, comparable, and reusable across workflows.",
    metric: "Linked entities + verified relationships",
    bounds: {
      left: "52.3%",
      top: "13.1%",
      width: "22%",
      height: "76.5%",
    },
  },
  {
    id: "use",
    title: "Knowledge In Use",
    label: "Turn structure into work",
    description:
      "The graph produces briefs, evidence Q&A, comparisons, and reports while keeping the supporting context attached.",
    detail:
      "This is the product promise: not a static archive, but source-grounded output that can be inspected, defended, and reused.",
    metric: "Brief / Q&A / Compare / Report",
    bounds: {
      left: "76%",
      top: "11.7%",
      width: "22%",
      height: "80.4%",
    },
  },
];

const processBlocks: Array<{
  title: string;
  body: string;
  iconSrc: string;
}> = [
  {
    title: "Engine",
    body: "Ingest, normalize, and structure source materials. Extract metadata and create traceable links.",
    iconSrc: "/images/icon-engine.png",
  },
  {
    title: "Dataset System",
    body: "Organized, versioned dataset packages with evidence links and relationships across all assets.",
    iconSrc: "/images/icon-dataset-system.png",
  },
  {
    title: "Brain Layer",
    body: "Knowledge graph connects every chunk, answer, and insight back to its evidence.",
    iconSrc: "/images/icon-brain-layer.png",
  },
  {
    title: "Viewer",
    body: "Explore, ask, compare, and build with confidence, always grounded in evidence.",
    iconSrc: "/images/icon-viewer.png",
  },
];

const benefitBlocks: Array<{
  title: string;
  iconSrc: string;
}> = [
  {
    title: "Grounded in your data",
    iconSrc: "/images/icon-grounded.png",
  },
  {
    title: "Every answer linked to evidence",
    iconSrc: "/images/icon-evidence-link.png",
  },
  {
    title: "Private and under your control",
    iconSrc: "/images/icon-private.png",
  },
  {
    title: "Reusable across projects and teams",
    iconSrc: "/images/icon-reusable.png",
  },
  {
    title: "Built for professional workflows",
    iconSrc: "/images/icon-workflows.png",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function FadeInOnView({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.14,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-opacity duration-[850ms] ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function SystemStackSection() {
  return (
    <section className="px-4 pb-16 pt-10 sm:px-6 md:px-8 md:pb-20 md:pt-16" aria-labelledby="system-stack-title">
      <div className="mx-auto max-w-[1440px]">
        <FadeInOnView className="border-t border-[#0a2a57]/20 pt-8 md:pt-10">
          <div className="mb-6 flex items-end justify-between gap-5">
            <h2 id="system-stack-title" className="text-xl font-semibold uppercase tracking-[0.08em] text-[#061d48] md:text-2xl">
              System Flow
            </h2>
            <p className="hidden max-w-xl text-right text-sm leading-6 text-[#425a6d] md:block">
              Four layers carry source material from ingestion to evidence-grounded use.
            </p>
          </div>

          <div className="relative grid gap-4 md:grid-cols-4 md:gap-5">
            <div className="absolute left-7 top-0 hidden h-full w-px bg-[#0a2a57]/18 max-md:block" />
            {processBlocks.map((item, index) => (
              <article key={item.title} className="relative grid gap-4 rounded-[6px] border border-[#d7dee9] bg-white p-5 shadow-[0_14px_42px_rgba(10,42,87,0.06)]">
                {index < processBlocks.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute right-[-1.7rem] top-1/2 z-10 hidden w-9 -translate-y-1/2 items-center text-[#061d48]/72 md:flex"
                  >
                    <span className="h-px flex-1 bg-[#0a2a57]/20" />
                    <svg viewBox="0 0 18 18" className="ml-1 h-[1.05rem] w-[1.05rem]">
                      <path d="m6.6 3.7 5.1 5.3-5.1 5.3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                ) : null}
                <div className="flex items-start gap-4">
                  <div className="relative h-[4.25rem] w-[4.25rem] shrink-0 overflow-hidden rounded-[6px] bg-white">
                    <Image
                      src={item.iconSrc}
                      alt=""
                      width={160}
                      height={160}
                      loading="eager"
                      sizes="68px"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-mono text-xs font-semibold text-[#087a45]">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 text-lg font-bold uppercase tracking-[0.02em] text-[#061d48]">{item.title}</h3>
                  </div>
                </div>
                <p className="text-[0.95rem] leading-6 text-[#0d2b57]">{item.body}</p>
              </article>
            ))}
          </div>
        </FadeInOnView>

        <FadeInOnView className="mt-8 border-t border-[#0a2a57]/18 pt-7 md:mt-9" delay={120}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-[#0a2a57]/16">
            {benefitBlocks.map((item) => (
              <div key={item.title} className="flex items-center gap-4 text-[#061d48] lg:px-5 first:lg:pl-0 last:lg:pr-0">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden bg-white">
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={112}
                    height={112}
                    loading="eager"
                    sizes="48px"
                    className="h-full w-full object-contain"
                  />
                </span>
                <p className="text-base font-medium leading-6">{item.title}</p>
              </div>
            ))}
          </div>
        </FadeInOnView>
      </div>
    </section>
  );
}

export function HomeExperience() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pointer, setPointer] = useState<PointerPosition>({ x: 40, y: 48 });
  const [isCardVisible, setIsCardVisible] = useState(false);

  const activeHotspot = useMemo(
    () => hotspots.find((hotspot) => hotspot.id === activeId) ?? null,
    [activeId],
  );

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = ((event.clientX - rect.left) / rect.width) * 100;
    const nextY = ((event.clientY - rect.top) / rect.height) * 100;

    setPointer({
      x: clamp(nextX, 3, 97),
      y: clamp(nextY, 5, 95),
    });
  }, []);

  const panelStyle: CSSProperties = {
    left: `${clamp(pointer.x + (pointer.x > 58 ? -4 : 4), 9, 91)}%`,
    top: `${clamp(pointer.y + (pointer.y > 55 ? -12 : 12), 28, 84)}%`,
    transform: pointer.x > 58 ? "translate(-100%, -50%)" : "translate(0, -50%)",
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#07100c]">
      <section aria-labelledby="page-five-title" className="relative isolate px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4">
          <header className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#10251a]/58">
            <MaekLogo />
            <nav className="flex items-center gap-4 text-right" aria-label="Primary navigation">
              <a href="/ai-stage-map" className="transition hover:text-[#087a45]">
                AI Stage Map
              </a>
            </nav>
          </header>

          <div className="md:hidden">
            <div className="pb-5 pt-4">
              <h1
                id="page-five-title"
                className="max-w-[22rem] text-[1.92rem] font-semibold leading-[1.07] tracking-normal text-[#07100c]"
              >
                Source material becomes defensible intelligence.
              </h1>
              <p className="mt-4 max-w-[21rem] text-[0.96rem] leading-7 text-[#34473d]">
                One package carries the evidence chain from raw files to graph-backed outputs.
              </p>
            </div>

            <div className="space-y-7">
              {mobileSequence.map((item, index) => (
                <figure key={item.title} className="mx-auto max-w-[28rem]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={941}
                    height={1672}
                    priority={index === 0}
                    sizes="100vw"
                    className="h-auto w-full"
                  />
                </figure>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              <div
                className="group relative mx-auto max-w-[1440px] overflow-hidden bg-white"
                onPointerMove={handlePointerMove}
                onPointerLeave={() => {
                  setActiveId(null);
                  setIsCardVisible(false);
                }}
              >
                <Image
                  src={imageSrc}
                  alt="MAEK system diagram showing source materials becoming a dataset package, knowledge graph, and knowledge-in-use outputs."
                  width={1536}
                  height={790}
                  priority
                  sizes="(min-width: 1280px) 1440px, 96vw"
                  onLoad={() => setImageLoaded(true)}
                  className={`h-auto w-full transition-opacity duration-[850ms] ease-out ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="absolute inset-0 z-20">
                  {hotspots.map((hotspot) => {
                    return (
                      <button
                        key={hotspot.id}
                        type="button"
                        aria-label={`${hotspot.title}: ${hotspot.label}`}
                        onPointerEnter={() => {
                          setActiveId(hotspot.id);
                          setIsCardVisible(true);
                        }}
                        onFocus={() => {
                          setActiveId(hotspot.id);
                          setIsCardVisible(true);
                        }}
                        onClick={() => {
                          setActiveId(hotspot.id);
                          setIsCardVisible(true);
                        }}
                        className="absolute bg-transparent"
                        style={hotspot.bounds}
                      />
                    );
                  })}
                </div>

                {activeHotspot ? (
                  <aside
                    className={`pointer-events-none absolute z-40 hidden w-[22rem] bg-[#07100c]/90 p-5 text-[#f7fff9] shadow-[0_22px_70px_rgba(0,0,0,0.26)] backdrop-blur-xl transition duration-150 md:block ${
                      isCardVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={panelStyle}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9fd8b8]">
                      {activeHotspot.metric}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold leading-tight" id={`${activeHotspot.id}-title`}>
                      {activeHotspot.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[#d7eee0]/86">{activeHotspot.description}</p>
                    <p className="mt-4 border-l-2 border-[#087a45] pl-4 text-sm leading-6 text-[#f7fff9]">
                      {activeHotspot.detail}
                    </p>
                  </aside>
                ) : null}
              </div>

              <FadeInOnView className="grid gap-3 pt-3 sm:pt-4 lg:grid-cols-[minmax(18rem,0.58fr)_minmax(0,0.42fr)] lg:items-end" delay={90}>
                <h1
                  id="page-five-title-desktop"
                  className="max-w-4xl text-[clamp(2rem,2.65vw,3.5rem)] font-semibold leading-[0.99] tracking-normal text-[#07100c]"
                >
                  Source material becomes defensible intelligence.
                </h1>
                <p className="max-w-2xl text-[clamp(0.95rem,1.2vw,1.1rem)] leading-7 text-[#34473d] lg:pb-1">
                  One package carries the evidence chain from raw files to graph-backed outputs: briefs, evidence Q&A,
                  comparisons, and reports.
                </p>
              </FadeInOnView>

              {activeHotspot ? (
                <section
                  aria-labelledby="active-region-title"
                  className={`mt-4 bg-[#07100c] p-5 text-[#d7eee0] transition md:hidden ${
                    isCardVisible ? "block" : "hidden"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9fd8b8]">
                    {activeHotspot.metric}
                  </p>
                  <h2 id="active-region-title" className="mt-3 text-2xl font-semibold text-[#f7fff9]">
                    {activeHotspot.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#d7eee0]/86">{activeHotspot.description}</p>
                  <p className="mt-4 border-l-2 border-[#087a45] pl-4 text-sm leading-6 text-[#f7fff9]">
                    {activeHotspot.detail}
                  </p>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <SystemStackSection />

      <footer className="border-t border-[#0a2a57]/14 px-4 py-8 text-[#34473d] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <MaekLogo />
          <p>Source-grounded intelligence systems for professional workflows.</p>
          <p className="text-[#34473d]/70">© 2026 MAEK. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}
