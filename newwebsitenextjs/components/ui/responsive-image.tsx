import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type AspectRatio = "square" | "3:2" | "4:3" | "16:9";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: AspectRatio;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  quality?: number;
};

const aspectClassMap: Record<AspectRatio, string> = {
  square: "aspect-square",
  "3:2": "aspect-[3/2]",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-[16/9]",
};

export function ResponsiveImage({
  src,
  alt,
  priority = false,
  aspectRatio = "4:3",
  className,
  imageClassName,
  sizes = "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw",
  quality = 72,
}: ResponsiveImageProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-[1.5rem] bg-[#1a1511]", aspectClassMap[aspectRatio], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={quality}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
