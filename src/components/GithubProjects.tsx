import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Github, Star, ExternalLink } from 'lucide-react';
import { fetchGithubRepos, GithubRepo } from '../services/github';

export default function GithubProjects() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGithubRepos('mat-mcc').then(data => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl text-sol-green font-mono font-bold tracking-tight">Selected Projects</h2>
          <p className="text-sol-base00 max-w-md">
            A collection of my recent work, fetched directly from GitHub.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sol-green bg-sol-green/10 px-3 py-1.5 rounded-full border border-sol-green/30 font-mono text-xs uppercase tracking-widest">
          <Github size={14} />
          <span>Live from API</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-sol-base2/80 animate-pulse rounded-2xl border border-sol-base1/20" />
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
              className="group relative h-full flex flex-col p-8 rounded-2xl bg-sol-base2/50 border border-sol-base1/20 hover:border-sol-blue/60 hover:bg-sol-base2 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex justify-end items-start mb-6">
                <ExternalLink size={18} className="text-sol-base01 group-hover:text-sol-blue transition-colors" />
              </div>

              <h3 className="text-xl font-mono font-medium text-sol-base02 mb-3 group-hover:text-sol-blue transition-colors flex items-center gap-1">
                <span className="text-sol-cyan text-sm">//</span> {repo.name.replace(/-/g, ' ')}
              </h3>

              <p className="text-sol-base00 text-sm font-light mb-8 flex-grow line-clamp-3 leading-relaxed">
                {repo.description || "No description provided."}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-sol-base1/15">
                <span className="text-xs font-mono text-sol-green bg-white/10 px-2.5 py-1 rounded border border-sol-green/20">
                  {repo.language || "Multiple Languages"}
                </span>
                <span className="text-xs font-mono text-sol-cyan group-hover:underline">
                  view_source() &rarr;
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}
