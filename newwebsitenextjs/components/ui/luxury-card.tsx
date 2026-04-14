import Image from "next/image";

type LuxuryCardProps = {
  title: string;
  description: string;
  image: string;
};

export function LuxuryCard({ title, description, image }: LuxuryCardProps) {
  return (
    <article
      data-card
      data-cinematic-card
      data-cursor="hover"
      className="site-subtle-card group relative overflow-hidden"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          data-cinematic-media
          className="object-cover transition-transform duration-900 group-hover:scale-110"
          data-card-image
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050506]/95 via-[#0d0d10]/30 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <h3
          data-reveal-child
          className="site-title-md translate-y-4 opacity-90 transition-all duration-500 group-hover:translate-y-0"
        >
          {title}
        </h3>
        <p
          data-reveal-child
          className="site-copy-sm mt-3 translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          {description}
        </p>
      </div>
    </article>
  );
}
