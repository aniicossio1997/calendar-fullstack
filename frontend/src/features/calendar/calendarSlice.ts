import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import moment from "moment";
import { useAppDispatch } from "../../app/hooks";
import { IEvensCalendar, IEvents } from "../../ts/interfaces/ICalendar";
import { IEvent, IEventBadRequest } from "../../ts/interfaces/IEvents";
import { showMessage } from "../ui/uiMessageSlice";
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
}
const initialState: ICalendar = {
  events: [],
  activeEvent: null,
  isShowBtnDeleted: false,
  message: {
    isShow: false,
    description: "",
  },
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
      .addCase(retriveEventsOfUser.rejected, (state, action) => {})
      .addCase(saveEventsOfUser.pending, (state, action) => {})
      .addCase(
        saveEventsOfUser.fulfilled,
        (state, action: PayloadAction<IEvent>) => {
          const eventNew = action.payload;
          state.events = [...state.events, { ...action.payload }];
        }
      )
      .addCase(saveEventsOfUser.rejected, (state, action) => {})
      .addCase(deleteAnUserEvent.fulfilled, (state, action) => {
        if (action.meta.requestStatus === "fulfilled" && action.payload) {
          state.events = state.events.filter(
            (event) => event.id !== state.activeEvent?.id
          );

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
} = calendarSlice.actions;

export default calendarSlice.reducer;
