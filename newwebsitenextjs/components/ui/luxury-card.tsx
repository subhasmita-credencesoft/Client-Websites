import Image from "next/image";
import { Card } from "@/components/ui/card";

type LuxuryCardProps = {
  title: string;
  description: string;
  image: string;
};

export function LuxuryCard({ title, description, image }: LuxuryCardProps) {
  return (
    <Card
      as="article"
      variant="subtle"
      data-card
      data-cinematic-card
      data-cursor="hover"
      className="group relative overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-overlay-strong)] via-[var(--color-overlay-soft)] to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
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
    </Card>
  );
}
