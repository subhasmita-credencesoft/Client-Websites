"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { galleryImages } from "@/data/gallery";
import { SECTION_IDS } from "@/lib/constants";

export function GallerySection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedImage = galleryImages.find((image) => image.id === selectedId) ?? null;

  return (
    <section className="section-shell bg-stone-950 text-white" id={SECTION_IDS.gallery}>
      <Container>
        <SectionHeading align="center" description="A visual preview of the mood, interiors, and welcoming hospitality style behind the stay experience." eyebrow="Gallery" title="A closer look at the atmosphere of Shravan Royal Inn" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <motion.button
              key={image.id}
              aria-label={`View ${image.title}`}
              className="group relative overflow-hidden rounded-[1.4rem] text-left sm:rounded-[1.75rem]"
              initial={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.25 }}
              whileInView={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedId(image.id)}
            >
              <Image alt={image.alt} className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-75 sm:h-[260px] lg:h-[280px]" height={900} src={image.image} width={700} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 py-4 text-white sm:px-5 sm:py-6">
                <p className="font-display text-xl font-semibold text-white sm:text-2xl">{image.title}</p>
                <p className="text-sm text-white/80">Tap to expand</p>
              </div>
            </motion.button>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {selectedImage ? (
          <motion.div animate={{ opacity: 1 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-950/90 p-4 backdrop-blur-md" exit={{ opacity: 0 }} initial={{ opacity: 0 }} onClick={() => setSelectedId(null)}>
            <motion.div animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10" exit={{ opacity: 0, scale: 0.96 }} initial={{ opacity: 0, scale: 0.96 }} onClick={(event) => event.stopPropagation()}>
              <Image alt={selectedImage.alt} className="max-h-[80vh] w-full object-cover" height={1200} src={selectedImage.image} width={1800} />
              <button aria-label="Close gallery image" className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm" onClick={() => setSelectedId(null)}>
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}