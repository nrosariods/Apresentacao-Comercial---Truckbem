import { CONTACT, SLIDES } from "../data/slides";
import { asset } from "../lib/asset";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Chrome({
  index,
  progress = 0,
  dark,
  onGo,
}: {
  index: number;
  progress?: number;
  dark: boolean;
  onGo: (index: number) => void;
}) {
  const total = SLIDES.length;
  const bar = ((index + progress) / total) * 100;
  const ink = dark ? "text-white" : "text-navy";
  const count = dark ? "text-green" : "text-navy";

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[3px] bg-navy/10" aria-hidden>
        <div className="h-full bg-green" style={{ width: `${bar}%` }} />
      </div>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center gap-3 px-[var(--pad-x)] pt-[clamp(12px,2vh,22px)] lg:gap-4">
        <a
          href={CONTACT.site}
          className="pointer-events-auto"
          aria-label="Abrir o site oficial da TruckBem"
        >
          <img
            src={asset(dark ? "brand/logo-white.svg" : "brand/logo-navy.svg")}
            alt="TruckBem Transportes"
            className="h-[clamp(32px,8vw,40px)] w-auto lg:h-[clamp(40px,5.2vh,64px)]"
          />
        </a>
        <span className={`hidden h-8 w-px sm:block ${dark ? "bg-white/25" : "bg-navy/20"}`} aria-hidden />
        <p
          className={`hidden font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase sm:block ${
            dark ? "text-white" : "text-navy"
          }`}
        >
          APRESENTAÇÃO COMERCIAL
        </p>
      </header>

      <nav className="fixed top-1/2 right-[8px] z-40 flex -translate-y-1/2 flex-col gap-[7px] lg:right-[14px]" aria-label="Slides">
        {SLIDES.map((slide, i) => {
          const current = i === index;
          return (
            <button
              key={slide.id}
              type="button"
              title={slide.label}
              aria-label={`${pad(i + 1)} ${slide.label}`}
              aria-current={current ? "true" : undefined}
              onClick={() => onGo(i)}
              className="group grid h-[10px] w-8 place-items-center"
            >
              <span
                className={`block h-[8px] w-[8px] rounded-full transition-colors duration-300 ${
                  current ? "bg-green" : dark ? "bg-white/35 group-hover:bg-white/70" : "bg-navy/25 group-hover:bg-navy/55"
                }`}
              />
            </button>
          );
        })}
      </nav>

      <div className={`fixed right-[var(--pad-x)] bottom-[clamp(12px,2.2vh,22px)] z-40 flex items-center gap-2 lg:gap-3 ${ink}`}>
        <p className="font-display text-[12px] font-bold tracking-[0.12em] tabular-nums lg:text-[13px]" aria-live="polite">
          <span className={count}>{pad(index + 1)}</span>
          <span className="opacity-45"> / {pad(total)}</span>
          <span className="sr-only">{SLIDES[index].label}</span>
        </p>
        <button
          type="button"
          aria-label="Slide anterior"
          disabled={index === 0}
          onClick={() => onGo(index - 1)}
          className={`grid h-8 w-8 place-items-center rounded-full border text-base disabled:opacity-30 lg:h-9 lg:w-9 ${dark ? "border-white/25" : "border-navy/20"}`}
        >
          ↑
        </button>
        <button
          type="button"
          aria-label="Próximo slide"
          disabled={index === total - 1}
          onClick={() => onGo(index + 1)}
          className={`grid h-8 w-8 place-items-center rounded-full border text-base disabled:opacity-30 lg:h-9 lg:w-9 ${dark ? "border-white/25" : "border-navy/20"}`}
        >
          ↓
        </button>
      </div>
    </>
  );
}
