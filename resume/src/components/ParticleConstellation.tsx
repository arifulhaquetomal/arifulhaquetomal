import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseOffset: number;
  pulseSpeed: number;
}

const MAX_DIST = 130;
const MOUSE_REPEL_RADIUS = 110;
const MOUSE_REPEL_FORCE = 0.5;
const PARTICLE_COUNT_DESKTOP = 60;
const PARTICLE_COUNT_MOBILE = 28;

export function ParticleConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const init = () => {
      particlesRef.current = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.4 + 0.6,
        alpha: Math.random() * 0.45 + 0.2,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.012 + 0.006,
      }));
    };

    const tick = (t: number) => {
      animRef.current = requestAnimationFrame(tick);
      frameRef.current++;
      // skip every other frame on mobile for smoother 30fps feel
      if (isMobile && frameRef.current % 2 !== 0) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;
      const ts = t * 0.001;

      // --- Update positions ---
      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= 0.984;
        p.vy *= 0.984;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.4) {
          p.vx = (p.vx / speed) * 1.4;
          p.vy = (p.vy / speed) * 1.4;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;
      }

      // --- Draw connections (flat color, no gradient) ---
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < MAX_DIST * MAX_DIST) {
            const dist = Math.sqrt(dist2);
            const alpha = (1 - dist / MAX_DIST) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(120,100,240,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // --- Mouse cursor glow (single cheap radial on mouse only) ---
      if (mx > 0 && mx < w) {
        const ring = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_REPEL_RADIUS);
        ring.addColorStop(0, 'rgba(99,102,241,0.1)');
        ring.addColorStop(1, 'rgba(99,102,241,0)');
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_REPEL_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = ring;
        ctx.fill();

        // Mouse attraction lines
        for (const p of particles) {
          const ddx = p.x - mx;
          const ddy = p.y - my;
          const d2 = ddx * ddx + ddy * ddy;
          const thresh = MOUSE_REPEL_RADIUS * 1.8;
          if (d2 < thresh * thresh) {
            const d = Math.sqrt(d2);
            const a = (1 - d / thresh) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(165,180,252,${a})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // --- Draw particles (flat dot + subtle glow, no createRadialGradient per particle) ---
      for (const p of particles) {
        const pulse = Math.sin(ts * p.pulseSpeed * 60 + p.pulseOffset) * 0.25 + 0.75;
        const alpha = p.alpha * pulse;
        const r = p.radius;

        // Outer soft glow via a single cheap shadow trick
        ctx.shadowColor = `rgba(130,130,255,${alpha * 0.5})`;
        ctx.shadowBlur = r * 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199,210,254,${alpha})`;
        ctx.fill();
      }
      // Reset shadow so it doesn't affect connections on next frame
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('resize', resize, { passive: true });
    canvas.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', onMouseLeave, { passive: true });

    resize();
    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.85, willChange: 'transform' }}
    />
  );
}
