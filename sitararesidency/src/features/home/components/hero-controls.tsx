import { ChevronLeft, ChevronRight } from 'lucide-react';

export function HeroControls({
  currentSlide,
  total,
  onPrev,
  onNext,
  onSelect,
}: {
  currentSlide: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-5 sm:mt-7 flex items-center justify-center gap-3 sm:gap-4 z-20">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous slide"
        className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border border-white/40 bg-black/40 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#26382e]"
      >
        <ChevronLeft size={15} />
      </button>

      {/* Indicator Dots with Slide Number */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentSlide === i ? 'w-8 bg-[#d7b49a]' : 'w-1.5 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className="grid h-8 w-8 place-items-center rounded-full border border-white/40 bg-black/40 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#26382e]"
      >
        <ChevronRight size={16} />
      </button>

      {/* Subtle Slide Counter */}
      <span
        className="hidden sm:inline-flex text-[11px] text-white/70 tracking-[0.25em] pl-1 uppercase font-semibold"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        0{currentSlide + 1} / 0{total}
      </span>
    </div>
  );
}
