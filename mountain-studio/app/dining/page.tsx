"use client";

import Image from "next/image";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { PageHero } from "@/components/sections/PageHero";
import { restaurants, imageSet } from "@/lib/data";

export default function DiningPage() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const activeRestaurant = restaurants.find((item) => item.name === activeMenu);

  return (
    <>
      <PageHero
        image={imageSet.dining}
        eyebrow="Dining"
        title="Three dining concepts, one shared sense of occasion."
        description="From family meals to terrace lunches and relaxed evening dining, the food experience here is designed to be warm, scenic, and memorable."
        priority
      />

      <section className="section-space">
        <div className="container-shell space-y-10">
          {restaurants.map((restaurant, index) => (
            <article key={restaurant.name} className="grid gap-10 rounded-[34px] border border-gold/16 bg-dark-2 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="eyebrow">{restaurant.cuisine}</div>
                <h2 className="display-title text-5xl">{restaurant.name}</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-ivory/68">{restaurant.description}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.28em] text-gold-light">{restaurant.hours}</p>
                <button onClick={() => setActiveMenu(restaurant.name)} className="mt-8 rounded-full bg-gold px-5 py-3 text-xs uppercase tracking-[0.28em] text-dark">
                  View Menu
                </button>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {restaurant.gallery.map((image) => (
                    <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image src={image} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div className={`relative overflow-hidden rounded-[28px] ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <Image src={restaurant.image} alt={restaurant.name} width={1100} height={900} className="aspect-[4/5] w-full object-cover" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[32px]">
            <Image src={imageSet.lobby} alt="Chef portrait" width={900} height={1100} className="aspect-[4/5] w-full object-cover" />
          </div>
          <div>
            <p className="eyebrow">Chef&apos;s Story</p>
            <h2 className="display-title text-5xl">Menus shaped by restraint, seasonality, and flame.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ivory/68">
              Our culinary team works close to growers, fishers, and regional producers to create a dining program that feels rooted, elegant, and quietly surprising.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Private Dining</p>
            <h2 className="display-title text-5xl">Host a dinner with ceremony, warmth, and complete discretion.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ivory/68">
              Private celebrations, proposal dinners, and executive hosting can all be tailored by our culinary and events teams.
            </p>
          </div>
          <form className="rounded-[32px] border border-gold/16 bg-dark-2 p-6 sm:p-8">
            {["Name", "Email", "Date", "Guests"].map((field) => (
              <label key={field} className="mb-5 block">
                <span className="mb-3 block text-xs uppercase tracking-[0.28em] text-gold-light">{field}</span>
                <input className="w-full rounded-2xl border border-gold/16 bg-dark px-4 py-4" />
              </label>
            ))}
            <button className="rounded-full bg-gold px-6 py-4 text-xs uppercase tracking-[0.3em] text-dark">Request Event</button>
          </form>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">Afternoon Tea</p>
            <h2 className="display-title text-5xl">An elegant mid-afternoon ritual of patisserie, tea, and fresh mountain air.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ivory/68">
              Served in the lounge and terrace salon, our afternoon tea pairs seasonal pastries with teas, warm service, and soft live music.
            </p>
            <button className="mt-8 rounded-full border border-gold px-5 py-3 text-xs uppercase tracking-[0.28em] text-gold">
              Reserve Tea Service
            </button>
          </div>
          <div className="relative overflow-hidden rounded-[32px]">
            <Image src={imageSet.roomOne} alt="Afternoon tea" width={1000} height={1200} className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      <Modal open={Boolean(activeRestaurant)} onClose={() => setActiveMenu(null)} title={activeRestaurant?.name ?? "Menu Preview"}>
        <div className="grid gap-6 md:grid-cols-2">
          {activeRestaurant?.menuItems.map((item) => (
            <div key={item.name} className="rounded-2xl border border-gold/12 bg-dark p-5">
              <div className="text-xs uppercase tracking-[0.28em] text-gold-light">{item.course}</div>
              <div className="mt-3 flex items-start justify-between gap-4">
                <h4 className="font-display text-3xl">{item.name}</h4>
                <span className="font-mono text-gold-light">{item.price}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-ivory/64">{item.description}</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
