"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import Link from "next/dist/client/link";

export default function DiningCulinaryExperience() {
  return (
    <section className="relative overflow-hidden bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <div className="pointer-events-none absolute left-0 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-[#f1e6d2] blur-2xl md:block" />
      <motion.img
        src="/images/dining-img1.png"
        alt=""
        className="pointer-events-none absolute left-10 top-1/2 hidden w-32 -translate-y-28 md:block"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.img
        src="/images/dining-img2.png"
        alt=""
        className="pointer-events-none absolute left-36 top-1/2 hidden w-24 translate-y-10 md:block"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.35fr_1.3fr_0.35fr] lg:items-center">
          <div className="hidden lg:block" aria-hidden="true" />

          <div className="space-y-10 text-center lg:mx-auto lg:max-w-3xl lg:text-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
                Unforgettable culinary experience
              </span>
              <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
                Delicious local cuisines as well as cuisines from all parts of India are served. Enjoy a hearty lunch and a delectable dinner at UK's Resort
              </h2>
            </div>

            <div className="mx-auto max-w-xl">
              <h3 className="text-xs uppercase tracking-[0.4em] text-[#1f3c44]/70">
                Contact
              </h3>
              <div className="mt-4 divide-y divide-[#1f3c44]/25 border-y border-[#1f3c44]/25 text-sm">
                <div className="flex flex-col items-center gap-1 py-4 sm:flex-row sm:justify-between">
                  <span>Phone Number:</span>
                  <span className="font-medium">+91 98220 12343</span>
                </div>
                <div className="flex flex-col items-center gap-1 py-4 sm:flex-row sm:justify-between">
                  <span>Email:</span>
                  <span className="font-medium">info@uksresort.com</span>
                </div>
              </div>

            <Link href="rooms/reservation">
            <button
            type="button"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#1f3c44]/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#1f3c44] transition hover:border-[#1f3c44] hover:bg-[#1f3c44]/5"
            >
            Book now
               <span aria-hidden="true">&gt;</span>
               </button>
               </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <motion.div
              className="relative h-[280px] w-[280px] overflow-hidden rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] md:h-[340px] md:w-[340px]"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="/images/dine-img.jpg"
                alt="Signature plated dish"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

