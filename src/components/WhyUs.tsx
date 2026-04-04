"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    title: "End-to-end ownership",
    desc: "We manage the entire lifecycle, from rapid prototyping to production deployment and scaling."
  },
  {
    title: "Design-first engineering",
    desc: "Technical solutions informed by user experience, ensuring beautiful, intuitive results."
  },
  {
    title: "AI-ready solutions",
    desc: "Architectures designed to integrate seamlessly with modern language models and ML pipelines."
  },
  {
    title: "Performance & security",
    desc: "Uncompromising standards for low latency, high availability, and secure data handling."
  }
];

export default function WhyUs() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Create the scroll binding over the height of the container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress (0-1) into an upward translation of the container (-75% because there are 4 items of equal height)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  
  // Transform scroll progress (0-1) into the height of the vertical progress line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="why-us" ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center pt-24 pb-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between h-full">
          
          {/* Left Column: Fixed Title */}
          <div className="lg:w-1/3 mb-12 lg:mb-0 flex flex-col justify-center h-full">
            <h2 className="font-heading font-light text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-wide">
              Why Us.
            </h2>
            <div className="w-16 h-[1px] bg-[var(--color-accent-primary)] mb-8"></div>
            <p className="text-gray-400 text-lg md:text-xl font-light pr-12 lg:pr-24">
              Scroll to explore the pillars of our technical consulting and strategy approach.
            </p>
          </div>

          {/* Right Column: Scrolling Timeline */}
          <div className="lg:w-1/2 relative h-[60vh] lg:h-[70vh] w-full flex">
            
            {/* Vertical Timeline Divider */}
            <div className="w-[2px] bg-white/10 h-full mr-8 md:mr-16 relative rounded-full">
               <motion.div 
                 style={{ height: lineHeight }} 
                 className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-red-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] rounded-full"
               >
                 {/* The glowing dot head at the bottom of the active line */}
                 <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_white]"></div>
               </motion.div>
            </div>

            <div className="flex-1 relative overflow-hidden h-full">
               {/* Mask to blur out edges vertically */}
              <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'linear-gradient(to bottom, black 0%, transparent 15%, transparent 85%, black 100%)' }}></div>
              
              <motion.div 
                style={{ y }} 
                className="absolute w-full flex flex-col h-[400%]"
              >
                {features.map((f, i) => (
                    <div key={i} className="h-[25%] flex flex-col justify-center pr-8">
                      <div className="flex flex-col gap-4">
                        <span className="text-[var(--color-accent-primary)] font-heading text-xl md:text-2xl font-bold tracking-widest pt-1">
                          0{i+1}
                        </span>
                        <div>
                          <h3 className="text-white font-heading font-light text-3xl md:text-4xl mb-4 leading-tight">
                            {f.title}
                          </h3>
                          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                            {f.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
