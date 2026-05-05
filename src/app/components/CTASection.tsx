export function CTASection() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_75%_50%,rgba(79,70,229,0.12),transparent_24%)]" />
      <div className="mx-auto max-w-5xl border border-white/12 bg-white/[0.035] px-6 py-14 text-center shadow-[0_30px_120px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-14 sm:py-20">
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
          데이터를 쌓는 것을 넘어, 확장되는 시스템을 만드세요.
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a className="btn-primary" href="#hero">
            지금 시작하기
          </a>
          <a className="btn-secondary" href="mailto:hello@maek.quest">
            문의하기
          </a>
        </div>
      </div>
    </section>
  );
}
