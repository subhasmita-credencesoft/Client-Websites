import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './slices/bookingSlice';
import cartReducer from './slices/cartSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      booking: bookingReducer,
      cart: cartReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
