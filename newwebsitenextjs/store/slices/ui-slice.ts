import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  activeSection: string;
  cursorExpanded: boolean;
};

const initialState: UIState = {
  activeSection: "home",
  cursorExpanded: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setCursorExpanded: (state, action: PayloadAction<boolean>) => {
      state.cursorExpanded = action.payload;
    },
  },
});

export const { setActiveSection, setCursorExpanded } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
