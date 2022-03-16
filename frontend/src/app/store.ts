import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import calendarModalReducer from "../features/modal/calendarModalSlice";
import counterReducer from "../features/counter/counterSlice";
import eventsCalendar from "../features/calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modalRedux: calendarModalReducer,
    eventsCalendar: eventsCalendar,
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
