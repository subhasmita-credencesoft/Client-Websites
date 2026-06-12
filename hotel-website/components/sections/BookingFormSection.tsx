import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import BookingForm from "../features/BookingForm";

export default function BookingFormSection() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Reservation"
          title="Plan your arrival with flexible booking."
          subtitle="Search availability across our room and pick the stay that matches your rhythm."
        />
        <BookingForm />
      </Container>
    </section>
  );
}
