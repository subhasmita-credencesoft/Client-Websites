import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import RoomCard from "../features/RoomCard";
import rooms from "../../data/rooms";

type RoomsGridProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export default function RoomsGrid({
  eyebrow = "Suites",
  title = "Rooms crafted for deep rest.",
  subtitle = "Choose a suite that pairs handcrafted interiors with thoughtful amenities.",
}: RoomsGridProps) {
  return (
    <section className="bg-[#f3efe8] py-16 text-[#1f3c44]">
      <Container>
        <div className="text-center">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            align="center"
          />
          <div className="mx-auto mb-10 h-px w-full max-w-3xl bg-[#1f3c44]/15" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
        <div className="mt-10 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1f3c44]/30 text-sm">
            1
          </span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1f3c44]/20 text-sm text-[#1f3c44]/70">
            2
          </span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1f3c44]/20 text-sm text-[#1f3c44]/70">
            &gt;
          </span>
        </div>
      </Container>
    </section>
  );
}
