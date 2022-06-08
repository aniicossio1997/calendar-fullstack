import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import calendarModalReducer from "../features/modal/calendarModalSlice";
import eventsCalendar from "../features/calendar/calendarSlice";
import authSlice from "../features/auth/authSlice";
import uiMessageSlice from "../features/ui/uiMessageSlice";

export const store = configureStore({
  reducer: {
    modalRedux: calendarModalReducer,
    eventsCalendar: eventsCalendar,
    authState: authSlice,
    uiMessage: uiMessageSlice,
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
