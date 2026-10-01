import { Reveal } from "../lib/motion";
import { BlurTitle } from "./ui/BlurTitle";

export function Head({
  kicker,
  title,
  accent,
  lede,
  tone,
  align = "left",
  active = true,
}: {
  kicker: string;
  title: string;
  accent?: string;
  lede?: string;
  tone: "dark" | "light";
  align?: "left" | "center";
  active?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "flex flex-col items-center text-center" : undefined}>
      <Reveal active={active} i={0}>
        <p className={`kicker ${align === "center" ? "justify-center" : ""} ${dark ? "text-on-dark" : "text-muted"}`}>
          {kicker}
        </p>
      </Reveal>
      <div className="mt-3">
        <BlurTitle
          className={`h-slide ${dark ? "text-white" : "text-navy"}`}
          active={active}
          text={accent ? `${title} ${accent}` : title}
        />
      </div>
      {lede && (
        <Reveal active={active} i={2} className="mt-4">
          <p className={`lede ${align === "center" ? "mx-auto" : ""} ${dark ? "text-on-dark" : "text-muted"}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
