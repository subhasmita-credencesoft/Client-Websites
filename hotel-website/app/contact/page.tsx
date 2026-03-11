import ContactHero from "../../components/sections/ContactHero";
import ContactStory from "../../components/sections/ContactStory";
import ContactWhyUs from "../../components/sections/ContactWhyUs";
import ContactHighlights from "../../components/sections/ContactHighlights";
import ContactTestimonials from "../../components/sections/ContactTestimonials";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactStory />
      <ContactWhyUs />
      <ContactHighlights />
      <ContactTestimonials />
      {/* <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="We are here to tailor your stay."
              subtitle="Share your travel dates and preferences. Our team responds within 24 hours."
            />
            <div className="space-y-3 text-sm text-ink/70">
              <p>Seaside Avenue 204, Goa</p>
              <p>reservations@amoja.com</p>
              <p>+91 90000 12345</p>
            </div>
          </div>
          <form className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
            <div className="grid gap-4">
              <Input label="Full name" name="name" />
              <Input label="Email" name="email" type="email" />
              <Textarea label="Message" name="message" placeholder="Tell us about your stay..." />
              <Button type="submit">Send inquiry</Button>
            </div>
          </form>
        </Container>
      </section> */}
    </>
  );
}
