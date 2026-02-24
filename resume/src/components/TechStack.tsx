import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { fadeUp, staggerContainer } from '../lib/animations';

const technologies = [
  { name: 'React', emoji: '⚛️', color: 'text-cyan-400' },
  { name: 'Next.js', emoji: '▲', color: 'text-white' },
  { name: 'TypeScript', emoji: '𝗧𝗦', color: 'text-blue-400' },
  { name: 'Python', emoji: '🐍', color: 'text-emerald-400' },
  { name: 'FastAPI', emoji: '⚡', color: 'text-teal-400' },
  { name: 'Node.js', emoji: '🟢', color: 'text-green-400' },
  { name: 'PostgreSQL', emoji: '🐘', color: 'text-blue-500' },
  { name: 'MongoDB', emoji: '🍃', color: 'text-emerald-500' },
  { name: 'Redis', emoji: '📦', color: 'text-red-400' },
  { name: 'Docker', emoji: '🐳', color: 'text-blue-400' },
  { name: 'AWS', emoji: '☁️', color: 'text-orange-400' },
  { name: 'Tailwind', emoji: '🌊', color: 'text-cyan-400' },
  { name: 'Prisma', emoji: '◈', color: 'text-indigo-400' },
  { name: 'GraphQL', emoji: '◈', color: 'text-pink-400' },
  { name: 'Git', emoji: '🔀', color: 'text-orange-500' },
  { name: 'Linux', emoji: '🐧', color: 'text-slate-300' },
  { name: 'Vercel', emoji: '▲', color: 'text-white' },
  { name: 'Supabase', emoji: '⚡', color: 'text-emerald-400' },
  { name: 'OpenAI', emoji: '🤖', color: 'text-indigo-400' },
  { name: 'LangChain', emoji: '🔗', color: 'text-amber-400' },
];

// Doubled for seamless loop
const marqueeItems = [...technologies, ...technologies];

const devPhilosophy = [
  { title: 'Performance First', desc: 'Every millisecond matters. I optimize for speed from the architecture level down.', icon: '⚡' },
  { title: 'Clean Code', desc: 'Readable, maintainable, and well-documented code is a feature, not a luxury.', icon: '✦' },
  { title: 'User-Centric', desc: "If the user has to think about it, I haven't done my job right.", icon: '◎' },
  { title: 'Continuous Learning', desc: 'The best developers are perpetually curious students of their craft.', icon: '∞' },
];

export function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stack" className="relative py-24 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[400px] h-[400px] bg-violet-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/50" />
            <span className="text-indigo-400 text-sm uppercase tracking-widest font-medium">Tools</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Tech Stack
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-slate-500 max-w-lg">
            Technologies and tools I use daily to build scalable, production-ready software.
          </motion.p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative py-6 mb-6">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div className="marquee-track">
            {marqueeItems.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 glass rounded-xl border border-white/6 min-w-max"
              >
                <span className="text-base leading-none">{tech.emoji}</span>
                <span className={`text-sm font-medium ${tech.color}`}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second marquee reverse */}
      <div className="relative py-6 mb-16">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div className="marquee-track" style={{ animationDirection: 'reverse', animationDuration: '20s' }}>
            {[...marqueeItems].reverse().map((tech, i) => (
              <div
                key={`${tech.name}-rev-${i}`}
                className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 glass rounded-xl border border-white/6 min-w-max"
              >
                <span className="text-base leading-none">{tech.emoji}</span>
                <span className={`text-sm font-medium ${tech.color}`}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dev philosophy grid */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {devPhilosophy.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass glass-hover rounded-2xl p-6 border border-white/6"
            >
              <div className="text-2xl mb-4">{item.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
