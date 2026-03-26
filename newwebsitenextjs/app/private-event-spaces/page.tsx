import { MountainVenueShowcasePage } from "@/components/pages/mountain-venue-showcase-page";
import { privateEventSpacesPageData } from "@/lib/data/mountain-venue-pages";

export default function PrivateEventSpacesPage() {
  return <MountainVenueShowcasePage page={privateEventSpacesPageData} />;
}
