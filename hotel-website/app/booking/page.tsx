import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import BookingForm from "../../components/features/BookingForm";

export default function BookingPage() {
  return (
    <section className="py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeading
            eyebrow="Booking"
            title="Reserve your stay"
            subtitle="Complete the form and our concierge will confirm availability."
          />
          <BookingForm />
        </div>
        <aside className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
          <h3 className="font-serif text-xl">What is included</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink/70">
            <li>Daily breakfast for two</li>
            <li>Welcome minibar</li>
            <li>Evening wellness ritual</li>
            <li>Flexible cancellation up to 48 hours</li>
          </ul>
        </aside>
      </Container>
    </section>
  );
}
