import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { asset } from "../../lib/asset";

const THEME = {
  bg: "#001b3a",
  particle: "rgba(203, 230, 15, 0.85)",
} as const;

export type AetherFlowHeroProps = {
  logoSrc?: string;
  title?: string;
  tagline?: string;
  description?: string;
  active?: boolean;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
};

/**
 * Hero com rede de partículas + capa institucional.
 */
export function AetherFlowHero({
  logoSrc = "brand/52-logo-truckbem-on-dark.svg",
  title = "Apresentação Comercial",
  tagline = "Sua operação logística, sob controle.",
  description = "Transporte, distribuição e gestão logística para operações que precisam de proximidade, controle e flexibilidade.",
  active = true,
  className = "",
}: AetherFlowHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let running = true;
    let particles: Particle[] = [];
    let cssW = 0;
    let cssH = 0;
    const mouse = { x: null as number | null, y: null as number | null, radius: 180 };

    const initParticles = () => {
      particles = [];
      const area = Math.max(cssW * cssH, 1);
      const count = Math.min(140, Math.max(24, Math.floor(area / 9000)));
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * Math.max(cssW - size * 2, 1) + size,
          y: Math.random() * Math.max(cssH - size * 2, 1) + size,
          directionX: Math.random() * 0.4 - 0.2,
          directionY: Math.random() * 0.4 - 0.2,
          size,
          color: THEME.particle,
        });
      }
    };

    const resizeCanvas = () => {
      const rect = root.getBoundingClientRect();
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      if (cssW < 2 || cssH < 2) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const drawParticle = (p: Particle) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
      ctx.fillStyle = p.color;
      ctx.fill();
    };

    const updateParticle = (p: Particle) => {
      if (p.x > cssW || p.x < 0) p.directionX = -p.directionX;
      if (p.y > cssH || p.y < 0) p.directionY = -p.directionY;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + p.size && distance > 0) {
          const force = (mouse.radius - distance) / mouse.radius;
          p.x -= (dx / distance) * force * 5;
          p.y -= (dy / distance) * force * 5;
        }
      }

      p.x += p.directionX;
      p.y += p.directionY;
      drawParticle(p);
    };

    const connect = () => {
      const maxDist = (cssW / 7) * (cssH / 7);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = dx * dx + dy * dy;
          if (distance >= maxDist) continue;

          const opacityValue = Math.max(0, 1 - distance / 20000);
          let nearMouse = false;
          if (mouse.x !== null && mouse.y !== null) {
            const mdx = particles[a].x - mouse.x;
            const mdy = particles[a].y - mouse.y;
            nearMouse = Math.sqrt(mdx * mdx + mdy * mdy) < mouse.radius;
          }

          ctx.strokeStyle = nearMouse
            ? `rgba(234, 241, 251, ${opacityValue * 0.55})`
            : `rgba(203, 230, 15, ${opacityValue * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    };

    const renderFrame = () => {
      ctx.fillStyle = THEME.bg;
      ctx.fillRect(0, 0, cssW, cssH);
      for (const p of particles) {
        if (reduce) drawParticle(p);
        else updateParticle(p);
      }
      connect();
    };

    const animate = () => {
      if (!running) return;
      animationFrameId = requestAnimationFrame(animate);
      renderFrame();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => resizeCanvas();

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseOut);

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => resizeCanvas()) : null;
    observer?.observe(root);

    const startId = requestAnimationFrame(() => {
      resizeCanvas();
      requestAnimationFrame(() => {
        if (!running) return;
        resizeCanvas();
        if (reduce) renderFrame();
        else animate();
      });
    });

    return () => {
      running = false;
      cancelAnimationFrame(startId);
      cancelAnimationFrame(animationFrameId);
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseOut);
      particles = [];
    };
  }, [active, reduce]);

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduce ? 0 : 0.1 + i * 0.12,
        duration: reduce ? 0.01 : 0.7,
        ease: [0.19, 0.86, 0.31, 1],
      },
    }),
  };

  const show = active ? "visible" : "hidden";

  return (
    <div
      ref={rootRef}
      className={`relative flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden bg-navy text-white ${className}`.trim()}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,27,58,0.08)_0%,rgba(0,27,58,0.5)_58%,#001229_100%)]" />

      <div className="relative z-10 flex flex-col items-center px-[var(--pad-x)] py-12 text-center">
        <motion.img
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate={show}
          src={asset(logoSrc)}
          alt="TruckBem Transportes"
          className="mx-auto mb-[clamp(2.75rem,5.5vh,4.25rem)] h-[clamp(102px,16vh,192px)] w-auto max-w-[min(78vw,512px)] object-contain"
        />

        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate={show}
          className="max-w-[14ch] font-display text-[clamp(1.85rem,8.4vw,3.2rem)] leading-[1.06] font-extrabold tracking-tighter text-white lg:max-w-none lg:text-[clamp(2.35rem,5.6vw,5.1rem)] lg:leading-[1.02]"
        >
          {title}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate={show}
          className="mt-5 max-w-[18ch] font-display text-[clamp(1.05rem,5.4vw,1.45rem)] leading-snug font-bold tracking-[-0.02em] text-green max-lg:px-1 lg:mt-7 lg:max-w-none lg:whitespace-nowrap lg:text-[clamp(1.2rem,2.5vw,2.25rem)] lg:leading-none"
        >
          {tagline}
        </motion.p>

        <motion.p
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate={show}
          className="mx-auto mt-8 max-w-[38rem] font-sans text-[clamp(0.95rem,1.15vw,1.12rem)] leading-relaxed text-on-dark/80"
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

export default AetherFlowHero;
