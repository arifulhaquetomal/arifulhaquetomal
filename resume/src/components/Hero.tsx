import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Copy, Check, Github, Linkedin, Twitter } from 'lucide-react';
import { fadeUp, staggerContainer } from '../lib/animations';
import { ParticleConstellation } from './ParticleConstellation';
import { FloatingCode } from './FloatingCode';
import { useTypewriter } from '../hooks/useTypewriter';

const EMAIL = 'arifulhaquetomal@gmail.com';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/arifulhaquetomal' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/arifulhaquetomal' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/arifulhaquetomal' },
];

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Shipped' },
];

const ROLES = [
  'Full-Stack Developer',
  'AI & Automation Builder',
  'SaaS Architect',
  'UI/UX Engineer',
];

// Per-letter entrance animation — no whileHover (too many event listeners)
function AnimatedName({ name, delay = 0 }: { name: string; delay?: number }) {
  return (
    <span className="inline-block">
      {name.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -80 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.65,
            delay: delay + i * 0.042,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: 'bottom center' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const [copied, setCopied] = useState(false);
  const { displayText, phase } = useTypewriter({ words: ROLES, typingSpeed: 70, deletingSpeed: 40, pauseDuration: 2200 });

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch { /* fallback */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* === Particle Constellation Canvas === */}
      <ParticleConstellation />

      {/* === Ambient gradient blobs — CSS animated, not JS === */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="hero-blob-1 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="hero-blob-2 absolute bottom-1/4 right-1/4 w-[440px] h-[440px] rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="hero-blob-3 absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-600/6 blur-[80px]" />
      </div>

      {/* === Grid pattern === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* === Floating Code Snippets === */}
      <FloatingCode />

      {/* === Scroll-parallax wrapper === */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Status badge */}
          

          {/* === Animated Name (per-letter 3D flip) === */}
          <div className="mb-4 leading-[0.88]" style={{ perspective: '800px' }}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter">
              <span className="text-gradient block">
                <AnimatedName name="Ariful" delay={0.1} />
              </span>
              <span className="text-white/90 block">
                <AnimatedName name="Haque Tomal" delay={0.44} />
              </span>
            </h1>
          </div>

          {/* === Typewriter role line === */}
          <motion.div
            variants={fadeUp}
            className="mt-8 mb-4 h-10 flex items-center justify-center"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-300 tracking-tight">
              <span className="text-indigo-400">&lt;</span>
              <span className="mx-2 min-w-[260px] sm:min-w-[320px] inline-block text-left">
                {displayText}
                <motion.span
                  animate={{ opacity: phase === 'pausing' ? [1, 0, 1] : 1 }}
                  transition={{ duration: 0.6, repeat: phase === 'pausing' ? Infinity : 0 }}
                  className="inline-block w-[2px] h-[1.1em] bg-indigo-400 ml-0.5 align-middle"
                />
              </span>
              <span className="text-indigo-400"> /&gt;</span>
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="max-w-xl mx-auto text-slate-500 text-base sm:text-lg leading-relaxed mb-10"
          >
            I craft elegant, high-performance digital experiences — from scalable backend systems to pixel-perfect UIs. Passionate about AI, automation, and modern SaaS architecture.
          </motion.p>

          {/* === CTA row === */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
            <motion.button
              onClick={copyEmail}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm overflow-hidden shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_32px_rgba(99,102,241,0.55)] transition-all duration-200"
            >
              {/* shimmer sweep */}
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Email Copied!' : 'Copy Email'}
            </motion.button>

            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl glass border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/40 font-medium transition-all duration-200 text-sm"
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{link.label}</span>
                </motion.a>
              );
            })}
          </motion.div>

          {/* === Stats row === */}
          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.12, duration: 0.6, ease: 'easeOut' }}
                whileHover={{ y: -3 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-gradient-subtle stat-counter group-hover:text-white transition-colors duration-200">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-600 mt-1 uppercase tracking-widest group-hover:text-slate-500 transition-colors duration-200">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* === Scroll indicator — CSS animated === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5">
          <div className="scroll-dot w-1 h-1.5 rounded-full bg-indigo-400" />
        </div>
      </motion.div>

      {/* === Bottom vignette === */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  );
}
