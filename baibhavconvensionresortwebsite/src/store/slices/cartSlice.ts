import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  tourSlug: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const existing = state.items.find((item) => item.tourSlug === action.payload);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ tourSlug: action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.tourSlug !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;
