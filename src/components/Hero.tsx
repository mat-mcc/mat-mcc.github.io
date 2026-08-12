import { motion } from 'motion/react';
import { Github, Mail, Linkedin, FileText } from 'lucide-react';
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
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-sol-green overflow-hidden shadow-xl shadow-sol-blue/10 bg-sol-base2">
              <img
                src="MattPortfolioPicture.jpg"
                alt="Matthew McCaughan"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-black font-mono text-sm tracking-widest uppercase inline-block bg-sol-green/10 px-4 py-1.5 rounded-full border border-sol-green/20"
            >
              // Software Engineer
            </motion.span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-mono font-bold tracking-tight leading-tight text-sol-green">
              Matthew <br />
              <span>McCaughan</span>
            </h1>
          </div>
        </div>

        <p className="text-xl md:text-2xl text-sol-base00 max-w-2xl font-light leading-relaxed mx-auto text-center">
          Building the future with code and curiosity.
          Specializing in <span className="text-sol-blue font-medium">backend-leaning</span> development and <span className="text-sol-cyan font-medium">AI-driven</span> tools.
        </p>

        <div className="flex flex-wrap gap-4 items-center justify-center pt-4">
          <a
            href="https://github.com/mat-mcc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sol-base2 border border-sol-base1/20 text-sol-base02 hover:border-sol-blue hover:text-sol-blue transition-all font-mono text-sm shadow-sm hover:shadow"
          >
            <Github size={18} className="text-sol-blue" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/matthewmccaughan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sol-base2 border border-sol-base1/20 text-sol-base02 hover:border-sol-violet hover:text-sol-violet transition-all font-mono text-sm shadow-sm hover:shadow"
          >
            <Linkedin size={18} className="text-sol-violet" />
            <span>LinkedIn</span>
          </a>
          <a
            href="/MatthewMcCaughanResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sol-base2 border border-sol-base1/20 text-sol-base02 hover:border-sol-magenta hover:text-sol-magenta transition-all font-mono text-sm shadow-sm hover:shadow"
          >
            <FileText size={18} className="text-sol-magenta" />
            <span>Resume</span>
          </a>
          <a
            href="mailto:matthewmccaughan1@gmail.com"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sol-base2 border border-sol-base1/20 text-sol-base02 hover:border-sol-green hover:text-sol-green transition-all font-mono text-sm shadow-sm hover:shadow"
          >
            <Mail size={18} className="text-sol-green" />
            <span>Email</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
