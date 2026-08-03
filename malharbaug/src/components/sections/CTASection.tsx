export default function CTASection() {
  return (
    <section className="bg-brand-600 px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
          Ready to Escape to Nature?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-brand-50">
          Book your stay at Malhar Baug Resort and experience the perfect blend of comfort and nature.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-sans text-sm font-semibold text-brand-600 transition-all duration-200 ease-out hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Book Now
          </a>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-white hover:text-brand-100"
          >
            <iconify-icon icon="solar:phone-bold" width="18" height="18"></iconify-icon>
            +91 98765 43210
          </a>
        </div>
      </div>
    </section>
  );
}
