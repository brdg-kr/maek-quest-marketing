"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { MaekLogo } from "./components/MaekLogo";

const problemPoints = [
  "무엇을 만들어야 할지 정리하기 어렵습니다.",
  "AI에게 어떻게 설명해야 할지 모릅니다.",
  "개발 용어와 화면 용어가 낯섭니다.",
  "만든 서비스를 어디에 올리고 어떻게 공유할지 막힙니다.",
  "직원마다 제각각 만들면 관리가 어려워집니다.",
];

const flowSteps = [
  { title: "아이디어 입력", body: "직원이 만들고 싶은 업무 도구를 말로 적습니다." },
  { title: "업무 흐름 정리", body: "필요한 단계, 사용자, 입력값을 먼저 잡습니다." },
  { title: "화면 구성", body: "목록, 상세, 신청, 승인 같은 실제 화면으로 바꿉니다." },
  { title: "기능 설명", body: "AI가 이해할 수 있는 개발 요청으로 정리합니다." },
  { title: "사내 실행", body: "완성된 서비스를 회사 안에서 바로 접속하게 합니다." },
];

const scenes = [
  {
    label: "신청 목록",
    before: "엑셀로 신청 내역을 받고 상태를 따로 표시함",
    after: "신청, 검토, 완료 상태가 보이는 사내 웹 서비스",
    fields: ["신청자", "요청 내용", "상태"],
  },
  {
    label: "승인 절차",
    before: "메신저로 승인 요청을 보내고 진행 상황을 놓침",
    after: "요청과 승인 상태를 한 화면에서 확인하는 승인 앱",
    fields: ["요청", "승인자", "결과"],
  },
  {
    label: "현장 점검",
    before: "사진과 메모가 따로 들어와 확인이 늦어짐",
    after: "현장 사진, 메모, 처리 상태를 모으는 점검 앱",
    fields: ["사진", "메모", "처리 상태"],
  },
  {
    label: "고객 관리",
    before: "문의와 후속 조치가 직원별 파일에 흩어짐",
    after: "고객 문의, 담당자, 다음 조치를 관리하는 화면",
    fields: ["고객", "담당자", "다음 조치"],
  },
];

const values = [
  {
    title: "직원",
    body: "필요한 도구를 직접 설명하고 만들어 봅니다.",
  },
  {
    title: "회사",
    body: "작은 개선을 기다리지 않고 빠르게 실행합니다.",
  },
  {
    title: "대표",
    body: "외주비와 대기 시간을 줄이고 실험 속도를 높입니다.",
  },
];

