'use client';

import { useState, useRef, useEffect } from 'react';
import { chatWithMedGemma, type ChatMessage } from '@/ai/flows/medgemma-chat';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Send, User, Loader2, RefreshCw, Sparkles, MessageCircle } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
    "What is sickle cell disease?",
    "How can I prevent a pain crisis?",
    "What foods are good with SCD?",
    "How does hydroxyurea help?",
    "What are signs of a medical emergency?",
    "Is sickle cell disease hereditary?",
    "How does SCD affect the spleen?",
    "What is sickle cell trait?",
];

interface DisplayMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    error?: boolean;
}

export function MedGemmaChatClient() {
    const [messages, setMessages] = useState<DisplayMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    async function handleSend(question?: string) {
        const text = (question ?? input).trim();
        if (!text || loading) return;

        const userMsg: DisplayMessage = { id: crypto.randomUUID(), role: 'user', content: text };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        const history: ChatMessage[] = [...messages, userMsg]
            .filter((m) => !m.error)
            .map((m) => ({ role: m.role, content: m.content }));

        const result = await chatWithMedGemma(history);
        setLoading(false);

        setMessages((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: result.success && result.message
                    ? result.message
                    : result.error ?? 'Something went wrong. Please try again.',
                error: !result.success,
            },
        ]);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] max-h-[820px]">
            {/* Message list */}
            <div className="flex-1 overflow-y-auto space-y-6 px-2 pb-4">

                {/* Empty state */}
                {messages.length === 0 && (
                    <div className="flex flex-col items-center gap-8 pt-10">
                        {/* Glowing icon */}
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl scale-150" />
                            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-blue-500/30 border border-primary/40 flex items-center justify-center shadow-xl">
                                <MessageCircle className="w-9 h-9 text-primary" />
                            </div>
                        </div>

                        <div className="text-center max-w-md">
                            <h2 className="text-2xl font-bold font-headline text-foreground mb-2">
                                Dr. Hemo - SCD Health Guide
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Ask any question about sickle cell disease — symptoms, treatments, genetics, daily management and more.
                            </p>
                            <p className="text-xs text-muted-foreground/50 mt-2">
                                For educational purposes only. Always consult your doctor for personal medical advice.
                            </p>
                        </div>

                        {/* Suggested questions grid */}
                        <div className="w-full max-w-xl">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 text-center">
                                Try asking
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {SUGGESTED_QUESTIONS.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSend(q)}
                                        className="group text-left text-sm px-4 py-3 rounded-xl border border-border/60 bg-card/40 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200 text-foreground/70 hover:text-foreground"
                                    >
                                        <Sparkles className="inline w-3 h-3 mr-2 text-primary/50 group-hover:text-primary transition-colors" />
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Messages */}
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            'flex gap-3',
                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                        {/* AI avatar */}
                        {msg.role === 'assistant' && (
                            <div className={cn(
                                'w-8 h-8 rounded-full flex-shrink-0 mt-1 flex items-center justify-center text-xs font-bold',
                                msg.error
                                    ? 'bg-destructive/20 text-destructive'
                                    : 'bg-gradient-to-br from-primary/30 to-blue-500/20 border border-primary/30 text-primary'
                            )}>
                                Dr. H.
                            </div>
                        )}

                        {/* Bubble */}
                        <div className={cn(
                            'max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
                            msg.role === 'user'
                                ? 'bg-primary text-primary-foreground rounded-tr-sm'
                                : msg.error
                                    ? 'bg-destructive/10 border border-destructive/30 text-destructive rounded-tl-sm'
                                    : 'bg-card border border-border/60 text-card-foreground rounded-tl-sm'
                        )}>
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>

                        {/* User avatar */}
                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full flex-shrink-0 mt-1 bg-primary/20 border border-primary/30 flex items-center justify-center">
                                <User className="w-4 h-4 text-primary" />
                            </div>
                        )}
                    </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                    <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full flex-shrink-0 mt-1 bg-gradient-to-br from-primary/30 to-blue-500/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
                            Dr. H.
                        </div>
                        <div className="bg-card border border-border/60 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                            <span className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:0ms]" />
                                <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:150ms]" />
                                <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:300ms]" />
                            </span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="border-t border-border/40 pt-4">
                <div className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about sickle cell disease…"
                            className="min-h-[52px] max-h-[140px] resize-none bg-card/60 border-border/60 focus:border-primary/60 rounded-xl pr-3 text-sm"
                            disabled={loading}
                        />
                    </div>

                    {messages.length > 0 && (
                        <Button
                            onClick={() => { setMessages([]); setInput(''); }}
                            variant="ghost"
                            size="icon"
                            className="h-12 w-12 rounded-xl text-muted-foreground hover:text-foreground flex-shrink-0"
                            title="New conversation"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                    )}

                    <Button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || loading}
                        size="icon"
                        className="h-12 w-12 rounded-xl flex-shrink-0"
                    >
                        {loading
                            ? <Loader2 className="w-5 h-5 animate-spin" />
                            : <Send className="w-5 h-5" />
                        }
                    </Button>
                </div>
                <p className="text-center text-xs text-muted-foreground/40 mt-2">
                    Press Enter to send · Shift+Enter for new line
                </p>
            </div>
        </div>
    );
}
