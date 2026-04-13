import { useState } from 'react';
import Hero from './components/Hero';
import GithubProjects from './components/GithubProjects';
import ResumeChat from './components/ResumeChat';
import Skills from './components/Skills';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

type Tab = 'projects' | 'skills';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  return (
    <main className="relative overflow-x-hidden min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-earth/5 blur-[120px]" />
      </div>

      {/* Top Section: Hero & Chat */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10 w-full space-y-32">
        <Hero />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-earth/10 text-earth text-xs font-mono uppercase tracking-widest border border-earth/20">
              <span>AI Agent</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif">
              <span className="text-accent">Chat with My Resume</span>
            </h2>
            <p className="text-ink/60 text-lg font-light max-w-md leading-relaxed">
              I built this AI assistant using the Gemini API to help you explore my background more interactively. 
              Ask it about my technical skills, educational experience, or even my favorite coding projects!
            </p>
            
            <div className="space-y-4">
              <p className="text-xs font-mono text-ink/30 uppercase tracking-widest">How it works</p>
              <p className="text-sm text-ink/60 leading-relaxed">
                This agent has access to my GitHub projects and resume. You can ask specific questions about my 
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
        <div className="flex gap-8 border-b border-ink/10">
          {(['projects', 'skills'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 text-sm font-mono uppercase tracking-widest transition-all relative",
                activeTab === tab ? "text-accent" : "text-ink/40 hover:text-ink/60"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
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

      <footer className="py-20 px-6 border-t border-ink/5 text-center">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="text-3xl font-serif italic">Thank You!</h2>
          <p className="text-ink/40 font-mono text-xs uppercase tracking-[0.2em]">
            <span className="text-accent">Matthew McCaughan</span> • Built with Gemini & React
          </p>
        </div>
      </footer>
    </main>
  );
}
