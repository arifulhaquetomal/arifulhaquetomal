import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, User, Briefcase, Mail, FileDown, Layers } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home', icon: User },
  { id: 'skills', label: 'Skills', icon: Layers },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'stack', label: 'Stack', icon: Code2 },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function Navbar() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].id);
        if (section && section.offsetTop <= scrollPos) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 no-print"
    >
      <div
        className={`flex items-center gap-1 px-2 py-2 rounded-2xl transition-all duration-500 ${scrolled ? 'glass shadow-2xl shadow-black/40' : 'bg-transparent'
          }`}
        style={scrolled ? { border: '1px solid rgba(255,255,255,0.08)' } : {}}
      >
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo('hero')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 mr-2 ml-1"
        >
          <span className="text-indigo-400 font-bold text-sm">AT</span>
        </motion.button>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-indigo-500/20 border border-indigo-500/30 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                />
              )}
              <Icon size={14} className="relative z-10 flex-shrink-0" />
              <span className="relative z-10 hidden sm:inline">{item.label}</span>
            </button>
          );
        })}

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Download CV */}
        <motion.button
          onClick={() => window.print()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 shadow-lg shadow-indigo-500/20"
        >
          <FileDown size={14} />
          <span className="hidden sm:inline">Resume</span>
        </motion.button>
      </div>
    </motion.nav>
  );
}
