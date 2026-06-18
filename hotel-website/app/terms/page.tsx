import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms & Conditions | UK's Resort Khopoli",
  description:
    "Review the terms, cancellation policies, and reservation guidelines for UK's Resort Khopoli.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#f7f3ec] py-16 sm:py-20 md:py-24">
      <Container size="content">
        <div className="mx-auto max-w-3xl">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.38em] text-[#c67a3a]">
            Policies
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.96] text-[#1f3c44]">
            Terms &amp; Conditions
          </h1>

          <div className="mt-10 space-y-8 text-[1rem] leading-8 text-[#1f3c44]/75">
            <section>
              <h2 className="mb-3 font-serif text-xl font-bold text-[#1f3c44]">
                Mandatory Requirements
              </h2>
              <p>
                All foreign nationals need to carry a valid Passport, Visa / work permit and
                need to present it at the time of arrival which will be checked and verified
                by the relevant authorities.
              </p>
              <p className="mt-3">
                All Indian nationals have to present a Photo Identification proof and address
                details at the time of arrival.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl font-bold text-[#1f3c44]">
                Cancellation Policy &amp; Modification Policy
              </h2>
              <p>
                Cancellations / Modification by customers made more than 15 days before stay
                date will not incur cancellation charges.
              </p>
              <p className="mt-3">
                Cancellations / Modification within 7 to 15 days of stay date will incur a
                50% cancellation fee.
              </p>
              <p className="mt-3">
                Cancellations / Modification within 0 to 7 days will incur a 100% cancellation
                fee.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl font-bold text-[#1f3c44]">
                PETS ARE NOT ALLOWED IN THE RESORT
              </h2>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl font-bold text-[#1f3c44]">
                Reservation Policies and Guidelines
              </h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>Specific food request should be made at least 24 hrs prior to the date of arrival</li>
                <li>Taxes will be applicable as per Government regulations</li>
                <li>All major credit cards are accepted</li>
                <li>We do not accept personal cheques</li>
                <li>Right of admission reserved with management</li>
                <li>50% advance to be paid at time of booking</li>
                <li>Balance should be paid before 08 days from arrival date</li>
                <li>Swimming Costumes are compulsory to enter the swimming pool &amp; water Park</li>
                <li>Outside eatables &amp; beverages are not allowed</li>
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
