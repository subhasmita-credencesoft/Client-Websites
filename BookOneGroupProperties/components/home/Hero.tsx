import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DateRangeField } from "@/components/ui/date-range-field";
import { MessageCircle, MapPin, Users, Search } from "lucide-react";
import { siteImages } from "@/lib/site-images";
import { homePageData } from "@/data/home";

export function Hero() {
  const { hero } = homePageData;

  return (
    <div className="relative min-h-[820px] md:min-h-[90vh] w-full overflow-visible flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={siteImages.hero}
          alt="Luxury villa pool at night"
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white flex flex-col items-center justify-center h-full pt-24 md:pt-20 pb-10 md:pb-0">
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 text-primary animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white/10 backdrop-blur-md py-2 px-4 rounded-full border border-white/20">
          {hero.badge}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 drop-shadow-lg">
          {hero.title}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 drop-shadow-md px-2 sm:px-0">
          {hero.description}
        </p>

        <div className="relative z-[100] w-full max-w-5xl bg-white rounded-lg shadow-2xl p-2 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300 flex flex-col md:flex-row gap-2">
          <div className="flex-1 bg-gray-50 rounded-md px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-primary/50 transition-colors min-w-0">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <div className="text-left flex-1 min-w-0">
              <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Destination</label>
              <select className="w-full bg-transparent text-gray-900 font-bold text-sm focus:outline-none appearance-none cursor-pointer truncate">
                {hero.destinations.map((destination) => (
                  <option key={destination}>{destination}</option>
                ))}
              </select>
            </div>
          </div>

          <DateRangeField />

          <div className="flex-1 bg-gray-50 rounded-md px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-primary/50 transition-colors min-w-0">
            <Users className="w-5 h-5 text-primary shrink-0" />
            <div className="text-left flex-1 min-w-0">
              <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Guests</label>
              <select className="w-full bg-transparent text-gray-900 font-bold text-sm focus:outline-none appearance-none cursor-pointer truncate">
                {hero.guests.map((guest) => (
                  <option key={guest}>{guest}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto md:self-stretch">
            <Button className="flex-1 md:flex-none h-full min-h-[3.5rem] bg-primary hover:bg-primary/90 text-white font-bold px-6 md:px-8 rounded-md text-sm uppercase tracking-wide">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button className="flex-1 md:flex-none h-full min-h-[3.5rem] bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold px-6 rounded-md text-sm uppercase tracking-wide">
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="mt-6 md:mt-8 flex gap-4 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500 px-4">
          <span className="text-white/80 text-xs sm:text-sm font-medium">{hero.whatsappHint}</span>
        </div>
      </div>
    </div>
  );
}
