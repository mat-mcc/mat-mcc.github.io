import { motion } from 'motion/react';
import { Code, Layout, Database, Terminal, Cpu, Globe } from 'lucide-react';

const SKILL_GROUPS = [
  {
    title: "Frontend",
    icon: <Layout size={20} />,
    skills: ["React", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Backend",
    icon: <Database size={20} />,
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Firebase"]
  },
  {
    title: "Languages",
    icon: <Code size={20} />,
    skills: ["Java", "Python", "C++", "C", "SQL"]
  },
  {
    title: "Tools",
    icon: <Terminal size={20} />,
    skills: ["Git/Github", "Pytorch", "Agentic AI", "OpenCV"]
  }
];

export default function Skills() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-5xl md:text-7xl font-serif italic text-accent">Expertise</h2>
          <p className="text-ink/60 text-lg font-light leading-relaxed">
            I've spent my time at university and on projects improving upon a multitude of technologies. 
            I love learning new tools and applying them to solve real-world problems.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-accent">
                {group.icon}
                <h3 className="text-xl font-serif font-medium text-ink">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span 
                    key={skill}
                    className="px-4 py-2 rounded-full bg-ink/5 text-sm font-medium text-ink/70 hover:bg-earth/10 hover:text-earth transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
