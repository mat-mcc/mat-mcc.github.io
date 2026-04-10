import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import Markdown from 'react-markdown';
import { chatWithResume } from '../services/gemini';
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
        `Repo: ${r.name}\nDescription: ${r.description}\nLanguage: ${r.language}\nURL: ${r.html_url}`
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
    <div className="relative flex flex-col bg-[#fdfbf7] rounded-3xl border border-ink/10 overflow-hidden shadow-xl h-[600px]">
      <div className="p-6 border-b border-ink/10 flex items-center justify-between bg-ink/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <Bot size={20} className="text-paper" />
          </div>
          <div>
            <p className="font-medium text-sm text-ink">MattBot</p>
            <p className="text-[10px] text-accent font-mono uppercase tracking-widest">Online</p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'model', content: "Hi, I'm MattBot — Matthew's AI assistant! Ask me anything about his education, skills, or projects!" }])}
          className="p-2 hover:bg-ink/5 rounded-lg transition-colors text-ink/40"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.length === 1 && (
          <div className="space-y-4 pt-4">
            <p className="text-[10px] font-mono text-ink/30 uppercase tracking-widest">Suggested Questions</p>
            <div className="flex flex-wrap gap-2">
              {[
                "What's your favorite tech stack?",
                "Tell me about your projects",
                "What are your core strengths?",
                "Tell me about your education at Rutgers"
              ].map(q => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="px-3 py-1.5 rounded-full border border-ink/10 text-xs text-ink/60 hover:border-earth hover:text-earth transition-all bg-white/50"
                >
                  {q}
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
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              m.role === 'user' ? 'bg-ink/10' : 'bg-accent/20 text-accent'
            }`}>
              {m.role === 'user' ? <User size={16} className="text-ink/60" /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-accent text-white rounded-tr-none' 
                : 'bg-ink/5 text-ink rounded-tl-none'
            }`}>
              <div className={cn(
                "markdown-body",
                m.role === 'user' ? "prose-invert text-white" : "text-ink"
              )}>
                <Markdown>{m.content}</Markdown>
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-ink/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-ink/10 bg-ink/5">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me something..."
            className="w-full bg-white border border-ink/10 rounded-xl py-3 pl-4 pr-12 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent hover:bg-accent/10 rounded-lg transition-all disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
