import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 selection:bg-indigo-500/30">
      <Navbar />
      <main>
        <Hero />

        {/* Section divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />

        <Skills />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />

        <Projects />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />

        <TechStack />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
