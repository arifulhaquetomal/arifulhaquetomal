import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Star, GitFork, ExternalLink, Code2, Loader2, AlertCircle } from 'lucide-react';
import { fadeUp, staggerContainer, scaleIn } from '../lib/animations';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  topics: string[];
  updated_at: string;
  archived: boolean;
  fork: boolean;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  JavaScript: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Python: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Rust: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Go: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  CSS: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  HTML: 'bg-red-500/20 text-red-400 border-red-500/30',
  Java: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  Shell: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

function getLanguageClass(lang: string | null): string {
  if (!lang) return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  return LANGUAGE_COLORS[lang] ?? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
}

function getStatus(repo: Repo): { label: string; color: string } {
  if (repo.archived) return { label: 'Archived', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' };
  const updated = new Date(repo.updated_at);
  const now = new Date();
  const monthsAgo = (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (monthsAgo < 3) return { label: 'Active', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
  if (monthsAgo < 12) return { label: 'Maintained', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
  return { label: 'Stable', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
}

// Fallback projects in case API is unavailable
const FALLBACK_PROJECTS: Repo[] = [
  {
    id: 1, name: 'ai-automation-toolkit', description: 'A comprehensive toolkit for AI-powered workflow automation with LangChain and OpenAI integration.', stargazers_count: 124, forks_count: 18, language: 'Python', html_url: 'https://github.com/arifulhaquetomal', topics: ['ai', 'automation', 'python'], updated_at: new Date().toISOString(), archived: false, fork: false,
  },
  {
    id: 2, name: 'nextjs-saas-template', description: 'Production-ready Next.js 14 SaaS boilerplate with Auth, Stripe, and Prisma out of the box.', stargazers_count: 89, forks_count: 31, language: 'TypeScript', html_url: 'https://github.com/arifulhaquetomal', topics: ['nextjs', 'saas', 'typescript'], updated_at: new Date().toISOString(), archived: false, fork: false,
  },
  {
    id: 3, name: 'react-component-library', description: 'Accessible, unstyled React components built with TypeScript and Radix UI primitives.', stargazers_count: 67, forks_count: 12, language: 'TypeScript', html_url: 'https://github.com/arifulhaquetomal', topics: ['react', 'components', 'accessibility'], updated_at: new Date().toISOString(), archived: false, fork: false,
  },
  {
    id: 4, name: 'python-web-scraper', description: 'Async web scraping framework with anti-detection features, proxy rotation, and data pipelines.', stargazers_count: 45, forks_count: 9, language: 'Python', html_url: 'https://github.com/arifulhaquetomal', topics: ['python', 'scraping', 'automation'], updated_at: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(), archived: false, fork: false,
  },
  {
    id: 5, name: 'fastapi-microservice-kit', description: 'Modular FastAPI microservice architecture with JWT auth, Redis caching, and Docker deployment.', stargazers_count: 38, forks_count: 7, language: 'Python', html_url: 'https://github.com/arifulhaquetomal', topics: ['fastapi', 'microservices', 'docker'], updated_at: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(), archived: false, fork: false,
  },
  {
    id: 6, name: 'cli-dev-tools', description: 'A collection of developer CLI tools for common tasks — scaffolding, env management, and more.', stargazers_count: 22, forks_count: 4, language: 'JavaScript', html_url: 'https://github.com/arifulhaquetomal', topics: ['cli', 'tools', 'developer'], updated_at: new Date(Date.now() - 600 * 24 * 60 * 60 * 1000).toISOString(), archived: true, fork: false,
  },
];

function ProjectCard({ repo, index, inView }: { repo: Repo; index: number; inView: boolean }) {
  const status = getStatus(repo);
  const langClass = getLanguageClass(repo.language);

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      variants={scaleIn}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group glass glass-hover rounded-2xl p-6 border border-white/6 flex flex-col gap-4 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <Code2 size={16} className="text-indigo-400" />
          </div>
          <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-indigo-300 transition-colors">
            {repo.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
          </h3>
        </div>
        <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1" />
      </div>

      {/* Description */}
      <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-2">
        {repo.description ?? 'A developer tool built with care and precision.'}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
              #{topic}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-3">
          {repo.language && (
            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${langClass}`}>
              {repo.language}
            </span>
          )}
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${status.color}`}>
            {status.label}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <span className="flex items-center gap-1 text-xs">
            <Star size={12} className="text-amber-400" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <GitFork size={12} />
            {repo.forks_count}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    // Check session cache first
    const cached = sessionStorage.getItem('gh_repos');
    if (cached) {
      try {
        setRepos(JSON.parse(cached));
        setLoading(false);
        return;
      } catch { /* ignore bad cache */ }
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch('https://api.github.com/users/arifulhaquetomal/repos?per_page=100&sort=updated', {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error('Failed');
        return r.json() as Promise<Repo[]>;
      })
      .then((data) => {
        clearTimeout(timeout);
        const sorted = data
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 12);
        const result = sorted.length > 0 ? sorted : FALLBACK_PROJECTS;
        setRepos(result);
        try { sessionStorage.setItem('gh_repos', JSON.stringify(result)); } catch { /* ignore */ }
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timeout);
        setRepos(FALLBACK_PROJECTS);
        setError(true);
        setLoading(false);
      });

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <section id="projects" className="relative py-24 px-6" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-indigo-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Live Projects Section */}
        <div className="mb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-2">Live Prototypes & Demos</h3>
            <p className="text-slate-500 text-sm">Static links to live project demos and prototypes.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://sarshe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass glass-hover rounded-2xl p-6 border border-white/6 flex flex-col gap-4 cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <ExternalLink size={16} className="text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-indigo-300 transition-colors">
                    Sarshe Project
                  </h3>
                </div>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-2">
                Worked on a full stack eccomerce luxury brand. Complete backend support with integrated chatbot for customer care.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #fullstack
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #ecommerce
                </span>
              </div>
            </a>
            <a
              href="https://cryptomarketpredictions.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass glass-hover rounded-2xl p-6 border border-white/6 flex flex-col gap-4 cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <ExternalLink size={16} className="text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-indigo-300 transition-colors">
                    Crypto Predictions
                  </h3>
                </div>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-2">
                A complete crypto market predictions with AI support. It is a full stack app with sign-up and login features.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #fullstack
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #Ai
                </span>
              </div>
            </a>

            <a
              href="https://depshieldprivate.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass glass-hover rounded-2xl p-6 border border-white/6 flex flex-col gap-4 cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <ExternalLink size={16} className="text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-indigo-300 transition-colors">
                    Dependecy Scanner
                  </h3>
                </div>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-2">
                This is a github dependecy scanner. Also takes websites to check for potential security risks. Added Ai brain to solve the found vulnerabilities.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #DependencyScanner
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #Gemini-2.5-flash
                </span>
              </div>
            </a>
            <a
              href="https://content-automation-kohl.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass glass-hover rounded-2xl p-6 border border-white/6 flex flex-col gap-4 cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <ExternalLink size={16} className="text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-indigo-300 transition-colors">
                    Automate Articles
                  </h3>
                </div>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-2">
                Automate articles for your blog using generative Ai. Automatically writes and publishes articles to your blog and sends to newsletter all in the blink of an eye
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #fullstack
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #Ai
                </span>
              </div>
            </a>
            <a
              href="https://ai-contract-azure.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass glass-hover rounded-2xl p-6 border border-white/6 flex flex-col gap-4 cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <ExternalLink size={16} className="text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-indigo-300 transition-colors">
                    AI powered Contract Analyzer
                  </h3>
                </div>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-2">
                This webapp uses gemini OCR and vision handling to read contracts. Groq Api is called to then analyze the contracts and provide a comprehensive report on the contract.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #Automation
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #llama
                </span>
              </div>
            </a>
            <a
              href="https://thelawbot.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass glass-hover rounded-2xl p-6 border border-white/6 flex flex-col gap-4 cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <ExternalLink size={16} className="text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-indigo-300 transition-colors">
                    A legal Assistant
                  </h3>
                </div>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-2">
                A legal assistant specializing in the Bangladesh Laws. Helps you with information regarding complicated legal procedures.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #chatbot
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #laws
                </span>
              </div>
            </a>
            <a
              href="https://nexus-ops-4t55.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass glass-hover rounded-2xl p-6 border border-white/6 flex flex-col gap-4 cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <ExternalLink size={16} className="text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-indigo-300 transition-colors">
                    Customer Chat Support live
                  </h3>
                </div>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-2">
                this keeps track of whatsapp messages from customers and provides a live dashboard.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #NexusOps
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #Automation
                </span>
              </div>
            </a>
            <a
              href="https://nexusops-main.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass glass-hover rounded-2xl p-6 border border-white/6 flex flex-col gap-4 cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <ExternalLink size={16} className="text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-indigo-300 transition-colors">
                    NexusOps
                  </h3>
                </div>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-2">
                replaces your customer support team, social media manager, CRM specialist, and analyst — with a single intelligent infrastructure that learns, adapts, and scales with your business.                 </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #NexusOps
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-xs border border-white/5">
                  #OnestepAi
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16 pt-20 border-t border-white/5"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/50" />
            <span className="text-indigo-400 text-sm uppercase tracking-widest font-medium">Open Source</span>
          </motion.div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Featured Projects
            </motion.h2>
            <motion.a
              variants={fadeUp}
              href="https://github.com/arifulhaquetomal"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-400 transition-colors"
            >
              View all on GitHub
              <ExternalLink size={14} />
            </motion.a>
          </div>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={28} className="text-indigo-400 animate-spin" />
            <p className="text-slate-500 text-sm">Fetching repositories...</p>
          </div>
        )}

        {/* Error notice */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm"
          >
            <AlertCircle size={16} />
            Showing sample projects — GitHub API unavailable.
          </motion.div>
        )}

        {/* Project grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i} inView={inView} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
