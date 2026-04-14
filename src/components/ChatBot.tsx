"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, ChevronLeft, MoreVertical, Send, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickReplies = [
    "Book a discovery call to architect a solution",
    "Explore AI integration and ML pipelines",
    "Understand our consulting approach",
    "View our featured projects",
    "Just browsing for now",
  ];

  const [selectedReply, setSelectedReply] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setSelectedReply(text.trim());
    setIsStreaming(true);

    // Add placeholder assistant message
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader available");

      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((l) => l.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                assistantContent += parsed.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantContent,
                  };
                  return updated;
                });
              }
            } catch {
              // Skip malformed chunks
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again or reach out via the contact form at the bottom of the page.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (reply: string) => {
    if (reply === "Book a discovery call to architect a solution") {
      // Show user message
      const userMessage: Message = { role: "user", content: reply };
      setMessages((prev) => [...prev, userMessage]);
      setSelectedReply(reply);
      // Respond with contact form link
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Great choice! You can book a discovery call by filling out our contact form. Click here to get started: [Contact Form](/#contact)",
          },
        ]);
      }, 400);
      return;
    }
    sendMessage(reply);
  };

  const showQuickReplies = messages.length === 0 && !selectedReply;

  return (
    <>
      {/* Floating Toggle Button Wrapper */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[99] flex items-center gap-4 transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          suppressHydrationWarning
          className="w-16 h-16 rounded-full bg-[#C8F542] border-[1.5px] border-[#C8F542] text-black flex items-center justify-center transition-all duration-300 hover:bg-[#b0d836] shadow-2xl shrink-0"
          aria-label="Open Chat"
        >
          <MessageSquare size={26} strokeWidth={2} />
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 bg-white shadow-2xl overflow-hidden flex flex-col font-sans bottom-0 right-0 w-full h-full rounded-none sm:bottom-6 sm:right-6 sm:w-[350px] sm:max-w-[calc(100vw-3rem)] sm:h-[600px] sm:max-h-[calc(100vh-3rem)] sm:rounded-[1.5rem]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <Image
                  src="/chatbot-logo.png"
                  alt="Cortex Logo"
                  width={120}
                  height={30}
                  className="object-contain pt-1"
                  priority
                />
                <span className="text-[13px] font-medium text-gray-500 bg-[#F4F4F5] px-2 py-0.5 rounded-md border border-gray-200">
                  Assistance
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-black transition-colors">
                  <MoreVertical size={20} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                  <ChevronLeft size={24} className="rotate-180" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
              
              {/* Bot Message 1 */}
              <div className="bg-[#F4F4F5] text-black p-4 rounded-2xl rounded-tl-sm self-start max-w-[85%] text-[15px] leading-relaxed">
                👋 Hi, welcome to Cortex. What can I help you architect today?
              </div>

              {/* Bot Message 2 */}
              <div className="bg-[#F4F4F5] text-black p-4 rounded-2xl rounded-tl-sm self-start max-w-[85%] text-[15px] leading-relaxed">
                I can guide you through our services or connect you with a lead architect.
              </div>

              {/* Quick Replies Options */}
              {showQuickReplies && (
                <div className="flex flex-col items-end gap-2 mt-4 pt-4">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-right border border-gray-300 text-gray-600 px-4 py-2.5 rounded-[1.2rem] text-sm hover:bg-gray-50 hover:text-black transition-colors w-fit max-w-[90%]"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Conversation Messages */}
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className={
                    msg.role === "user"
                      ? "bg-[var(--color-accent-primary)] text-white p-3 rounded-2xl rounded-tr-sm self-end max-w-[85%] text-[15px] mt-4"
                      : "bg-[#F4F4F5] text-black p-4 rounded-2xl rounded-tl-sm self-start max-w-[85%] text-[15px] leading-relaxed"
                  }
                >
                  {msg.content ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: msg.content.replace(
                          /\[([^\]]+)\]\(([^)]+)\)/g,
                          '<a href="$2" style="color:#4F46E5;text-decoration:underline;font-weight:500" onclick="window.location.href=\'$2\';return false;">$1</a>'
                        ),
                      }}
                    />
                  ) : (
                    <span className="flex items-center gap-2 text-gray-400">
                      <Loader2 size={14} className="animate-spin" />
                      Thinking...
                    </span>
                  )}
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-gray-100 bg-white shrink-0 flex items-center justify-between"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isStreaming ? "Waiting for response..." : "Type a message..."}
                disabled={isStreaming}
                className="flex-1 text-gray-600 text-sm pl-2 focus:outline-none disabled:opacity-50 bg-transparent"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="text-[#A1A1AA] hover:text-[#52525B] transition-colors p-2 disabled:opacity-30"
              >
                {isStreaming ? (
                  <Loader2 size={20} className="animate-spin ml-1" />
                ) : (
                  <Send size={20} className="ml-1 translate-y-[1px]" />
                )}
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
