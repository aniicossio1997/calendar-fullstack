import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvensCalendar } from "../../ts/interfaces/ICalendar";
import { IEvent } from "../../ts/interfaces/IEvents";
import {
  deleteAnUserEvent,
  retriveEventsOfUser,
  saveEventsOfUser,
  updateAnUserEvent,
} from "./eventsActions";

export interface IEventsReducer extends IEvensCalendar {
  id: string;
}
export interface ICalendar {
  activeEvent: null | IEvent;
  events: IEvent[];
  isShowBtnDeleted: boolean;
  message: {
    isShow: boolean;
    description: string;
    type?: "success" | "error" | null;
  };
  isModified: boolean;
}
const initialState: ICalendar = {
  events: [],
  activeEvent: null,
  isShowBtnDeleted: false,
  message: {
    isShow: false,
    description: "",
  },
  isModified: false,
};
const calendarSlice = createSlice({
  name: "eventsCalendar",
  initialState,
  reducers: {
    eventActiveChangedToNull(state) {
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
    eventsClear(state) {
      state.events = [] as IEvent[];
    },
    resetIsModified(state) {
      state.isModified = false;
    },
  },
  extraReducers: (builder) => {
    builder //authMe
      .addCase(retriveEventsOfUser.pending, (state, action) => {})
      .addCase(
        retriveEventsOfUser.fulfilled,
        (state, action: PayloadAction<IEvent[]>) => {
          state.events = action.payload;
          state.isModified = true;
        }
      )
      .addCase(retriveEventsOfUser.rejected, (state, action) => {})
      .addCase(saveEventsOfUser.pending, (state, action) => {})
      .addCase(
        saveEventsOfUser.fulfilled,
        (state, action: PayloadAction<IEvent>) => {
          const eventNew = action.payload;
          state.events = [...state.events, { ...action.payload }];
          state.isModified = true;
        }
      )
      .addCase(saveEventsOfUser.rejected, (state, action) => {})
      .addCase(deleteAnUserEvent.fulfilled, (state, action) => {
        if (action.meta.requestStatus === "fulfilled" && action.payload) {
          state.events = state.events.filter(
            (event) => event.id !== state.activeEvent?.id
          );
          state.isModified = true;
          state.activeEvent = null;
        }
      })
      .addCase(deleteAnUserEvent.rejected, (state, action) => {})
      .addCase(updateAnUserEvent.pending, (state, action) => {})
      .addCase(updateAnUserEvent.fulfilled, (state, action) => {
        if (action.meta.requestStatus === "fulfilled" && action.payload) {
          state.events = state.events.map((event) =>
            event.id == action.payload.id ? action.payload : event
          );
          state.isModified = true;
        }
      });
  },
});

export const {
  eventAddNew,
  eventSetActive,
  eventUpdated,
  eventActiveChangedToNull,
  eventDeleted,
  eventsClear,
  resetIsModified,
} = calendarSlice.actions;

export default calendarSlice.reducer;
