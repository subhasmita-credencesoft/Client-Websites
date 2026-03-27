import { AwardsSection } from "@/components/features/shared/sections/awards-section";
import { PartnerLogosSection } from "@/components/features/shared/sections/partner-logos-section";
import { ReservationSection } from "@/components/features/shared/sections/reservation-section";
import { TownshipsSection } from "@/components/features/shared/sections/townships-section";

type GlobalPageSectionsProps = {
  hideContactAndStay?: boolean;
  hideReservation?: boolean;
};

export function GlobalPageSections({ hideContactAndStay = false, hideReservation = false }: GlobalPageSectionsProps) {
  return (
    <>
      {hideContactAndStay ? null : <PartnerLogosSection />}
      {hideContactAndStay ? null : <TownshipsSection />}
      <AwardsSection />
      {hideReservation ? null : <ReservationSection />}
    </>
  );
}