export function LandingExperience() {
  const [activeScene, setActiveScene] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const track = (name: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("maek:event", { detail: { name } }));
    }
  };

  useEffect(() => {
    let tracked50 = false;
    let tracked90 = false;

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 1;

      if (!tracked50 && progress >= 0.5) {
        tracked50 = true;
        track("scroll_50");
      }

      if (!tracked90 && progress >= 0.9) {
        tracked90 = true;
        track("scroll_90");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openContact = (eventName: string) => {
    track(eventName);
    setFormSubmitted(false);
    setIsContactOpen(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    track("contact_form_submit");
    setFormSubmitted(true);
  };

  const currentScene = scenes[activeScene];

  return (
    <main className="min-h-screen bg-[#f4f7f2] pb-16 text-[#07100c] [word-break:keep-all] lg:pb-0">
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#0a2a57]/10 bg-[#f7f8f4]/94 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <MaekLogo />
          <nav className="flex items-center gap-4 text-sm font-semibold text-[#10251a]/64" aria-label="Primary navigation">
            <a className="hidden hover:text-[#087a45] sm:inline" href="#problem">
              문제
            </a>
            <a className="hidden hover:text-[#087a45] sm:inline" href="#structure">
              구조
            </a>
            <a className="hidden hover:text-[#087a45] md:inline" href="#scene">
              예시
            </a>
            <button
              type="button"
              onClick={() => openContact("header_cta_click")}
              className="min-h-11 rounded-[3px] bg-[#061d48] px-4 text-sm font-bold text-white"
              style={{ color: "#ffffff" }}
            >
              시작하기
            </button>
          </nav>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#f7f8f4] px-4 pb-20 pt-28 sm:px-6 lg:min-h-screen lg:px-8 lg:pb-24 lg:pt-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[minmax(0,0.55fr)_minmax(26rem,0.45fr)] lg:items-center">
          <div>
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#087a45]">Vibe Coding for Work</p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-normal text-[#061d48] sm:text-6xl lg:text-7xl">
              바이브 코딩을 회사의 실제 업무 도구로 바꾸는 플랫폼
            </h1>
            <div className="mt-8 max-w-3xl space-y-5 text-xl leading-8 text-[#34473d]">
              <p>개발을 모르는 직원도 아이디어를 입력하고, 업무 화면을 만들고, 사내에서 바로 사용할 수 있는 웹 서비스를 만들 수 있습니다.</p>
              <p>AI에게 무엇을 말해야 할지 몰라도 괜찮습니다. 용어를 몰라도, 처음 만들어보는 사람도 괜찮습니다.</p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openContact("hero_cta_click")}
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[3px] bg-[#061d48] px-5 text-sm font-bold text-white"
                style={{ color: "#ffffff" }}
              >
                바이브 코딩 시작하기
              </button>
              <a
                href="#structure"
                onClick={() => track("secondary_cta_click")}
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[3px] border border-[#0a2a57]/20 bg-white px-5 text-sm font-bold text-[#061d48] hover:border-[#087a45]/40"
              >
                서비스 구조 보기
              </a>
            </div>
          </div>

          <div className="rounded-[8px] border border-[#d7dee9] bg-white shadow-[0_24px_80px_rgba(10,42,87,0.08)]">
            <div className="border-b border-[#0a2a57]/12 px-5 py-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#087a45]">직원이 직접 만드는 사내 업무 서비스</p>
            </div>
            <div className="grid gap-5 p-5">
              <div className="rounded-[6px] bg-[#f4f7f2] p-4">
                <p className="text-sm font-semibold text-[#425a6d]">직원 입력</p>
                <p className="mt-3 text-2xl font-semibold leading-8 text-[#061d48]">“고객 요청을 접수하고 담당자에게 배정하는 화면이 필요해.”</p>
              </div>
              <div className="grid gap-2">
                {flowSteps.slice(0, 4).map((step, index) => (
                  <div key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-[#0a2a57]/10 py-2 last:border-b-0">
                    <span className="font-mono text-xs font-semibold text-[#087a45]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-semibold text-[#34473d]">{step.title}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-[6px] border border-[#d7dee9] bg-[#fbfcfa] p-4">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold leading-tight text-[#061d48]">내부 요청 관리</h2>
                  <span className="rounded-[3px] bg-[#e8f5ed] px-2.5 py-1 text-xs font-semibold text-[#087a45]">사내 실행</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["접수", "담당자", "상태"].map((item) => (
                    <span key={item} className="rounded-[3px] bg-white px-3 py-2 text-center text-xs font-semibold text-[#061d48] shadow-[inset_0_0_0_1px_rgba(10,42,87,0.1)]">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-4 grid gap-2 text-sm text-[#34473d]">
                  {["견적 요청", "배송 문의", "현장 확인"].map((item, index) => (
                    <div key={item} className="grid grid-cols-[1fr_5rem_4rem] gap-3 rounded-[3px] bg-white px-3 py-2">
                      <span className="font-semibold text-[#061d48]">{item}</span>
                      <span>{["영업", "운영", "현장"][index]}</span>
                      <span className="text-right text-[#087a45]">{["접수", "확인", "완료"][index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="problem-title">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start">
          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#087a45]">Problem</p>
            <h2 id="problem-title" className="text-4xl font-semibold leading-tight text-[#061d48] md:text-6xl">
              AI는 쉬워졌지만, 시작은 여전히 어렵습니다
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-xl leading-9 text-[#34473d]">
              많은 기업이 바이브 코딩을 도입하고 싶어합니다. 하지만 현장에서는 같은 막힘이 반복됩니다.
            </p>
            <ul className="mt-8 grid gap-0 rounded-[6px] border border-[#d7dee9] bg-white">
              {problemPoints.map((point, index) => (
                <li key={point} className="grid grid-cols-[3.25rem_minmax(0,1fr)] border-b border-[#0a2a57]/10 px-5 py-4 last:border-b-0">
                  <span className="font-mono text-xs font-semibold text-[#087a45]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-semibold leading-7 text-[#061d48]">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="structure" className="bg-white px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="structure-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)] lg:items-end">
            <h2 id="structure-title" className="text-4xl font-semibold leading-tight text-[#061d48] md:text-6xl">
              바이브 코딩에 필요한 모든 과정을 쉽게 연결합니다
            </h2>
            <p className="text-xl leading-9 text-[#34473d]">
              아이디어를 업무 흐름으로 정리하고, 필요한 화면과 기능을 구성하고, AI가 이해할 수 있는 입력으로 바꾸고, 완성된 서비스를 실행 가능한 형태로 제공합니다.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-5">
            {flowSteps.map((step, index) => (
              <div key={step.title} className="border-t border-[#0a2a57]/16 pt-5">
                <p className="font-mono text-xs font-semibold text-[#087a45]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl font-semibold leading-tight text-[#061d48]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#425a6d]">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[6px] border border-[#087a45]/28 bg-[#e8f5ed] p-6">
            <p className="max-w-4xl text-2xl font-semibold leading-9 text-[#061d48]">
              개발을 모르는 직원도 회사가 바로 쓸 수 있는 작은 업무 서비스를 만들 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section id="scene" className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="scene-title">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:items-start">
          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#087a45]">Scene</p>
            <h2 id="scene-title" className="text-4xl font-semibold leading-tight text-[#061d48] md:text-6xl">
              엑셀로 관리하던 업무가 웹 서비스가 됩니다
            </h2>
            <p className="mt-6 text-xl leading-9 text-[#34473d]">
              반복 확인 업무, 신청 목록, 승인 절차, 현장 점검, 고객 관리, 내부 요청 관리. 직원들이 매일 처리하던 작은 업무들이 직접 만든 사내 앱으로 바뀝니다.
            </p>
            <div className="mt-8 grid gap-2">
              {scenes.map((scene, index) => (
                <button
                  key={scene.label}
                  type="button"
                  onClick={() => {
                    setActiveScene(index);
                    track("scene_click");
                  }}
                  className={`grid min-h-12 grid-cols-[minmax(0,1fr)_2rem] items-center rounded-[3px] border px-4 text-left text-sm font-bold transition ${
                    activeScene === index
                      ? "border-[#087a45]/42 bg-white text-[#061d48] shadow-[0_14px_36px_rgba(8,122,69,0.08)]"
                      : "border-[#0a2a57]/12 bg-transparent text-[#425a6d]"
                  }`}
                >
                  <span>{scene.label}</span>
                  <span className="text-right font-mono text-xs text-[#087a45]">{String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-[#d7dee9] bg-white p-5 shadow-[0_18px_48px_rgba(10,42,87,0.05)]">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[6px] bg-[#f4f7f2] p-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#087a45]">Before</p>
                <p className="mt-4 text-xl font-semibold leading-8 text-[#061d48]">{currentScene.before}</p>
              </div>
              <div className="rounded-[6px] bg-[#061d48] p-4 text-white">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#7de7b1]">After</p>
                <p className="mt-4 text-xl font-semibold leading-8">{currentScene.after}</p>
              </div>
            </div>
            <div className="mt-5 rounded-[6px] border border-[#d7dee9] bg-[#fbfcfa] p-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold leading-tight text-[#061d48]">{currentScene.label}</h3>
                <span className="rounded-[3px] bg-[#e8f5ed] px-2.5 py-1 text-xs font-semibold text-[#087a45]">웹 서비스</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {currentScene.fields.map((field) => (
                  <span key={field} className="rounded-[3px] bg-white px-3 py-3 text-center text-xs font-semibold text-[#34473d] shadow-[inset_0_0_0_1px_rgba(10,42,87,0.1)]">
                    {field}
                  </span>
                ))}
              </div>
              <div className="mt-5 grid gap-2 text-sm text-[#34473d]">
                {["새 요청", "검토 중", "완료"].map((status, index) => (
                  <div key={status} className="grid grid-cols-[1fr_5rem_4rem] gap-3 rounded-[3px] bg-white px-3 py-2">
                    <span className="font-semibold text-[#061d48]">{currentScene.label} {index + 1}</span>
                    <span>담당 {index + 1}</span>
                    <span className="text-right text-[#087a45]">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="value" className="bg-white px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="value-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] lg:items-end">
            <h2 id="value-title" className="text-4xl font-semibold leading-tight text-[#061d48] md:text-6xl">
              회사는 더 빠르게 움직입니다
            </h2>
            <p className="text-xl leading-9 text-[#34473d]">
              작은 업무 도구를 만들기 위해 매번 외주를 맡기거나 개발팀을 기다릴 필요가 없습니다.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="border-t border-[#0a2a57]/16 pt-5">
                <h3 className="text-2xl font-semibold text-[#061d48]">{value.title}</h3>
                <p className="mt-4 text-lg leading-8 text-[#425a6d]">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="closing" className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="closing-title">
        <div className="mx-auto max-w-[1440px] rounded-[8px] bg-[#061d48] p-8 text-white md:p-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#7de7b1]">Closing</p>
          <h2 id="closing-title" className="mt-5 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
            바이브 코딩은 개발자의 전유물이 아닙니다
          </h2>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-[#d7eee0]">
            이제 일반 기업도 자신의 업무를 이해하는 직원들이 직접 업무 도구를 만들 수 있어야 합니다. 우리는 그 과정을 가장 쉽게 만듭니다.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openContact("closing_cta_click")}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[3px] bg-white px-5 text-sm font-bold text-[#061d48]"
            >
              바이브 코딩 시작하기
            </button>
            <a
              href="#structure"
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[3px] border border-white/20 px-5 text-sm font-bold text-white hover:border-[#7de7b1]/70"
            >
              서비스 구조 보기
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#0a2a57]/14 px-4 py-8 text-[#34473d] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[#34473d]/70">© 2026 MAEK.</p>
          <nav className="flex flex-wrap gap-4" aria-label="Footer">
            <a href="#closing" className="hover:text-[#087a45] visited:text-[#4d6378]">문의</a>
            <a href="#closing" className="hover:text-[#087a45] visited:text-[#4d6378]">개인정보처리방침</a>
            <a href="#closing" className="hover:text-[#087a45] visited:text-[#4d6378]">이용약관</a>
          </nav>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => openContact("mobile_sticky_cta_click")}
        className="fixed bottom-3 left-3 right-3 z-30 min-h-12 rounded-[3px] bg-[#061d48] text-sm font-bold text-white shadow-[0_12px_32px_rgba(10,42,87,0.22)] lg:hidden"
        style={{ color: "#ffffff" }}
      >
        바이브 코딩 시작하기
      </button>

      {isContactOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#07100c]/46 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
          <div className="max-h-full w-full max-w-2xl overflow-auto rounded-[6px] bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 id="contact-modal-title" className="text-3xl font-semibold leading-tight text-[#061d48]">바이브 코딩 시작하기</h2>
                <p className="mt-2 text-base leading-7 text-[#425a6d]">회사에서 먼저 만들고 싶은 작은 업무 서비스를 알려주세요.</p>
              </div>
              <button type="button" onClick={() => setIsContactOpen(false)} className="min-h-11 min-w-11 rounded-[3px] border border-[#d7dee9] text-sm font-bold text-[#061d48]">
                닫기
              </button>
            </div>

            {formSubmitted ? (
              <p className="mt-8 rounded-[6px] bg-[#e8f5ed] p-5 text-lg font-semibold leading-7 text-[#061d48]">
                문의가 기록되었습니다. 첫 업무 도구를 정리하는 방식으로 이어가겠습니다.
              </p>
            ) : (
              <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
                {[
                  { name: "name", label: "이름", autoComplete: "name" },
                  { name: "company", label: "회사명", autoComplete: "organization" },
                  { name: "contact", label: "연락처 또는 이메일", autoComplete: "email" },
                  { name: "idea", label: "만들고 싶은 업무 서비스", autoComplete: "off" },
                ].map((field) => (
                  <label key={field.name} className="grid gap-2 text-sm font-semibold text-[#061d48]">
                    {field.label}
                    <input
                      name={field.name}
                      autoComplete={field.autoComplete}
                      className="min-h-12 rounded-[3px] border border-[#d7dee9] px-3 text-base font-normal text-[#07100c]"
                    />
                  </label>
                ))}
                <label className="grid gap-2 text-sm font-semibold text-[#061d48]">
                  현재 막히는 지점
                  <textarea name="message" className="min-h-28 rounded-[3px] border border-[#d7dee9] px-3 py-3 text-base font-normal text-[#07100c]" />
                </label>
                <button type="submit" className="mt-2 min-h-12 rounded-[3px] bg-[#061d48] text-sm font-bold text-white" style={{ color: "#ffffff" }}>
                  시작 문의 보내기
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
