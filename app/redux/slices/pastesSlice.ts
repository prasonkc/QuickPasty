import { Paste } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PastesState {
  value: Paste[];
}

const initialState: PastesState = {
  value: [],
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addPaste: (state, action: PayloadAction<Paste>) => {
      state.value.push(action.payload)
    },
    setPastes: (state, action: PayloadAction<Paste[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addPaste, setPastes } = pasteSlice.actions;
export default pasteSlice.reducer;
