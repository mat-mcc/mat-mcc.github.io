import { motion } from 'motion/react';
import { Code, Layout, Database, Wrench, Cpu, Globe } from 'lucide-react';

const SKILL_GROUPS = [
  {
    title: "Frontend & Web",
    icon: <Layout size={20} />,
    color: "text-sol-blue bg-sol-blue/10 border-sol-blue/30",
    badgeColor: "bg-sol-base2 text-sol-base02 border-sol-base1/20 hover:border-sol-blue hover:text-sol-blue hover:bg-sol-blue/10",
    skills: ["React", "TypeScript", "Vite", "Tailwind CSS"]
  },
  {
    title: "Backend",
    icon: <Database size={20} />,
    color: "text-sol-green bg-sol-green/10 border-sol-green/30",
    badgeColor: "bg-sol-base2 text-sol-base02 border-sol-base1/20 hover:border-sol-green hover:text-sol-green hover:bg-sol-green/10",
    skills: ["Spring Boot", "JDBC API", "MySQL", "REST API", "Node.js", "Docker", "Maven"]
  },
  {
    title: "Languages",
    icon: <Code size={20} />,
    color: "text-sol-magenta bg-sol-magenta/10 border-sol-magenta/30",
    badgeColor: "bg-sol-base2 text-sol-base02 border-sol-base1/20 hover:border-sol-magenta hover:text-sol-magenta hover:bg-sol-magenta/10",
    skills: ["Java", "Python", "C++", "SQL"]
  },
  {
    title: "Tools",
    icon: <Wrench size={20} />,
    color: "text-sol-orange bg-sol-orange/10 border-sol-orange/30",
    badgeColor: "bg-sol-base2 text-sol-base02 border-sol-base1/20 hover:border-sol-orange hover:text-sol-orange hover:bg-sol-orange/10",
    skills: ["PyTorch", "Scikit-learn", "OpenCV", "RAG", "Google Antigravity", "Claude Code", " CI/CD with GitHub Actions", "Git & GitHub"]
  }
];

export default function Skills() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-4xl md:text-6xl font-mono font-bold tracking-tight text-sol-green">Expertise</h2>
          <p className="text-sol-base00 text-lg font-light leading-relaxed">
            Through my computer science degree at Rutgers and hands-on projects,
            I’ve cultivated expertise across full-stack development, database architecture, and AI tooling.
            I enjoy taking on complex problems and building practical software with new tools.
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
              className="space-y-6 bg-sol-base2/40 p-6 rounded-2xl border border-sol-base1/20"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${group.color}`}>
                  {group.icon}
                </div>
                <h3 className="text-xl font-mono font-medium text-sol-base02">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-default shadow-xs ${group.badgeColor}`}
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
