import { AwardsSection } from "@/components/sections/awards-section";
import { PartnerLogosSection } from "@/components/sections/partner-logos-section";
import { ReservationSection } from "@/components/sections/reservation-section";
import { TownshipsSection } from "@/components/sections/townships-section";

type GlobalPageSectionsProps = {
  hideContactAndStay?: boolean;
};

export function GlobalPageSections({ hideContactAndStay = false }: GlobalPageSectionsProps) {
  return (
    <>
      {hideContactAndStay ? null : <PartnerLogosSection />}
      {hideContactAndStay ? null : <TownshipsSection />}
      <AwardsSection />
      <ReservationSection />
    </>
  );
}
