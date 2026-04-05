"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Required"),
  city: z.string().min(2, "Required"),
  state: z.string().min(2, "Required"),
  services: z.array(z.string()).min(1, "Select at least one service"),
  description: z.string().min(10, "Please provide a brief description"),
  budget: z.string().min(1, "Required"),
  timeline: z.string().min(1, "Required"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setIsSuccess(true);
      reset();
    } catch (e) {
      console.error(e);
      alert("Failed to send message, please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  };

  const RequiredBadge = () => (
    <span className="text-[#FF3333] text-sm font-bold ml-2 tracking-wide">(Required)</span>
  );

  return (
    <section id="contact" className="py-32 bg-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto">

          <ScrollReveal>
            <h2 className="font-heading font-light text-4xl md:text-5xl lg:text-6xl text-white mb-16 tracking-tight leading-[1.1] text-center">
              Ready to<br />architect your<br />next move?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center text-center py-32"
                >
                  <div className="text-[var(--color-accent-secondary)] mb-6">
                    <CheckCircle2 size={64} strokeWidth={1} />
                  </div>
                  <h3 className="font-heading font-light text-3xl text-white mb-4">
                    Message Received
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-lg">
                    We'll be in touch shortly to guide you.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-16"
                >
                  {/* Name field mapping */}
                  <div>
                    <label className="block text-white font-sans font-light text-xl mb-6">
                      Name <RequiredBadge />
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
                      <div className="flex flex-col">
                        <input
                          {...register("firstName")}
                          suppressHydrationWarning
                          className="w-full bg-transparent border-b border-white text-white py-2 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors placeholder-transparent"
                        />
                        <span className="text-white text-sm font-light mt-2 tracking-wide">First</span>
                        {errors.firstName && <span className="text-[var(--color-error)] text-xs mt-1">{errors.firstName.message}</span>}
                      </div>
                      <div className="flex flex-col">
                        <input
                          {...register("lastName")}
                          suppressHydrationWarning
                          className="w-full bg-transparent border-b border-white text-white py-2 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors placeholder-transparent"
                        />
                        <span className="text-white text-sm font-light mt-2 tracking-wide">Last</span>
                        {errors.lastName && <span className="text-[var(--color-error)] text-xs mt-1">{errors.lastName.message}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white font-sans font-light text-xl mb-6">
                      Email <RequiredBadge />
                    </label>
                    <div className="flex flex-col">
                      <input
                        {...register("email")}
                        suppressHydrationWarning
                        className="w-full bg-transparent border-b border-white text-white py-2 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors placeholder-transparent"
                      />
                      {errors.email && <span className="text-[var(--color-error)] text-xs mt-1">{errors.email.message}</span>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white font-sans font-light text-xl mb-6">
                      Phone <RequiredBadge />
                    </label>
                    <div className="flex flex-col">
                      <input
                        {...register("phone")}
                        suppressHydrationWarning
                        className="w-full bg-transparent border-b border-white text-white py-2 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors placeholder-transparent"
                      />
                      {errors.phone && <span className="text-[var(--color-error)] text-xs mt-1">{errors.phone.message}</span>}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-white font-sans font-light text-xl mb-6">
                      Location <RequiredBadge />
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
                      <div className="flex flex-col">
                        <input
                          {...register("city")}
                          suppressHydrationWarning
                          className="w-full bg-transparent border-b border-white text-white py-2 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors placeholder-transparent"
                        />
                        <span className="text-white text-sm font-light mt-2 tracking-wide">City</span>
                        {errors.city && <span className="text-[var(--color-error)] text-xs mt-1">{errors.city.message}</span>}
                      </div>
                      <div className="flex flex-col">
                        <input
                          {...register("state")}
                          suppressHydrationWarning
                          className="w-full bg-transparent border-b border-white text-white py-2 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors placeholder-transparent"
                        />
                        <span className="text-white text-sm font-light mt-2 tracking-wide">State / Province / Region</span>
                        {errors.state && <span className="text-[var(--color-error)] text-xs mt-1">{errors.state.message}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Services Checkboxes */}
                  <div>
                    <label className="block text-white font-sans font-light text-xl mb-6">
                      What type of service are you interested in? <RequiredBadge />
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                      {["App Development", "Web Development", "UI/UX Design", "Chatbot Building", "SEO Optimization", "Cloud & DevOps", "API & Integrations", "Maintenance"].map((service) => (
                        <label key={service} className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input
                              type="checkbox"
                              value={service}
                              suppressHydrationWarning
                              {...register("services")}
                              className="w-5 h-5 rounded-[4px] border border-white/60 bg-transparent cursor-pointer appearance-none checked:bg-white checked:border-white transition-all peer"
                            />
                            <svg className="absolute w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 5L4.5 8.5L13 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-white font-light text-lg group-hover:text-gray-300 transition-colors">{service}</span>
                        </label>
                      ))}
                    </div>
                    {errors.services && <span className="text-[var(--color-error)] text-xs mt-3 block">{errors.services.message}</span>}
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-white font-sans font-light text-xl mb-6">
                      Brief project description <RequiredBadge />
                    </label>
                    <div className="flex flex-col">
                      <textarea
                        {...register("description")}
                        rows={4}
                        suppressHydrationWarning
                        placeholder="Tell us about your goals..."
                        className="w-full bg-transparent border-b border-white text-white py-2 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors resize-none placeholder-white/30"
                      />
                      {errors.description && <span className="text-[var(--color-error)] text-xs mt-1">{errors.description.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
                    {/* Budget */}
                    <div>
                      <label className="block text-white font-sans font-light text-xl mb-6">
                        Budget range <RequiredBadge />
                      </label>
                      <div className="flex flex-col relative">
                        <select
                          {...register("budget")}
                          suppressHydrationWarning
                          className="w-full bg-transparent border-b border-white text-white py-2 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black text-white">Select budget...</option>
                          <option value="< $5k" className="bg-black text-white">Under $5,000</option>
                          <option value="$5k - $10k" className="bg-black text-white">$5,000 - $10,000</option>
                          <option value="$10k - $25k" className="bg-black text-white">$10,000 - $25,000</option>
                          <option value="$25k+" className="bg-black text-white">$25,000+</option>
                        </select>
                        <div className="absolute right-0 top-3 pointer-events-none">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        {errors.budget && <span className="text-[var(--color-error)] text-xs mt-1">{errors.budget.message}</span>}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-white font-sans font-light text-xl mb-6">
                        Timeline <RequiredBadge />
                      </label>
                      <div className="flex flex-col relative">
                        <select
                          {...register("timeline")}
                          suppressHydrationWarning
                          className="w-full bg-transparent border-b border-white text-white py-2 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black text-white">Select timeline...</option>
                          <option value="ASAP" className="bg-black text-white">ASAP</option>
                          <option value="1-3 months" className="bg-black text-white">1 - 3 months</option>
                          <option value="3-6 months" className="bg-black text-white">3 - 6 months</option>
                          <option value="Flexible" className="bg-black text-white">Flexible</option>
                        </select>
                        <div className="absolute right-0 top-3 pointer-events-none">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        {errors.timeline && <span className="text-[var(--color-error)] text-xs mt-1">{errors.timeline.message}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      suppressHydrationWarning
                      className="px-12 py-4 rounded-full bg-white text-black font-sans font-medium text-lg tracking-wide hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 border border-transparent"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
