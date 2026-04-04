"use client";

export default function CallToAction() {
  const text = "Let's Get Started";
  const separator = " ✦ ";
  const repeatedText = Array(12).fill(`${text}${separator}`).join("");

  return (
    <section className="relative bg-black overflow-hidden py-0">
      {/* Angled marquee rows */}
      <div className="relative -rotate-3 -mx-8 flex flex-col gap-0">
        {/* Row 1 — Lime green bg, dark text */}
        <div className="bg-[#C8F542] py-4 overflow-hidden whitespace-nowrap">
          <div className="flex animate-infinite-scroll w-max">
            <span className="font-heading font-bold text-lg md:text-2xl text-black tracking-wide px-2">
              {repeatedText}
            </span>
            <span className="font-heading font-bold text-lg md:text-2xl text-black tracking-wide px-2">
              {repeatedText}
            </span>
          </div>
        </div>

        {/* Row 2 — Dark bg, lime text */}
        <div className="bg-[#1a1a1a] py-4 overflow-hidden whitespace-nowrap border-y border-white/5">
          <div className="flex animate-infinite-scroll-reverse w-max">
            <span className="font-heading font-bold text-lg md:text-2xl text-[#C8F542] tracking-wide px-2">
              {repeatedText}
            </span>
            <span className="font-heading font-bold text-lg md:text-2xl text-[#C8F542] tracking-wide px-2">
              {repeatedText}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
