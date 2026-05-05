const flowSteps = [
  ["수집", "문서, 노트, 리서치, 피드백을 하나의 흐름으로 끌어옵니다."],
  ["구조화", "흩어진 조각을 맥락별로 압축하고 연결합니다."],
  ["확장", "축적된 맥락이 새로운 노드와 관계를 만들어냅니다."],
  ["생성", "정리된 지능에서 아이디어, 전략, 콘텐츠가 나옵니다."],
];

export function FlowSection() {
  return (
    <section id="flow" className="border-y border-white/10 bg-[#050b13] py-24 sm:py-28">
      <div className="mx-auto w-full max-w-[1220px] px-5 sm:px-7">
        <div className="mb-14 max-w-3xl">
          <p className="section-label">MAEK FLOW</p>
          <h2 className="section-title">흐름이 모이고, 구조가 생기고, 아이디어가 확장됩니다.</h2>
        </div>
        <ol className="grid gap-0 border-y border-white/10 lg:grid-cols-4">
          {flowSteps.map(([title, body], index) => (
            <li
              key={title}
              className="group relative min-h-60 overflow-hidden border-white/10 px-6 py-8 lg:border-r lg:last:border-r-0"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
              <span className="font-mono text-sm font-medium text-cyan-200/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mt-12 h-12 w-12 rotate-45 border border-cyan-100/28 bg-cyan-200/8 shadow-[0_0_34px_rgba(34,211,238,0.14)]" />
              <h3 className="mt-10 text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-5 text-sm leading-6 text-slate-300">{body}</p>
              {index < flowSteps.length - 1 && (
                <span className="absolute right-5 top-1/2 hidden h-px w-10 bg-gradient-to-r from-cyan-200/70 to-transparent lg:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
