import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 py-8 px-6 no-print">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
            <span className="text-indigo-400 font-bold text-xs">AT</span>
          </div>
          <p className="text-slate-600 text-xs">
            © {year} Ariful Haque Tomal — Built with React &amp; ❤️
          </p>
        </div>

        <div className="flex items-center gap-4">
          <motion.a
            href="https://github.com/arifulhaquetomal"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -1 }}
            className="text-slate-600 hover:text-slate-300 transition-colors"
          >
            <Github size={16} />
          </motion.a>
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <span className="text-slate-700 text-xs font-mono">v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
