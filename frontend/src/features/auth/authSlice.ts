import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageService } from "../../services/ServiceLocalStore";
import { IAuthResult, IBadRequest } from "../../ts/interfaces/IAuth";
import { IBadRequestUser, IUser } from "../../ts/interfaces/IUser";
import { authLogin, authMe, userRegister } from "./authActions";
type statusAuth = "idle" | "pending" | "succeeded" | "failed";
interface IMessage {
  type: "error" | "success" | "warning" | "info" | undefined;
  description: string;
  show: boolean;
}
const initailMsg: IMessage = {
  type: undefined,
  description: "",
  show: false,
};
interface IStateInitial {
  status: statusAuth;
  user: IUser;
  isLogin: boolean;
  messages: IMessage;
}
const initialState: IStateInitial = {
  status: "idle",
  user: {
    email: "",
    id: "",
    name: "",
  },
  isLogin: false,
  messages: initailMsg,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state: IStateInitial) {
      localStorage.clear();
      state.isLogin = false;
      state.user = {
        name: "",
        email: "",
        id: "",
      };
    },
    resetMessage(state: IStateInitial) {
      state.messages = initailMsg;
    },
  },
  extraReducers: (builder) => {
    builder
      //auth/login
      .addCase(authLogin.pending, (state, action) => {
        state.status = "pending";
        state.messages = {} as IMessage;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        LocalStorageService.setItem("token", action.payload.token);
        LocalStorageService.setItem(
          "token-init-date",
          new Date().getTime().toString()
        );

        state.isLogin = true;
      })
      .addCase(authLogin.rejected, (state, { error }) => {
        state.status = "failed";
        state.isLogin = false;
        state.messages = {
          type: "error",
          show: true,
          description: "No se encontro un usuario con esas coracteristicas",
        };
      })
      //authMe
      .addCase(authMe.pending, (state, action) => {
        state.status = "pending";
        state.messages = {} as IMessage;
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLogin = true;
        state.user = (action.payload as IAuthResult).user;
      })
      .addCase(authMe.rejected, (state, action) => {
        state.status = "failed";
        state.user = { email: "", id: "", name: "" };
        state.isLogin = false;
      })
      //register
      .addCase(userRegister.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        if (action.meta.requestStatus === "fulfilled") {
          state.status = "succeeded";
          state.isLogin = false;
          state.user = { email: "", id: "", name: "" };
          state.messages.description =
            "Se registro el usuario, usted ya puede loguearse";
          state.messages.show = true;
          state.messages.type = "success";
        }
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "succeeded";
        state.isLogin = false;
        state.user = { email: "", id: "", name: "" };
        state.messages = {
          type: "error",
          show: true,
          description: (action.payload as IBadRequestUser).msg,
        };
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
