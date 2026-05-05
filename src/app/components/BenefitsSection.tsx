const benefits = [
  ["흩어진 데이터를 다시 활용", "버려진 자료와 이전 기록이 다음 작업의 맥락으로 되살아납니다."],
  ["맥락 기반 아이디어 생성", "단발성 프롬프트가 아니라 축적된 구조에서 결과를 만듭니다."],
  ["반복할수록 더 정교해짐", "새로운 입력과 판단이 쌓일수록 시스템의 해상도가 높아집니다."],
  ["개인과 팀 모두 확장 가능", "개별 프로젝트부터 팀 지식 운영까지 같은 원리로 확장됩니다."],
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="bg-[#070a10] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1160px] px-5 sm:px-7">
        <div className="mb-12 max-w-3xl">
          <p className="section-label">WHY MAEK</p>
          <h2 className="section-title">데이터는 쌓이고, 시스템은 더 정교해집니다.</h2>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {benefits.map(([title, body], index) => (
            <article key={title} className="grid gap-5 py-8 sm:grid-cols-[110px_0.8fr_1.2fr] sm:items-start">
              <span className="font-mono text-sm text-cyan-200/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-semibold text-white">{title}</h3>
              <p className="max-w-2xl text-base leading-7 text-slate-300">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
