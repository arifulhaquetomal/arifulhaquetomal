import { motion } from 'framer-motion';

const snippets = [
  {
    lines: [
      { text: 'const', color: 'text-violet-400' },
      { text: ' dev', color: 'text-blue-300' },
      { text: ' = {', color: 'text-slate-400' },
    ],
    extra: ['  passion: true,', '  coffee: Infinity,', '};'],
    pos: 'top-[14%] left-[4%]',
    delay: 0,
    floatClass: 'float-a',
  },
  {
    lines: [
      { text: 'await', color: 'text-violet-400' },
      { text: ' build(', color: 'text-slate-300' },
      { text: 'future', color: 'text-emerald-400' },
      { text: ')', color: 'text-slate-300' },
    ],
    extra: [],
    pos: 'top-[12%] right-[4%]',
    delay: 0.8,
    floatClass: 'float-b',
  },
  {
    lines: [
      { text: 'git', color: 'text-orange-400' },
      { text: ' commit', color: 'text-slate-300' },
      { text: ' -m', color: 'text-slate-500' },
    ],
    extra: ['"ship it 🚀"'],
    pos: 'bottom-[22%] left-[3%]',
    delay: 1.2,
    floatClass: 'float-c',
  },
  {
    lines: [
      { text: 'type', color: 'text-violet-400' },
      { text: ' Dev', color: 'text-yellow-300' },
      { text: ' = {', color: 'text-slate-400' },
    ],
    extra: ['  skills: string[],', '  ideas: Infinity,', '}'],
    pos: 'bottom-[20%] right-[3%]',
    delay: 0.4,
    floatClass: 'float-d',
  },
];

export function FloatingCode() {
  return (
    <>
      {snippets.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute ${s.pos} hidden lg:block pointer-events-none select-none`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: s.delay + 1.2, duration: 0.8, ease: 'easeOut' }}
        >
          {/* CSS float animation — no ongoing JS cost */}
          <div className={s.floatClass}>
            <div
              className="px-4 py-3 rounded-xl font-mono text-xs leading-relaxed"
              style={{
                background: 'rgba(15,15,30,0.7)',
                border: '1px solid rgba(99,102,241,0.15)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
              }}
            >
              {/* Top dots */}
              <div className="flex gap-1.5 mb-2.5 opacity-50">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
              </div>
              {/* Main line */}
              <div className="flex gap-1 flex-wrap">
                {s.lines.map((l, j) => (
                  <span key={j} className={l.color}>{l.text}</span>
                ))}
              </div>
              {/* Extra lines */}
              {s.extra.map((line, j) => (
                <div key={j} className="text-slate-500 mt-0.5">{line}</div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
