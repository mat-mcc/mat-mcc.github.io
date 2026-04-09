import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Github, Star, ExternalLink, Code2 } from 'lucide-react';
import { fetchGithubRepos, GithubRepo } from '../services/github';

export default function GithubProjects() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace 'matthewmccaughan' with your actual github username
    fetchGithubRepos('mat-mcc').then(data => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl italic">Selected Projects</h2>
          <p className="text-ink/60 max-w-md">
            A collection of my recent work, fetched directly from GitHub.
          </p>
        </div>
        <div className="flex items-center gap-2 text-earth/60 font-mono text-sm uppercase tracking-widest">
          <Github size={16} />
          <span>Live from API</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-ink/5 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-full flex flex-col p-8 rounded-2xl border border-ink/10 hover:border-earth/50 hover:bg-earth/[0.02] transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-ink/5 group-hover:bg-earth/10 transition-colors">
                  <Code2 className="text-ink/60 group-hover:text-earth transition-colors" size={20} />
                </div>
                <ExternalLink size={18} className="text-ink/20 group-hover:text-earth transition-colors" />
              </div>

              <h3 className="text-2xl font-serif mb-3 group-hover:text-earth transition-colors">
                {repo.name.replace(/-/g, ' ')}
              </h3>
              
              <p className="text-ink/60 text-sm font-light mb-8 flex-grow line-clamp-3">
                {repo.description || "No description provided."}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-ink/5">
                <span className="text-xs font-mono text-ink/40 uppercase tracking-wider">
                  {repo.language || "TypeScript"}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}
