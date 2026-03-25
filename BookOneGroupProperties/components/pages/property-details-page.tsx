"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Tag,
  Check,
  Wifi,
  Wind,
  Coffee,
  Car,
  Utensils,
  Droplets,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { AmenityIconKey, PropertyDetails } from "@/data/property-details";
import { formatCurrency } from "@/lib/currency";

const amenityIconMap: Record<AmenityIconKey, any> = {
  wifi: Wifi,
  wind: Wind,
  coffee: Coffee,
  car: Car,
  utensils: Utensils,
  droplets: Droplets,
  monitor: Monitor,
  star: Star,
};

type PropertyDetailsPageProps = {
  property: PropertyDetails;
};

export function PropertyDetailsPage({ property }: PropertyDetailsPageProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const nextImage = () => setActiveImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === property.booking.couponHint) {
      setDiscount(property.booking.couponDiscount);
    } else {
      setDiscount(0);
      alert("Invalid coupon code");
    }
  };

  return (
    <main className="min-h-screen bg-background font-sans relative">
      <div className="relative h-[42vh] min-h-[320px] md:h-[58vh] lg:h-[62vh] w-full overflow-hidden group">
        <div className="absolute inset-0">
          <Image
            src={property.images[activeImage]}
            alt={property.title}
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        </div>

        <button onClick={prevImage} className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 p-2.5 md:p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-20">
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button onClick={nextImage} className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 p-2.5 md:p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-20">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="absolute bottom-5 md:bottom-8 left-0 right-0 container mx-auto px-4 sm:px-6 text-white flex flex-col gap-4 md:flex-row md:justify-between md:items-end z-20">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm font-medium bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full w-fit">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{property.ratingLabel}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-none">{property.title}</h1>
            <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="flex gap-3 self-start md:self-auto">
            <Button variant="outline" size="icon" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-black transition-colors">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 hidden lg:flex gap-2 z-20">
          {property.images.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative w-14 h-10 xl:w-16 xl:h-12 rounded-md overflow-hidden border-2 transition-all ${activeImage === index ? "border-primary scale-105" : "border-white/50 opacity-70 hover:opacity-100"}`}
            >
              <Image src={image} alt={`Thumbnail ${index + 1}`} fill sizes="64px" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-12">
          <div className="lg:w-2/3 space-y-12 md:space-y-16">
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">About the Property</h2>
                <Badge variant="outline" className="border-primary text-primary w-fit">{property.typeBadge}</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{property.description}</p>
            </section>

            <section className="bg-secondary/20 p-5 sm:p-6 md:p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">World Class Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {property.amenities.map((item) => {
                  const Icon = amenityIconMap[item.icon];

                  return (
                    <div key={item.label} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <Icon className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-medium text-sm text-foreground/80">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Choose Your Room</h2>
              <div className="space-y-6">
                {property.rooms.map((room) => (
                  <div key={room.id} className="flex flex-col md:flex-row border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white">
                    <div className="md:w-2/5 h-64 md:h-auto relative">
                      <Image src={room.image} alt={room.name} fill sizes="(max-width: 768px) 100vw, 40vw" className="h-full w-full object-cover" />
                    </div>
                    <div className="md:w-3/5 p-5 md:p-6 flex flex-col justify-between gap-5">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                          <h3 className="text-xl font-bold">{room.name}</h3>
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 w-fit">{room.size}</Badge>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          <li className="text-sm text-muted-foreground flex items-center gap-2"><Check className="w-3 h-3 text-green-500 shrink-0" /> {room.bed}</li>
                          <li className="text-sm text-muted-foreground flex items-center gap-2"><Check className="w-3 h-3 text-green-500 shrink-0" /> {room.view}</li>
                          {room.features.map((feature) => (
                            <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2"><Check className="w-3 h-3 text-green-500 shrink-0" /> {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-2 pt-4 border-t border-border/50">
                        <div>
                          <span className="text-2xl font-bold text-primary">{formatCurrency(room.price)}</span>
                          <span className="text-sm text-muted-foreground"> / night</span>
                        </div>
                        <Button className="w-full sm:w-auto">Select Room</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Enhance Your Stay</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.packages.map((pkg) => (
                  <div key={pkg.id} className="group relative rounded-xl overflow-hidden cursor-pointer h-64">
                    <Image src={pkg.image} alt={pkg.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                      <div className="flex justify-between items-end gap-4">
                        <div>
                          <h3 className="font-bold text-base md:text-lg mb-1">{pkg.title}</h3>
                          <p className="text-white/80 text-sm line-clamp-2 md:line-clamp-1">{pkg.description}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full shrink-0">
                          <span className="font-bold text-sm">+ {formatCurrency(pkg.price)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity transform md:translate-y-2 md:group-hover:translate-y-0">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-primary rounded-2xl overflow-hidden text-white relative">
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="md:w-1/2 p-6 sm:p-8 md:p-12 z-10">
                  <div className="inline-block bg-white/20 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">{property.appPromo.badge}</div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{property.appPromo.title}</h2>
                  <p className="text-white/80 mb-8 leading-relaxed text-sm sm:text-base">{property.appPromo.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="secondary" className="font-bold">Download App</Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">Learn More</Button>
                  </div>
                </div>
                <div className="md:w-1/2 h-64 md:h-80 relative">
                  <Image src={property.appPromo.image} alt={property.appPromo.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent md:bg-gradient-to-l" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-6">Guest Reviews</h2>
              <div className="space-y-6">
                {property.reviews.map((review) => (
                  <div key={review.id} className="border-b border-border/50 pb-6 last:border-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 shrink-0">{review.user[0]}</div>
                        <div>
                          <h4 className="font-bold">{review.user}</h4>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-green-700 font-bold text-sm w-fit">
                        {review.rating} <Star className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-24 bg-white border border-gray-100 shadow-xl rounded-2xl p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-6">
                <div>
                  <span className="text-3xl font-bold text-primary">{formatCurrency(property.booking.basePrice - discount)}</span>
                  {discount > 0 && <span className="text-sm text-muted-foreground line-through ml-2">{formatCurrency(property.booking.basePrice)}</span>}
                  <span className="text-muted-foreground"> / night</span>
                </div>
                <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1 w-fit">
                  <Check className="w-3 h-3" /> {property.booking.availability}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Check-in</label>
                    <div className="font-bold text-sm">{property.booking.checkIn}</div>
                  </div>
                  <div className="border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Check-out</label>
                    <div className="font-bold text-sm">{property.booking.checkOut}</div>
                  </div>
                </div>
                <div className="border rounded-lg p-3">
                  <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Guests</label>
                  <select className="w-full bg-transparent font-bold text-sm focus:outline-none">
                    {property.booking.guests.map((guest) => (
                      <option key={guest}>{guest}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="uppercase" />
                  <Button variant="secondary" onClick={applyCoupon} className="sm:w-auto w-full">Apply</Button>
                </div>
                {discount > 0 && (
                  <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Coupon {property.booking.couponHint} applied successfully!
                  </p>
                )}
                <p className="text-[10px] text-muted-foreground mt-2">Try code: <b>{property.booking.couponHint}</b> for {formatCurrency(property.booking.couponDiscount)} off</p>
              </div> */}

              <div className="space-y-3">
                <Button className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">Book Now</Button>
                <Button variant="outline" className="w-full h-12 text-base font-bold border-primary text-primary hover:bg-primary/5">Contact Host</Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-muted-foreground">
                <p className="flex items-center justify-center gap-2">
                  <ShieldCheckIcon className="w-4 h-4 text-green-500" /> {property.booking.secureLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ShieldCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

