"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Loader2, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  node?: any;
}

const AIAssistant = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'TOGGLE_AI_ASSISTANT') {
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Błąd połączenia z AI');
      }

      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : "Przepraszam, wystąpił nieoczekiwany błąd. Spróbuj ponownie później.";
      setMessages(prev => [...prev, { role: "assistant", content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-[500px] h-[700px] bg-white dark:bg-[#1B1B1B] rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 dark:border-[#2A2B32]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#2A2B32] bg-white dark:bg-[#1B1B1B]">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 bg-gradient-to-br from-[#8E2DE2] via-[#4A00E0] to-[#1E90FF] rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white">Gemini</h3>
            <p className="text-sm text-gray-500 dark:text-[#8E8EA0]">Asystent AI</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-[#2A2B32] rounded-lg transition-colors"
        >
          <X size={20} className="text-gray-500 dark:text-[#8E8EA0]" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-gray-50 dark:bg-[#1B1B1B]">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full space-y-6 py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#8E2DE2] via-[#4A00E0] to-[#1E90FF] rounded-2xl flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div className="text-center space-y-2 max-w-sm">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                Witaj w Gemini
              </h4>
              <p className="text-gray-500 dark:text-[#8E8EA0]">
                Jak mogę Ci dzisiaj pomóc?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              {[
                "Pomoc w nauce",
                "Porady akademickie",
                "Wyjaśnienie zagadnień",
                "Wsparcie w projektach"
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="p-3 text-sm text-gray-600 dark:text-[#8E8EA0] bg-white dark:bg-[#2A2B32] rounded-xl border border-gray-200 dark:border-[#2A2B32] hover:bg-gray-50 dark:hover:bg-[#343541] transition-colors text-left shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start space-x-4",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8E2DE2] via-[#4A00E0] to-[#1E90FF] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[85%] p-5 rounded-2xl shadow-lg",
                message.role === "user"
                  ? "bg-gradient-to-r from-[#4A00E0] to-[#1E90FF] text-white"
                  : "bg-white dark:bg-[#2A2B32] text-gray-900 dark:text-white border border-gray-200 dark:border-[#343541]"
              )}
            >
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {message.role === "assistant" ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    className="markdown-content"
                    components={{
                      p: ({node, ...props}) => <p className="mb-3 last:mb-0 text-[15px] leading-relaxed text-gray-900 dark:text-white" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-[#4A00E0] dark:text-[#1E90FF]" {...props} />,
                      em: ({node, ...props}) => <em className="text-gray-600 dark:text-[#8E8EA0]" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 space-y-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 space-y-2" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1 text-[15px] text-gray-900 dark:text-white" {...props} />,
                      code: ({node, inline, ...props}: CodeProps) => 
                        inline ? (
                          <code className="bg-gray-100 dark:bg-[#343541] px-2 py-1 rounded text-[14px] text-[#4A00E0] dark:text-[#1E90FF]" {...props} />
                        ) : (
                          <code className="block bg-gray-100 dark:bg-[#343541] p-4 rounded-lg my-3 overflow-x-auto text-[14px] font-mono text-gray-900 dark:text-white" {...props} />
                        ),
                      blockquote: ({node, ...props}) => (
                        <blockquote className="border-l-4 border-[#4A00E0] pl-4 italic my-3 text-[15px] text-gray-600 dark:text-[#8E8EA0]" {...props} />
                      ),
                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white" {...props} />,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                )}
              </div>
            </div>
            {message.role === "user" && (
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-[#343541] flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500 dark:text-[#8E8EA0]" />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-200 dark:border-[#2A2B32] bg-white dark:bg-[#1B1B1B]">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
          <div className="relative flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Wpisz wiadomość..."
              className={cn(
                "w-full pr-4 py-4 pl-5 text-base",
                "bg-gray-50 dark:bg-[#2A2B32]",
                "border-gray-200 dark:border-[#2A2B32]",
                "rounded-2xl",
                "focus:ring-2 focus:ring-[#4A00E0] dark:focus:ring-[#4A00E0]",
                "text-gray-900 dark:text-white",
                "placeholder-gray-500 dark:placeholder-[#8E8EA0]",
                "shadow-inner",
                "transition-all duration-200",
                "min-h-[56px]",
                "resize-none",
                "outline-none"
              )}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            {!isLoading && input.trim() && (
              <div className="absolute right-4 bottom-2 text-xs text-gray-500 dark:text-[#8E8EA0]">
                Enter ↵
              </div>
            )}
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className={cn(
              "bg-gradient-to-r from-[#8E2DE2] via-[#4A00E0] to-[#1E90FF]",
              "hover:opacity-90 text-white",
              "w-14 h-14",
              "rounded-2xl",
              "transition-all duration-200 ease-in-out",
              "flex items-center justify-center",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-lg",
              "group",
              "relative",
              "overflow-hidden",
              "before:absolute before:inset-0 before:bg-black/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6 group-hover:scale-110 transition-transform" />
            )}
          </Button>
        </form>
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500 dark:text-[#8E8EA0]">
            Gemini może popełniać błędy. Rozważ sprawdzenie ważnych informacji.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant; 