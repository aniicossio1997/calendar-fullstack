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
    try {
      const response = await eventsWithToken.post<IEventRequestSuccess>(
        event.user_id as string,
        event
      );
      return (await response.data.event) as IEvent;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IEventBadRequest>;
        if (serverError && serverError.response) {
          console.log(serverError.response.data);
          return rejectWithValue(serverError.response.data);
        }
      }
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

export const deleteAnUserEvent = createAsyncThunk(
  "delete/users/user_id/events/id",
  async (
    { userId, idEvent }: { userId: string; idEvent: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await eventsWithToken.delete<IEventRequestSuccess>(
        userId,
        idEvent
      );
      return response.data.event;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IEventBadRequest>;
        if (serverError && serverError.response) {
          console.log(serverError.response.data);
          return rejectWithValue(serverError.response.data);
        }
      }
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

export const updateAnUserEvent = createAsyncThunk(
  "put/users/user_id/events/id",
  async (event: IEvent, { rejectWithValue }) => {
    try {
      const response = await eventsWithToken.put<IEventRequestSuccess>(
        String(event.user),
        String(event.id),
        event
      );
      return response.data.event;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBadRequest>;
        if (serverError && serverError.response) {
          return rejectWithValue(serverError.response.data);
        }
      }
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);
