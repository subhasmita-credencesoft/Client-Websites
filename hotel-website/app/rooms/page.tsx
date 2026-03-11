import RoomsHero from "../../components/sections/RoomsHero";
import RoomsGrid from "../../components/sections/RoomsGrid";

export default function RoomsPage() {
  return (
    <>
      <RoomsHero />
      <RoomsGrid
        eyebrow="Rooms"
        title="Suite collection"
        subtitle="Select a stay that balances privacy, light, and curated amenities."
      />
    </>
  );
}
