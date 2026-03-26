import { MountainVenueShowcasePage } from "@/components/pages/mountain-venue-showcase-page";
import { mountainViewDestinationPageData } from "@/lib/data/mountain-venue-pages";

export default function MountainViewDestinationPage() {
  return <MountainVenueShowcasePage page={mountainViewDestinationPageData} />;
}
