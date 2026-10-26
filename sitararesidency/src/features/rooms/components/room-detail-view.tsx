import { RoomGalleryViewer } from '@/features/rooms/components/room-gallery-viewer';
import { RoomDetailHeader } from '@/features/rooms/components/room-detail-header';
import { RoomAmenities } from '@/features/rooms/components/room-amenities';
import { OtherRoomsGrid } from '@/features/rooms/components/other-rooms-grid';
import { RoomBookingWidget } from '@/features/booking';
import type { DetailContent, CardItem } from '@/shared/types/content';

export function RoomDetailView({
  detail,
  otherRooms = [],
}: {
  detail: DetailContent;
  otherRooms?: CardItem[];
}) {
  const images = detail.gallery && detail.gallery.length > 0 ? detail.gallery : [detail.image];

  return (
    <main className="bg-cream pt-20 sm:pt-24 md:pt-28 pb-16 lg:pb-0 overflow-x-hidden min-w-0">
      <RoomDetailHeader detail={detail} />

      {/* ── Main Two-Column Section ── */}
      <section className="px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-8 xl:px-10 overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] gap-8 xl:gap-10 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px] 2xl:grid-cols-[minmax(0,1.5fr)_400px]">
          {/* ── Left Column: Media + Experience + Amenities ── */}
          <div className="min-w-0 space-y-8 sm:space-y-12">
            {/* Interactive Photo Showcase */}
            <RoomGalleryViewer images={images} title={detail.title} />

            {/* Living Experience Narrative */}
            <article className="rounded-sm border border-forest/10 bg-white p-5 sm:p-7 md:p-10 shadow-xs">
              <span className="font-mono-label text-[10px] uppercase tracking-widest text-terracotta font-bold">
                The Living Experience
              </span>
              <h2 className="mt-2 font-display text-2xl text-forest md:text-3xl">
                Refined Space &amp; Thoughtful Hospitality
              </h2>
              <div className="mt-3 h-0.5 w-12 bg-terracotta/40" />

              <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-sage-muted">
                {detail.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </article>

            <RoomAmenities detail={detail} />
          </div>

          {/* ── Right Column: Sticky Booking Widget ── */}
          <div id="booking-widget" className="min-w-0 scroll-mt-28">
            <div className="sticky top-28">
              <RoomBookingWidget
                roomTitle={detail.title}
                price={detail.price}
                occupancy={detail.occupancy}
                rates={detail.rates}
                availability={detail.availability}
              />
            </div>
          </div>
        </div>
      </section>

      <OtherRoomsGrid rooms={otherRooms} />

      {/* ── Mobile Floating Quick-Booking Bar ── */}
      <aside className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-between border-t border-forest/15 bg-white/95 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] backdrop-blur-md lg:hidden">
        <div className="flex flex-col">
          <span className="font-mono-label text-[9px] uppercase tracking-wider text-sage-muted">Direct Rate</span>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-xl font-bold text-forest">{detail.price || 'Best Rate'}</span>
            <span className="text-[10px] text-sage-muted">/ night</span>
          </div>
        </div>
        <a
          href="#booking-widget"
          className="flex items-center gap-1.5 rounded-sm bg-terracotta px-4 py-2.5 font-mono-label text-xs uppercase tracking-widest text-cream shadow-sm hover:bg-forest transition-colors"
        >
          Book Suite
        </a>
      </aside>
    </main>
  );
}
