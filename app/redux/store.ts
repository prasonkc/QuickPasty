import { configureStore } from "@reduxjs/toolkit";
import counter from "./slices/counterSlice"
import pastes from "./slices/pastesSlice"
import activePasteID from "./slices/activePasteIDSlice";

export const store = configureStore({
  reducer: {
    counter,
    pastes,
    activePasteID
},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
