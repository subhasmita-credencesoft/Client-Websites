import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";

export default function BookingForm() {
  return (
    <form className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:grid-cols-[1.2fr_1.2fr_1fr_1fr_auto]">
      <Input label="Check in" name="checkIn" type="date" />
      <Input label="Check out" name="checkOut" type="date" />
      <Select
        label="Guests"
        name="guests"
        options={[
          { label: "1 Guest", value: "1" },
          { label: "2 Guests", value: "2" },
          { label: "3 Guests", value: "3" },
          { label: "4 Guests", value: "4" },
        ]}
      />
      <Select
        label="Room"
        name="room"
        options={[
          { label: "Any", value: "any" },
          { label: "Suite", value: "suite" },
          { label: "Deluxe", value: "deluxe" },
        ]}
      />
      <div className="flex items-end">
        <Button type="submit" className="w-full">
          Check availability
        </Button>
      </div>
    </form>
  );
}
