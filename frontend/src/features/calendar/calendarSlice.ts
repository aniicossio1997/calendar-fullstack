import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import moment from "moment";
import { IEvensCalendar, IEvents } from "../../ts/interfaces/ICalendar";
import { IEvent } from "../../ts/interfaces/IEvents";
import { retriveEventsOfUser, saveEventsOfUser } from "./eventsActions";

export interface IEventsReducer extends IEvensCalendar {
  id: string;
}
export interface ICalendar {
  activeEvent: null | IEvent;
  events: IEvent[];
  isShowBtnDeleted: boolean;
}
const nowDate = moment().minutes(0).seconds(0).add(1, "hours");
const endNowDate = nowDate.clone().add(1, "hours");
const initialState: ICalendar = {
  events: [],
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
    },
    eventSetActive(state, action: PayloadAction<IEvent>) {
      state.activeEvent = action.payload;
    },
    eventAddNew(state, action: PayloadAction<IEvent>) {
      state.events = [...state.events, { ...action.payload }];
    },
    eventUpdated(state, action: PayloadAction<IEvent>) {
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
  extraReducers: (builder) => {
    builder //authMe
      .addCase(retriveEventsOfUser.pending, (state, action) => {})
      .addCase(
        retriveEventsOfUser.fulfilled,
        (state, action: PayloadAction<IEvent[]>) => {
          state.events = action.payload;
        }
      )
      .addCase(retriveEventsOfUser.rejected, (state, action) => {
        console.log("get events in reducers", action.meta);
      })
      .addCase(saveEventsOfUser.pending, (state, action) => {})
      .addCase(saveEventsOfUser.fulfilled, (state, action) => {
        console.log("fulfilled", action.meta);
        console.log(action.payload);
        if (action.meta.requestStatus == "fulfilled") {
          const eventNew = action.payload;
          state.events = [...state.events, { ...action.payload }];
        }
      })
      .addCase(saveEventsOfUser.rejected, (state, action) => {
        console.log("rejected");
      });
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
