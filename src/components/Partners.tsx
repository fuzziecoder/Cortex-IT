import ScrollReveal from "./ScrollReveal";
import prisma from "@/lib/prisma";

export default async function Partners() {
  const partners = await prisma.partner.findMany();

  return (
    <section className="py-24 bg-black relative border-y border-white/5 overflow-hidden">
      <div className="w-full relative z-10 text-center">
        
        {/* Title */}
        <ScrollReveal>
          <h2 className="font-heading font-light text-3xl md:text-4xl text-white mb-16 tracking-wide">
            Partners. Destinations. Outcomes.
          </h2>
        </ScrollReveal>

        {/* Marquee Container */}
        <div className="flex w-full overflow-hidden mask-image-linear-edges relative">
          <div className="flex shrink-0 animate-infinite-scroll w-max gap-20 md:gap-32 items-center px-10">
            {/* Double mapping for seamless infinite scroll loop */}
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <a
                key={`${partner.id ?? i}-${i}`}
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-500 flex items-center justify-center shrink-0 hover:scale-110"
              >
                <img 
                  src={partner.logoUrl} 
                  alt={`${partner.name} logo`} 
                  className="h-16 md:h-20 w-auto object-contain rounded-lg shadow-lg"
                />
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
