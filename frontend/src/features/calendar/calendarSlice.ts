import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { IEvensCalendar } from "../../ts/interfaces/ICalendar";

export interface IEventsReducer extends IEvensCalendar {
  id: string;
}
export interface ICalendar {
  activeEvent: null | IEventsReducer;
  events: IEventsReducer[];
  isShowBtnDeleted: boolean;
}
const nowDate = moment().minutes(0).seconds(0).add(1, "hours");
const endNowDate = nowDate.clone().add(1, "hours");
const initialState: ICalendar = {
  events: [
    {
      id: "2",
      title: "Cumpleaños del jefe",
      dateStart: nowDate.toDate(),
      dateEnd: endNowDate.toDate(),
      notes: "comprar el pastel",
      user: {
        id: "123",
        name: "hann",
      },
    },
  ],
  activeEvent: null,
  isShowBtnDeleted: false,
};
const calendarSlice = createSlice({
  name: "eventsCalendar",
  initialState,
  reducers: {
    eventActiveChangedToNull(state) {
      console.log("estoy en el evento active ");
      state.activeEvent = null;
      console.log(state.activeEvent);
    },
    eventSetActive(state, action: PayloadAction<IEventsReducer>) {
      state.activeEvent = action.payload;
    },
    eventAddNew(state, action: PayloadAction<IEventsReducer>) {
      state.events = [...state.events, { ...action.payload }];
    },
    eventUpdated(state, action: PayloadAction<IEventsReducer>) {
      state.events = state.events.map((event) =>
        event.id == action.payload.id ? action.payload : event
      );
    },
    eventDeleted(state) {
      state.events = state.events.filter(
        (event) => event.id !== state.activeEvent?.id
      );
      state.activeEvent = null;
    },
  },
});
export const {
  eventAddNew,
  eventSetActive,
  eventUpdated,
  eventActiveChangedToNull,
  eventDeleted,
} = calendarSlice.actions;

export default calendarSlice.reducer;
