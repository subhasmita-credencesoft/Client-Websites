'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const stats = [
  { value: '5', label: 'Acres of Greenery' },
  { value: '2018', label: 'Established' },
  { value: '18', label: 'Rooms & Villas' },
];

export default function About() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: Text & Stats */}
        <div>
          <p className="section-subtitle">About</p>
          <h2 className="section-title">Discover Malhar Baug Resort</h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            Nestled in the heart of nature near the pristine Nagaon Beach in Alibaug, Malhar Baug Resort offers a
            tranquil escape from the chaos of city life. Surrounded by lush greenery and sprawling gardens, our resort
            combines modern comfort with the serenity of the outdoors. Whether you are planning a family vacation, a
            romantic getaway, or a corporate retreat, Malhar Baug provides the perfect setting with its warm
            hospitality, thoughtfully designed accommodations, and a wide array of amenities that cater to every
            guest.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 text-left">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-brand-500 pl-4">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-brand-600 dark:text-brand-400">
                  {stat.value}
                </p>
                <p className="mt-1 font-sans text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/about/" className="btn-primary">
              <span>Read Full Story</span>
              <iconify-icon icon="solar:arrow-right-linear" width="18" height="18"></iconify-icon>
            </Link>
            <Link
              href="/rooms/"
              className="inline-flex items-center gap-2 rounded-full border border-earth-300 px-6 py-3 font-sans text-sm font-semibold text-earth-800 transition-colors hover:border-brand-600 hover:text-brand-600 dark:border-earth-700 dark:text-earth-200 dark:hover:border-brand-400 dark:hover:text-brand-400"
            >
              <span>Explore Accommodations</span>
            </Link>
          </div>
        </div>

        {/* Right: Embedded Video with Custom Controls & Video Badge */}
        <div className="relative">
          <div className="group relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/5] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border border-earth-200/80 dark:border-earth-800 bg-earth-950">
            <video
              ref={videoRef}
              src="/malharaboutvideo.mp4"
              poster="/aboutimg.jpeg"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              onClick={togglePlay}
            />

            {/* Video Tour Pill Badge */}
            <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-1.5 font-sans text-xs font-semibold text-white backdrop-blur-md shadow-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Resort Video Tour</span>
            </div>

            {/* Video Overlay Controls */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2.5">
              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/90 shadow-lg"
              >
                <iconify-icon
                  icon={isPlaying ? 'solar:pause-bold' : 'solar:play-bold'}
                  width="20"
                  height="20"
                ></iconify-icon>
              </button>

              {/* Mute/Unmute Button */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/90 shadow-lg"
              >
                <iconify-icon
                  icon={isMuted ? 'solar:volume-cross-bold' : 'solar:volume-loud-bold'}
                  width="20"
                  height="20"
                ></iconify-icon>
              </button>
            </div>

            {/* Subtle Gradient Shadow at Bottom of Video */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Decorative Corner Accent */}
          <div className="pointer-events-none absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-3xl bg-brand-500/10 blur-xl dark:bg-brand-500/20" />
        </div>
      </div>
    </section>
  );
}
