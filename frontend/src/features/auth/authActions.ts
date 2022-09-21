import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { loginAPI } from "../../services/methodHttp";
import { IAuthResult, IBadRequest } from "../../ts/interfaces/IAuth";
import { IUserLogin, IUserRegister } from "../../ts/interfaces/IUser";

export const authLogin = createAsyncThunk(
  "auth/login",
  // if you type your function argument here
  async (userLogin: IUserLogin) => {
    const response = await loginAPI.login(userLogin);
    const data = response.data as IAuthResult;
    return data;
    // window.location.href = "/";
    // return data;
  }
);
export const authMe = createAsyncThunk(
  "auth/me",
  // if you type your function argument here
  async () => {
    const res = await loginAPI.me();
    return (await res.data) as IAuthResult;
  }
);
export const userRegister = createAsyncThunk(
  "user/register",
  // if you type your function argument here
  async (dataUserRegister: IUserRegister, { rejectWithValue }) => {
    try {
      const res = await loginAPI.register<IAuthResult>(dataUserRegister);
      return (await res.data) as IAuthResult;
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
