"use client";

import { useState } from "react";
import { MessageSquare, ChevronLeft, MoreVertical, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  
  // The interactive mockup state
  const quickReplies = [
    "Book a discovery call to architect a solution",
    "Explore AI integration and ML pipelines",
    "Understand your consulting approach",
    "View your featured projects",
    "Just browsing for now"
  ];

  const [selectedReply, setSelectedReply] = useState<string | null>(null);

  return (
    <>
      {/* Floating Toggle Button Wrapper */}
      <div
        className={`fixed bottom-8 right-8 z-40 flex items-center gap-4 transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        <div className="hidden md:flex bg-white text-black px-6 py-3.5 rounded-full shadow-2xl font-sans font-medium text-[17px] whitespace-nowrap items-center">
          Chat with us <span className="ml-2 text-xl">👋</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          suppressHydrationWarning
          className="w-16 h-16 rounded-full bg-black border-[1.5px] border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:bg-white/10 shadow-2xl shrink-0"
          aria-label="Open Chat"
        >
          <MessageSquare size={26} strokeWidth={2} />
        </button>
      </div>

      {/* Chat Window Mockup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white shrink-0">
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black transition-colors">
                <ChevronLeft size={24} />
              </button>
              <h3 className="font-medium text-black text-base mx-auto">Let's get you what you need.</h3>
              <button className="text-gray-500 hover:text-black transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
              
              {/* Bot Message 1 */}
              <div className="bg-[#F4F4F5] text-black p-4 rounded-2xl rounded-tl-sm self-start max-w-[85%] text-[15px] leading-relaxed">
                👋 Hi, welcome to Cortex. What can I help you architect today?
              </div>

              {/* Bot Message 2 (As explicitly shown in the mockup duplication) */}
              <div className="bg-[#F4F4F5] text-black p-4 rounded-2xl rounded-tl-sm self-start max-w-[85%] text-[15px] leading-relaxed">
                I can guide you through our services or connect you with a lead architect.
              </div>

              {/* User Selection (if any) */}
              {selectedReply && (
                <div className="bg-[var(--color-accent-primary)] text-white p-3 rounded-2xl rounded-tr-sm self-end max-w-[85%] text-[15px] mt-4">
                  {selectedReply}
                </div>
              )}

              {/* Quick Replies Options */}
              {!selectedReply && (
                <div className="flex flex-col items-end gap-2 mt-4 pt-4">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedReply(reply)}
                      className="text-right border border-gray-300 text-gray-600 px-4 py-2.5 rounded-[1.2rem] text-sm hover:bg-gray-50 hover:text-black transition-colors w-fit max-w-[90%]"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white shrink-0 flex items-center justify-between">
              <div className="text-gray-400 text-sm pl-2">
                Hit the buttons to respond
              </div>
              <button className="text-[#A1A1AA] hover:text-[#52525B] transition-colors p-2">
                <Send size={20} className="ml-1 translate-y-[1px]" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
