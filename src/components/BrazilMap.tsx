import { motion, useReducedMotion } from "motion/react";
import mapData from "../data/br-states.json";

type MapFile = {
  viewBox: string;
  states: Record<string, string>;
};

type MapScope = "coverage" | "regional" | "lead";

const data = mapData as MapFile;
const HUB = { x: 588.2, y: 658.2 };

const LINKS = [
  { id: "ES", x: 712, y: 568, scope: "coverage" as const },
  { id: "PR", x: 532.6, y: 701.7, scope: "both" as const },
  { id: "SC", x: 547.7, y: 752.5, scope: "both" as const },
  { id: "RS", x: 491.3, y: 811.2, scope: "both" as const },
];

const LEAD_PINS = [
  { id: "SP", x: 551, y: 623 },
  { id: "PR", x: 479, y: 681 },
  { id: "SC", x: 509, y: 742, sm: true },
  { id: "RS", x: 447, y: 804 },
  { id: "ES", x: 720, y: 568, sm: true },
];

const LIT = new Set(["SP", "PR", "SC", "RS", "ES"]);

function fill(uf: string, scope: MapScope) {
  if (scope === "lead") {
    if (uf === "SP") return "#cbe60f";
    if (LIT.has(uf)) return "#9bb80f";
    return "#0C2748";
  }
  if (uf === "SP") return "#cbe60f";
  if (uf === "PR" || uf === "SC" || uf === "RS") return "#7a9419";
  if (uf === "ES" && scope === "coverage") return "#1A4E86";
  return "#0C2748";
}

export function BrazilMap({
  active,
  scope = "coverage",
}: {
  active: boolean;
  scope?: MapScope;
}) {
  const reduce = useReducedMotion();
  const entries = Object.entries(data.states);
  const showLinks = scope !== "lead";
  const links = showLinks
    ? LINKS.filter((link) => scope === "coverage" || link.scope === "both")
    : [];

  const label =
    scope === "lead"
      ? "Mapa do Brasil com as regiões atendidas destacadas"
      : "Mapa do Brasil com conexão entre Sul e Sudeste — SP, ES, PR, SC e RS";

  return (
    <svg viewBox={data.viewBox} className="h-full w-full" role="img" aria-label={label}>
      {entries.map(([uf, d]) => (
        <motion.path
          key={uf}
          d={d}
          fill={fill(uf, scope)}
          stroke={uf === "SP" ? "#dcec8a" : "#16385F"}
          strokeWidth={uf === "SP" ? 1.6 : 0.55}
          initial={reduce || scope !== "lead" ? false : { opacity: LIT.has(uf) ? 0.35 : 1 }}
          animate={
            scope === "lead" && active && LIT.has(uf)
              ? { opacity: 1 }
              : undefined
          }
          transition={{ duration: 0.7, delay: 0.2 }}
        />
      ))}

      {links.map((link, index) => (
        <g key={link.id}>
          <line x1={HUB.x} y1={HUB.y} x2={link.x} y2={link.y} stroke="#001B3A" strokeWidth="6" strokeLinecap="round" />
          <motion.line
            x1={HUB.x}
            y1={HUB.y}
            x2={link.x}
            y2={link.y}
            stroke="#cbe60f"
            strokeWidth="2.6"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={active ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.85, delay: 0.18 + index * 0.14, ease: [0.19, 0.86, 0.31, 1] }}
          />
        </g>
      ))}

      {links.map((link) => (
        <g key={`${link.id}-dot`}>
          <circle cx={link.x} cy={link.y} r="5" fill="#cbe60f" />
          {!reduce && active && (
            <motion.circle
              cx={link.x}
              cy={link.y}
              fill="none"
              stroke="#cbe60f"
              strokeWidth="2"
              initial={{ r: 5, opacity: 0.7 }}
              animate={{ r: [5, 16], opacity: [0.55, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
            />
          )}
        </g>
      ))}

      {scope === "lead" ? (
        <>
          <g fill="#001b3a" fontFamily="Manrope, system-ui, sans-serif" fontWeight={800} textAnchor="middle">
            {LEAD_PINS.map((pin) => (
              <text key={pin.id} x={pin.x} y={pin.y} fontSize={pin.sm ? 22 : 28}>
                {pin.id}
              </text>
            ))}
          </g>
          {!reduce && active && (
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              fill="none"
              stroke="#cbe60f"
              strokeWidth="2"
              initial={{ r: 6, opacity: 0.7 }}
              animate={{ r: [6, 18], opacity: [0.55, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <circle cx={HUB.x} cy={HUB.y} r="5.5" fill="#cbe60f" />
        </>
      ) : (
        <>
          {!reduce && (
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              fill="none"
              stroke="#cbe60f"
              strokeWidth="2"
              initial={{ r: 8, opacity: 0.7 }}
              animate={{ r: [8, 24], opacity: [0.65, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <circle cx={HUB.x} cy={HUB.y} r="7" fill="#001B3A" stroke="#cbe60f" strokeWidth="2.5" />
        </>
      )}
    </svg>
  );
}
