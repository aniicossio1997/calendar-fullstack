import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { eventsWithToken } from "../../services/methodHttp";
import { IBadRequest } from "../../ts/interfaces/IAuth";
import {
  IGetAllSuccess,
  IEvent,
  IEventSave,
  IEventRequestSuccess,
  IEventBadRequest,
} from "../../ts/interfaces/IEvents";
import { IEventsReducer } from "./calendarSlice";

export const retriveEventsOfUser = createAsyncThunk(
  "get/users/user_id/events",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await eventsWithToken.getAll<IGetAllSuccess>(userId);
      return response.data.events;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBadRequest>;
        if (serverError && serverError.response) {
          console.log(serverError.response.data);
          return rejectWithValue(serverError.response.data);
        }
      }
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);
export const saveEventsOfUser = createAsyncThunk(
  "post/users/user_id/events",
  async (event: IEventSave, { rejectWithValue }) => {
    const response = await eventsWithToken.post<IEventRequestSuccess>(
      event.user_id as string,
      event
    );
    return (await response.data.event) as IEvent;
  }
);
