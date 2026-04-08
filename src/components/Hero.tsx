"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-black overflow-hidden pt-32 pb-12">
      
      {/* Abstract radiating lines effect on the left background */}
      <div className="absolute top-0 left-0 w-2/3 h-full pointer-events-none opacity-20">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-white">
          <path 
            d="M 5 0 L 5 100 
               M 15 0 L 25 100 
               M 25 0 L 45 100 
               M 35 0 L 70 100 
               M 45 0 L 100 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.2" 
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 flex-1 flex flex-col relative z-10 w-full">
        <div className="flex flex-col lg:flex-row flex-1 w-full justify-between items-end pb-24 md:pb-20">
          
          {/* Left Bottom Floating Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 w-[380px] shadow-2xl relative mt-auto"
          >
            <div className="flex items-start gap-4 mb-10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-2 shrink-0 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
              <p className="text-gray-200 text-xl font-light leading-snug">
                Cortex announce a strategic digital partnership
              </p>
            </div>
            <div className="flex justify-end">
              <button 
                suppressHydrationWarning
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#C8F542] text-black font-medium text-sm px-6 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(200,245,66,0.3)] transition-all flex items-center gap-2 tracking-wide block w-fit"
              >
                Read more <span className="text-lg leading-none font-light">→</span>
              </button>
            </div>
          </motion.div>

          {/* Right Side Text Block */}
          <div className="w-full lg:w-[60%] flex flex-col items-start lg:items-end lg:text-left ml-auto mt-20 lg:mt-0 lg:pb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.05] tracking-tight text-white mb-20 md:mb-24 text-left w-full"
            >
              End‑to‑end<br />
              digital engineering<br />
              for ambitious teams
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-sm text-left lg:mr-12 xl:mr-24 mr-auto w-full"
            >
              From product strategy and UX to mobile, web, and automation, Cortex builds and scales the systems your business runs on.
            </motion.p>
            
            {/* Mobile-only duplicate card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex md:hidden flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 w-full shadow-2xl relative mt-16"
            >
              <div className="flex items-start gap-4 mb-8">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
                <p className="text-gray-200 text-lg font-light leading-snug">
                  Cortex announce a strategic digital partnership
                </p>
              </div>
              <div className="flex justify-end">
                <button 
                  suppressHydrationWarning
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#C8F542] text-black font-medium text-sm px-5 py-2 rounded-full hover:shadow-[0_0_15px_rgba(200,245,66,0.4)] transition-all flex items-center gap-2 tracking-wide w-fit"
                >
                  Read more <span className="text-lg leading-none font-light">→</span>
                </button>
              </div>
            </motion.div>
          </div>

        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-gray-500 font-sans text-[10px] tracking-widest uppercase mb-2">Explore</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="text-gray-500 text-xs">
            ↓
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
