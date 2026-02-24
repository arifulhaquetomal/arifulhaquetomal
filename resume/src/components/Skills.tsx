import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, staggerContainer, scaleIn } from '../lib/animations';

const skillCategories = [
  {
    title: 'Frontend',
    color: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/20',
    accent: 'bg-blue-500',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vue.js'],
  },
  {
    title: 'Backend',
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/20',
    accent: 'bg-emerald-500',
    skills: ['Node.js', 'Python', 'Django', 'FastAPI', 'Express', 'GraphQL'],
  },
  {
    title: 'Database',
    color: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-500/20',
    accent: 'bg-violet-500',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Prisma', 'MySQL'],
  },
  {
    title: 'DevOps & Cloud',
    color: 'from-orange-500/20 to-amber-500/20',
    border: 'border-orange-500/20',
    accent: 'bg-orange-500',
    skills: ['Docker', 'AWS', 'Vercel', 'GitHub Actions', 'Nginx', 'Linux'],
  },
  {
    title: 'AI & Automation',
    color: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-500/20',
    accent: 'bg-pink-500',
    skills: ['OpenAI API', 'LangChain', 'Hugging Face', 'Selenium', 'Puppeteer', 'n8n'],
  },
  {
    title: 'Tools & Practices',
    color: 'from-indigo-500/20 to-blue-500/20',
    border: 'border-indigo-500/20',
    accent: 'bg-indigo-500',
    skills: ['Git', 'Figma', 'REST APIs', 'Testing', 'CI/CD', 'Agile'],
  },
];

const expertiseAreas = [
  { label: 'Full-Stack Development', level: 92 },
  { label: 'API Design & Integration', level: 88 },
  { label: 'UI/UX Engineering', level: 85 },
  { label: 'AI & Automation', level: 78 },
  { label: 'DevOps & Deployment', level: 75 },
];

function SkillBar({ label, level, index }: { label: string; level: number; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-300 font-medium">{label}</span>
        <span className="text-xs text-slate-500 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
        />
      </div>
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/50" />
            <span className="text-indigo-400 text-sm uppercase tracking-widest font-medium">Expertise</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Skills &amp; Technologies
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-slate-500 max-w-lg">
            A curated collection of tools and technologies I use to bring ideas to life.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              variants={scaleIn}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`glass glass-hover rounded-2xl p-6 border ${cat.border} bg-gradient-to-br ${cat.color}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-2 h-2 rounded-full ${cat.accent}`} />
                <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/8 text-slate-300 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency bars */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.5 }}
          className="mt-8 glass rounded-2xl p-8 border border-white/6"
        >
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Core Proficiency</h3>
          <div className="space-y-5">
            {expertiseAreas.map((item, i) => (
              <SkillBar key={item.label} label={item.label} level={item.level} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
