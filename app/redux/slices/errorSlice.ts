import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorSlice {
  value: string;
}

const initialState: ErrorSlice = {
  value: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
        state.value = action.payload
    },
    clearError: (state) => {
        state.value = ""
    }
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
