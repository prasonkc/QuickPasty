import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActivePasteIDSlice {
  value: string;
}

const initialState: ActivePasteIDSlice = {
  value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
};

const ActivePasteIDSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setActivePasteID: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setActivePasteID } = ActivePasteIDSlice.actions;
export default ActivePasteIDSlice.reducer;
