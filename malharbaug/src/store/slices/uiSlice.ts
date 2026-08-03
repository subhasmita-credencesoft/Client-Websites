import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  isDrawerOpen: boolean;
  isDrawerRendered: boolean;
  isServicesDropdownOpen: boolean;
  isScrolled: boolean;
}

const initialState: UiState = {
  isDrawerOpen: false,
  isDrawerRendered: false,
  isServicesDropdownOpen: false,
  isScrolled: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isDrawerRendered = true;
      // isDrawerOpen flips true on next frame from the component,
      // via requestAnimationFrame, to trigger the slide-in transition.
    },
    setDrawerOpen: (state, action: { payload: boolean }) => {
      state.isDrawerOpen = action.payload;
    },
    setDrawerRendered: (state, action: { payload: boolean }) => {
      state.isDrawerRendered = action.payload;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
      // isDrawerRendered is cleared via setTimeout in the component
      // after the slide-out transition completes.
    },
    setServicesDropdownOpen: (state, action: { payload: boolean }) => {
      state.isServicesDropdownOpen = action.payload;
    },
    setScrolled: (state, action: { payload: boolean }) => {
      state.isScrolled = action.payload;
    },
  },
});

export const {
  openDrawer,
  setDrawerOpen,
  setDrawerRendered,
  closeDrawer,
  setServicesDropdownOpen,
  setScrolled,
} = uiSlice.actions;
export default uiSlice.reducer;
