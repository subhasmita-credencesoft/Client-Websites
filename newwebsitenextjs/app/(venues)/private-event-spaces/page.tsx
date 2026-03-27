import { MountainVenueShowcasePage } from "@/components/features/venues/mountain-venue-showcase-page";
import { privateEventSpacesPageData } from "@/lib/data/pages/mountain-venue-pages";

export default function PrivateEventSpacesPage() {
  return <MountainVenueShowcasePage page={privateEventSpacesPageData} />;
}
