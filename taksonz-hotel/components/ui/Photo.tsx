import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  /** Pass for hero / LCP images so they are eagerly loaded. */
  priority?: boolean;
  /** Decorative images get an empty alt. */
  decorative?: boolean;
  sizes?: string;
  objectFit?: "cover" | "contain";
  position?: string;
}

/** Fills its (aspect-ratio-sized) parent. Responsive widths come from lib/images/loader.ts. */
export function Photo({ src, alt, decorative, priority, sizes = "100vw", objectFit = "cover", position = "center" }: Props) {
  return <Image src={src} alt={decorative ? "" : alt} fill sizes={sizes} priority={priority} style={{ objectFit, objectPosition: position }} />;
}
