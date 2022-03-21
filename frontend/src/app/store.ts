import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import calendarModalReducer from "../features/modal/calendarModalSlice";
import eventsCalendar from "../features/calendar/calendarSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    modalRedux: calendarModalReducer,
    eventsCalendar: eventsCalendar,
    authState: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
