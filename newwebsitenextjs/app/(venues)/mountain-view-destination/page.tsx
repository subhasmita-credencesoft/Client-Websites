import { MountainVenueShowcasePage } from "@/components/features/venues/mountain-venue-showcase-page";
import { mountainViewDestinationPageData } from "@/lib/data/pages/mountain-venue-pages";

export default function MountainViewDestinationPage() {
  return <MountainVenueShowcasePage page={mountainViewDestinationPageData} />;
}
