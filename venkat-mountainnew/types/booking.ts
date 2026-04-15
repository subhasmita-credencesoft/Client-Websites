export type Booking = {
  id: string;
  roomId: string;
  guestName: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "pending" | "confirmed" | "cancelled";
};
