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
      state.value.push(action.payload);
    },
    setPastes: (state, action: PayloadAction<Paste[]>) => {
      state.value = action.payload;
    },
    deletePaste: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(
        (paste) => paste.paste_id !== action.payload
      );
    },
    updatePaste: (
      state,
      action: PayloadAction<{ id: string; updatedFields: Partial<Paste> }>
    ) => {
      const { id, updatedFields } = action.payload;
      const index = state.value.findIndex((p) => p.paste_id === id);
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...updatedFields };
      }
    },
  },
});

export const { addPaste, setPastes, deletePaste, updatePaste } = pasteSlice.actions;
export default pasteSlice.reducer;
