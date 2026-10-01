import type { ReactNode } from "react";

export function Stage({
  tone,
  children,
  bleed = false,
}: {
  tone: "dark" | "light";
  children: ReactNode;
  bleed?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <section className={`relative h-full w-full overflow-hidden ${dark ? "stage-dark text-white" : "stage-light text-ink"}`}>
      <div className={`grain ${dark ? "" : "grain-light"}`} aria-hidden />
      <div
        className={
          bleed
            ? "relative z-10 h-full min-h-0"
            : "relative z-10 flex h-full min-h-0 flex-col px-[var(--pad-x)] pt-[var(--pad-top)] pr-[calc(var(--pad-x)+1.6rem)] pb-[var(--pad-bot)]"
        }
      >
        {children}
      </div>
    </section>
  );
}
