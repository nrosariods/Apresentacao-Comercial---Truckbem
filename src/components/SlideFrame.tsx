import type { ReactNode } from "react";

export function SlideFrame({
  tone,
  label,
  children,
  deck,
}: {
  tone: "dark" | "light";
  label: string;
  children: ReactNode;
  deck: boolean;
}) {
  const dark = tone === "dark";
  return (
    <section
      aria-label={label}
      className={`relative w-full overflow-hidden ${deck ? "h-dvh" : "min-h-dvh"} ${dark ? "bg-navy text-white" : "bg-mist text-ink"}`}
    >
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1680px] flex-col px-[clamp(1.15rem,3.2vw,4.2rem)] pt-[clamp(3.4rem,6.2vh,4.6rem)] pb-[clamp(0.9rem,2.2vh,1.7rem)]">
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className="mb-[0.45rem] flex items-center gap-2.5 font-display text-[0.72rem] font-bold tracking-[0.22em] uppercase">
      <span className="h-px w-7 bg-green" aria-hidden />
      <span className={dark ? "text-green" : "text-navy"}>{children}</span>
    </p>
  );
}

export function Title({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <h2
      className={`max-w-[18ch] font-display text-[clamp(1.85rem,3.05vw,3.15rem)] leading-[0.96] font-extrabold tracking-tight text-balance ${dark ? "text-white" : "text-navy"}`}
    >
      {children}
    </h2>
  );
}
