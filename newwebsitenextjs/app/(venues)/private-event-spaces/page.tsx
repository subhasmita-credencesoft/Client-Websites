import { VenueShowcasePage } from "@/components/features/venues/venue-showcase-page";
import { privateEventSpacesPageData } from "@/lib/data/pages/venue-pages";

export default function PrivateEventSpacesPage() {
  return <VenueShowcasePage page={privateEventSpacesPageData} />;
}
