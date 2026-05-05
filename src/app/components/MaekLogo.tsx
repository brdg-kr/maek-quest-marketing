type MaekLogoProps = {
  href?: string;
  ariaLabel?: string;
  onDark?: boolean;
};

export function MaekLogo({ href = "/", ariaLabel = "MAEK home", onDark = false }: MaekLogoProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center ${onDark ? "rounded-[3px] bg-white/95 px-2.5 py-1 shadow-[0_10px_32px_rgba(0,0,0,0.2)]" : ""}`}
      aria-label={ariaLabel}
    >
      <img src="/maek-logo.svg" alt="MAEK" className="h-7 w-auto" />
    </a>
  );
}
