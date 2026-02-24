import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Copy, Check, Github, Linkedin, Twitter, Mail, MapPin, Clock, Send } from 'lucide-react';
import { fadeUp, staggerContainer, scaleIn } from '../lib/animations';

const EMAIL = 'arifulhaquetomal@gmail.com';

const socialLinks = [
  { icon: Github, label: 'GitHub', handle: '@arifulhaquetomal', href: 'https://github.com/arifulhaquetomal', color: 'hover:border-slate-400/40 hover:text-slate-200' },
  { icon: Linkedin, label: 'LinkedIn', handle: 'Ariful Haque Tomal', href: 'https://linkedin.com/in/arifulhaquetomal', color: 'hover:border-blue-500/40 hover:text-blue-400' },
  { icon: Twitter, label: 'Twitter', handle: '@arifulhaquetomal', href: 'https://twitter.com/arifulhaquetomal', color: 'hover:border-sky-500/40 hover:text-sky-400' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: EMAIL },
  { icon: MapPin, label: 'Location', value: 'Bangladesh 🇧🇩' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 px-6" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-indigo-500/50" />
            <span className="text-indigo-400 text-sm uppercase tracking-widest font-medium">Get in Touch</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Let's Build Together
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-slate-500 max-w-lg">
            Have a project in mind or want to collaborate? I'm always open to interesting conversations and new opportunities.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left panel */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-4"
          >
            {/* Email copy card */}
            <motion.div
              variants={scaleIn}
              className="glass rounded-2xl p-6 border border-white/6"
            >
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Direct Contact</h3>
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/3 border border-white/8">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex-shrink-0">
                    <Mail size={16} className="text-indigo-400" />
                  </div>
                  <span className="text-slate-300 text-sm font-mono truncate">{EMAIL}</span>
                </div>
                <motion.button
                  onClick={copyEmail}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all duration-200"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
            </motion.div>

            {/* Info cards */}
            <motion.div variants={scaleIn} className="glass rounded-2xl p-6 border border-white/6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Details</h3>
              <div className="space-y-3">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/8">
                        <Icon size={13} className="text-slate-400" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-600 uppercase tracking-wider">{item.label}</div>
                        <div className="text-sm text-slate-300">{item.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={scaleIn} className="glass rounded-2xl p-6 border border-white/6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Social</h3>
              <div className="space-y-2">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 p-3 rounded-xl border border-white/6 text-slate-400 transition-all duration-200 ${link.color}`}
                    >
                      <Icon size={16} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-slate-600">{link.label}</div>
                        <div className="text-sm font-medium truncate">{link.handle}</div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right panel — contact form */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 border border-white/6"
          >
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project or idea..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all duration-200 shadow-lg shadow-indigo-500/20 text-sm"
              >
                {sent ? (
                  <>
                    <Check size={16} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
