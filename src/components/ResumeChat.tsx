import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import Markdown from 'react-markdown';
import { chatWithResume } from '../services/gemini';
import { fetchGithubRepos } from '../services/github';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function ResumeChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hi, I'm MattBot — Matthew's AI assistant! Ask me anything about his education, skills, or projects!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [githubContext, setGithubContext] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchGithubRepos('mat-mcc').then(repos => {
      const context = repos.map(r =>
        `Repo: ${r.name}\nDescription: ${r.description}\nLanguage: ${r.language}\nURL: ${r.html_url}\nLast Updated: ${r.updated_at}`
      ).join('\n\n');
      setGithubContext(context);
    });
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await chatWithResume(userMessage, history, githubContext);

    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
  };

  return (
    <div className="relative flex flex-col bg-sol-base3 rounded-3xl border border-sol-base1/30 overflow-hidden shadow-2xl h-[600px]">
      {/* IDE Window Titlebar */}
      <div className="px-6 py-4 border-b border-sol-base1/20 flex items-center justify-between bg-sol-base2/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-sol-red inline-block" />
            <span className="w-3 h-3 rounded-full bg-sol-yellow inline-block" />
            <span className="w-3 h-3 rounded-full bg-sol-green inline-block" />
          </div>
          <div className="w-8 h-8 rounded-full bg-sol-blue flex items-center justify-center">
            <Bot size={16} className="text-sol-base3" />
          </div>
          <div>
            <p className="font-mono font-medium text-xs text-sol-base02 flex items-center gap-1">
              matt-bot.ts <span className="text-sol-cyan text-[10px]">// v2.0</span>
            </p>
            <p className="text-[10px] text-sol-green font-mono uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sol-green animate-pulse inline-block" /> Ready
            </p>
          </div>
        </div>
        <button
          onClick={() => setMessages([{ role: 'model', content: "Hi, I'm MattBot — Matthew's AI assistant! Ask me anything about his education, skills, or projects!" }])}
          className="p-2 hover:bg-sol-base1/20 rounded-lg transition-colors text-sol-base01 hover:text-sol-base02"
          title="Reset chat"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth bg-sol-base3">
        {messages.length === 1 && (
          <div className="space-y-4 pt-2">
            <p className="text-[10px] font-mono text-sol-base01 uppercase tracking-widest">// Suggested Queries</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "What's your favorite tech stack?", color: "border-sol-blue/40 text-sol-blue hover:bg-sol-blue/10" },
                { label: "Tell me about your projects.", color: "border-sol-green/40 text-sol-green hover:bg-sol-green/10" },
                { label: "What are your core strengths?", color: "border-sol-magenta/40 text-sol-magenta hover:bg-sol-magenta/10" },
                { label: "Tell me about your education at Rutgers.", color: "border-sol-yellow/40 text-sol-yellow hover:bg-sol-yellow/10" }
              ].map(q => (
                <button
                  key={q.label}
                  onClick={() => setInput(q.label)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl border text-xs font-mono transition-all bg-sol-base2/50",
                    q.color
                  )}
                >
                  "{q.label}"
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-sol-violet/20 text-sol-violet border border-sol-violet/30' : 'bg-sol-blue/20 text-sol-blue border border-sol-blue/30'
              }`}>
              {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
              ? 'bg-sol-blue text-sol-base3 rounded-tr-none shadow-md'
              : 'bg-sol-base2 border border-sol-base1/20 text-sol-base02 rounded-tl-none shadow-sm'
              }`}>
              <div className={cn(
                "markdown-body",
                m.role === 'user' 
                  ? "!text-sol-base3 prose-p:!text-sol-base3 prose-headings:!text-sol-base3 prose-strong:!text-sol-base3 prose-code:!text-sol-yellow prose-code:!bg-sol-base02/40 prose-a:!text-sol-cyan" 
                  : "text-sol-base02"
              )}>
                <Markdown>{m.content}</Markdown>
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-sol-blue/20 text-sol-blue border border-sol-blue/30 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-sol-base2 border border-sol-base1/20 p-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
              <span className="w-2 h-2 bg-sol-blue rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-sol-cyan rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-sol-green rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-sol-base1/20 bg-sol-base2/60">
        <div className="relative flex items-center">
          <span className="absolute left-4 font-mono text-sol-blue text-sm font-bold">&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="w-full bg-sol-base3 border border-sol-base1/30 rounded-xl py-3 pl-9 pr-12 text-sm font-mono text-sol-base02 placeholder:text-sol-base01 focus:outline-none focus:border-sol-blue transition-colors shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-2 text-sol-blue hover:bg-sol-blue/10 rounded-lg transition-all disabled:opacity-30"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}