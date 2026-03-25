import Link from "next/link";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface PropertyCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string | StaticImageData;
}

export function PropertyCard({ id, slug, title, description, image }: PropertyCardProps) {
  return (
    <Link href={`/property/${slug}`} className="group cursor-pointer flex flex-col items-center text-center gap-4" data-testid={`card-property-${id}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-gray-100 shadow-md">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col gap-2 px-2">
        <h3 className="text-xl font-bold text-foreground/80 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </Link>
  );
}
