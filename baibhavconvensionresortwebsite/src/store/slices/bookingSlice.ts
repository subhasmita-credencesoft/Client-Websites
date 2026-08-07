import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingSearchState } from '@/types';

const initialState: BookingSearchState = {
  location: '',
  checkIn: '',
  checkOut: '',
  guests: 2,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setDates(state, action: PayloadAction<{ checkIn: string; checkOut: string }>) {
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
    },
    setGuests(state, action: PayloadAction<number>) {
      state.guests = Math.max(1, action.payload);
    },
    resetSearch() {
      return initialState;
    },
  },
});

export const { setLocation, setDates, setGuests, resetSearch } = bookingSlice.actions;
export default bookingSlice.reducer;
