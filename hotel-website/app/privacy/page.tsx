import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | UK's Resort Khopoli",
  description:
    "UK's Resort respects the privacy of all our guests. Read our privacy policy to understand how we handle your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#f7f3ec] py-16 sm:py-20 md:py-24">
      <Container size="content">
        <div className="mx-auto max-w-3xl">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.38em] text-[#c67a3a]">
            Privacy
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.96] text-[#1f3c44]">
            Privacy Policy
          </h1>

          <div className="mt-10 space-y-6 text-[1rem] leading-8 text-[#1f3c44]/75">
            <p>
              UK&apos;s Resort<sup>&reg;</sup> respects the privacy of all our guests, and we are
              committed to protecting it. To best serve you throughout this Web site, you may
              be asked to provide a variety of information, such as name, mailing address,
              telephone number, email address, credit card information, etc. This information
              will allow us to provide a personalized experience for each visitor to our Web
              site.
            </p>
            <p>
              This Web site does not collect, save or store any personal information from
              visitors that simply browse this Web site, unless you voluntarily and
              intentionally provide it to us. We do not collect personal information without
              your knowledge or consent. Any personal information that is requested on our Web
              site is necessary in order to process your reservation.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
