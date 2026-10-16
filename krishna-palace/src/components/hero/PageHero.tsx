import CinematicHero from '@/components/hero/CinematicHero';

export default function PageHero({ title, eyebrow, description, image, alt, secondImage, secondAlt, secondTitle = 'A region made for discovery.', secondDescription = 'Return to Hosapete between days spent among the heritage and wide-open landscapes of Karnataka.' }: { title: string; eyebrow?: string; description: string; image: string; alt: string; secondImage: string; secondAlt: string; secondTitle?: string; secondDescription?: string }) {
  return (
    <CinematicHero eyebrow={eyebrow} title={title} description={description} image={image} alt={alt}
      secondImage={secondImage} secondAlt={secondAlt} secondEyebrow="Stay close to the story"
      secondTitle={secondTitle} secondDescription={secondDescription} />
  );
}
