import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export type NeuralBackgroundProps = {
  className?: string;
  color?: string;
  trailOpacity?: number;
  particleCount?: number;
  speed?: number;
  /** Cor de fundo / trail (navy institucional por padrão). */
  background?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  update: () => void;
  reset: () => void;
  draw: (context: CanvasRenderingContext2D) => void;
};

/**
 * Flow Field / Neural Background — partículas fluidas reativas ao mouse.
 */
export default function NeuralBackground({
  className,
  color = "#cbe60f",
  trailOpacity = 0.12,
  particleCount = 420,
  speed = 1,
  background = "#001b3a",
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let particles: Particle[] = [];
    let animationFrameId = 0;
    let running = true;
    const mouse = { x: -1000, y: -1000 };

    const createParticle = (): Particle => {
      const p: Particle = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        age: 0,
        life: 100,
        reset() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = 0;
          this.vy = 0;
          this.age = 0;
          this.life = Math.random() * 200 + 100;
        },
        update() {
          const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
          this.vx += Math.cos(angle) * 0.2 * speed;
          this.vy += Math.sin(angle) * 0.2 * speed;

          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = 150;

          if (distance < interactionRadius && distance > 0) {
            const force = (interactionRadius - distance) / interactionRadius;
            this.vx -= dx * force * 0.05;
            this.vy -= dy * force * 0.05;
          }

          this.x += this.vx;
          this.y += this.vy;
          this.vx *= 0.95;
          this.vy *= 0.95;

          this.age++;
          if (this.age > this.life) this.reset();

          if (this.x < 0) this.x = width;
          if (this.x > width) this.x = 0;
          if (this.y < 0) this.y = height;
          if (this.y > height) this.y = 0;
        },
        draw(context: CanvasRenderingContext2D) {
          const alpha = 1 - Math.abs(this.age / this.life - 0.5) * 2;
          context.fillStyle = color;
          context.globalAlpha = Math.max(0, alpha);
          context.fillRect(this.x, this.y, 1.5, 1.5);
        },
      };
      p.reset();
      return p;
    };

    const init = () => {
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // base sólida antes do trail
      ctx.globalAlpha = 1;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      particles = [];
      const count = Math.min(particleCount, Math.floor((width * height) / 2800) || particleCount);
      for (let i = 0; i < count; i++) particles.push(createParticle());
    };

    const animate = () => {
      if (!running) return;
      // trail navy (não preto) — performance + identidade
      const r = 0;
      const g = 27;
      const b = 58;
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.update();
        p.draw(ctx);
      }
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => init();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    init();
    animate();

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => init()) : null;
    ro?.observe(container);

    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      ro?.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, trailOpacity, particleCount, speed, background]);

  return (
    <div ref={containerRef} className={cn("relative h-full w-full overflow-hidden bg-navy", className)}>
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
    </div>
  );
}
