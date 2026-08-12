import { useState } from 'react';
import Hero from './components/Hero';
import GithubProjects from './components/GithubProjects';
import ResumeChat from './components/ResumeChat';
import Skills from './components/Skills';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

type Tab = 'projects' | 'skills';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  return (
    <main className="relative overflow-x-hidden min-h-screen flex flex-col bg-paper">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-sol-blue/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-sol-magenta/10 blur-[130px]" />
      </div>

      {/* Top Section: Hero & Chat */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10 w-full space-y-32">
        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-mono font-bold tracking-tight">
              <span className="text-sol-green">Chat with My Resume</span>
            </h2>
            <p className="text-sol-base00 text-lg font-light max-w-md leading-relaxed">
              I built this AI assistant powered by the Gemini API to help you explore my background interactively.
              Ask about my technical skills, Coursework at Rutgers, or even my favorite coding projects!
            </p>

            <div className="space-y-4 border-l-2 border-sol-cyan/40 pl-4 py-1">
              <p className="text-xs font-mono text-sol-base01 uppercase tracking-widest">How it works</p>
              <p className="text-sm text-sol-base00 leading-relaxed">
                This agent has continuous access to my GitHub projects and resume. You can ask specific questions about my
                education, stack, or project details.
              </p>
            </div>
          </div>

          <div className="w-full">
            <ResumeChat />
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 w-full mt-10">
        <div className="flex gap-8 border-b border-sol-base1/20">
          {(['projects', 'skills'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 text-sm font-mono uppercase tracking-widest transition-all relative flex items-center gap-2",
                activeTab === tab ? "text-sol-blue font-bold" : "text-sol-base01 hover:text-sol-base02"
              )}
            >
              <span className="text-sol-magenta">{activeTab === tab ? '>' : '#'}</span>
              <span>{tab}</span>
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-sol-blue"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-grow max-w-7xl mx-auto px-6 w-full py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'projects' ? <GithubProjects /> : <Skills />}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="border-t border-sol-base1/20 bg-sol-base2/30">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left: Identity */}
          <div className="space-y-4">
            <p className="font-mono font-bold text-lg text-sol-green">Matthew McCaughan</p>
            <p className="text-sol-base01 text-sm leading-relaxed font-sans">
              Software Engineer specializing in backend systems, modern web development, and AI-driven tools.
            </p>
            <p className="text-xs font-mono text-sol-base01 bg-sol-base2 border border-sol-base1/20 px-3 py-1.5 rounded-lg inline-block">
              <span className="text-sol-green">// </span>Open to opportunities
            </p>
          </div>

          {/* Right: Contact */}
          <div className="space-y-4">
            <p className="font-mono text-xs text-sol-base01 uppercase tracking-widest">// Get In Touch</p>
            <div className="flex flex-col gap-3">
              <a href="mailto:matthewmccaughan1@gmail.com" className="flex items-center gap-3 text-sm text-sol-base00 hover:text-sol-green transition-colors group">
                <span className="p-2 rounded-lg bg-sol-green/10 border border-sol-green/20 text-sol-green group-hover:bg-sol-green/20 transition-colors">
                  <Mail size={14} />
                </span>
                matthewmccaughan1@gmail.com
              </a>
              <a href="https://github.com/mat-mcc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-sol-base00 hover:text-sol-blue transition-colors group">
                <span className="p-2 rounded-lg bg-sol-blue/10 border border-sol-blue/20 text-sol-blue group-hover:bg-sol-blue/20 transition-colors">
                  <Github size={14} />
                </span>
                github.com/mat-mcc
              </a>
              <a href="https://www.linkedin.com/in/matthewmccaughan/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-sol-base00 hover:text-sol-violet transition-colors group">
                <span className="p-2 rounded-lg bg-sol-violet/10 border border-sol-violet/20 text-sol-violet group-hover:bg-sol-violet/20 transition-colors">
                  <Linkedin size={14} />
                </span>
                linkedin.com/in/matthewmccaughan
              </a>
              <a href="/MatthewMcCaughanResume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-sol-base00 hover:text-sol-magenta transition-colors group">
                <span className="p-2 rounded-lg bg-sol-magenta/10 border border-sol-magenta/20 text-sol-magenta group-hover:bg-sol-magenta/20 transition-colors">
                  <FileText size={14} />
                </span>
                View Resume
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-sol-base1/15 bg-sol-base2/50">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono text-xs text-sol-base01">
              <span className="text-sol-green">Matthew McCaughan</span> &mdash; {new Date().getFullYear()}
            </p>
            <p className="font-mono text-xs text-sol-base01">
              Built with the help of  <span className="text-sol-cyan">Google Antigravity</span> + <span className="text-sol-blue">Gemini & Github API</span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
