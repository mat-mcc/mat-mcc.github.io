import { motion } from 'motion/react';
import { Github, Mail, Linkedin } from 'lucide-react';
import profilePic from '../../MattPortfolioPicture.jpg';

export default function Hero() {
  return (
    <section className="flex flex-col justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <div className="flex flex-col items-center text-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative shrink-0"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-accent p-2">
              <div className="w-full h-full rounded-full overflow-hidden bg-ink/5">
                <img 
                  src="MattPortfolioPicture.jpg"
                  alt="Matthew McCaughan" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-earth font-mono text-sm tracking-widest uppercase"
            >
              Computer Science Graduate
            </motion.span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif leading-tight text-accent">
              Matthew <br />
              <span>McCaughan</span>
            </h1>
          </div>
        </div>

        <p className="text-xl md:text-2xl text-ink/60 max-w-2xl font-light leading-relaxed mx-auto">
          Building the future of the web with code and curiosity. 
          Specializing in full-stack development and AI-driven applications.
        </p>

        <div className="flex flex-wrap gap-6 items-center justify-center">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink hover:text-earth transition-colors"
          >
            <Github size={24} />
            <span className="font-medium">GitHub</span>
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink hover:text-earth transition-colors"
          >
            <Linkedin size={24} />
            <span className="font-medium">LinkedIn</span>
          </a>
          <a 
            href="mailto:matthewmccaughan1@gmail.com"
            className="flex items-center gap-2 text-ink hover:text-earth transition-colors"
          >
            <Mail size={24} />
            <span className="font-medium">Email</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
