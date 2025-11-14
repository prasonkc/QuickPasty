import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionData {
  userId?: number;
  username?: string;
  token?: string;
  [key: string]: string | number | undefined;
}

interface SessionState {
  value: SessionData | null;
}

const initialState: SessionState = {
  value: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionData>) => {
      state.value = action.payload;
    },
    clearSession: (state) => {
      state.value = null;
    },
    updateSessionKey: (
      state,
      action: PayloadAction<{ key: string; value: string | number }>
    ) => {
      if (state.value) {
        state.value[action.payload.key] = action.payload.value;
      }
    },
  },
});

export const { setSession, clearSession, updateSessionKey } =
  sessionSlice.actions;

export default sessionSlice.reducer;
