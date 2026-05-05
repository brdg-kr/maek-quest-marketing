const useCases = [
  "기획",
  "리서치",
  "마케팅",
  "제품 아이디어",
  "팀 지식 관리",
];

export function UseCaseSection() {
  return (
    <section id="use-cases" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_42%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_22%_72%,rgba(124,58,237,0.1),transparent_24%)]" />
      <div className="mx-auto grid w-full max-w-[1220px] gap-12 px-5 sm:px-7 lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
        <div>
          <p className="section-label">USE CASES</p>
          <h2 className="section-title">질문마다 다른 지능을 구축합니다.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            프로젝트, 시장, 고객, 팀 지식처럼 반복해서 다루는 맥락을 하나의
            확장 가능한 시스템으로 묶습니다.
          </p>
        </div>
        <div className="relative min-h-[430px]">
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-cyan-100/40 bg-cyan-200/10 shadow-[0_0_90px_rgba(34,211,238,0.24)]" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 max-sm:h-80 max-sm:w-80" />
          {useCases.map((item, index) => {
            const positions = [
              "left-[4%] top-[14%]",
              "right-[10%] top-[10%]",
              "left-[2%] bottom-[20%]",
              "right-[1%] bottom-[24%]",
              "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            ];

            return (
              <div
                key={item}
                className={`absolute ${positions[index]} border border-white/12 bg-white/[0.045] px-5 py-4 text-sm font-medium text-slate-100 shadow-2xl shadow-black/20 backdrop-blur-md`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
