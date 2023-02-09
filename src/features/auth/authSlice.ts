import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../services/methodHttp";
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
  loading:boolean
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
  loading:true

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state: IStateInitial) {
      LocalStorageService.setItem("isLogin", false);
      localStorage.clear();
      state.isLogin = false;
      state.user = {
        name: "",
        email: "",
        id: "",
      };
    },
    startLoadingAuthMe(state: IStateInitial){
      state.loading=true
    },
    finishLoadingAuthMe(state: IStateInitial){
      state.loading=false
    },
    resetMessage(state: IStateInitial) {
      state.messages = initailMsg;
    },
    resetDataUser(state:IStateInitial, action ){
      LocalStorageService.setItem("isLogin", true);
      state.isLogin=true;
      state.user=action.payload

    }
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
        LocalStorageService.setItem("isLogin", true);

        state.isLogin = true;
      })
      .addCase(authLogin.rejected, (state, { error }) => {
        state.status = "failed";
        state.isLogin = false;
        LocalStorageService.setItem("isLogin", false);
        state.messages = {
          type: "error",
          show: true,
          description: "No se encontro un usuario con esas coracteristicas",
        };
      })
      //authMe
     
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

export const { logout,resetDataUser,startLoadingAuthMe} = authSlice.actions;

export default authSlice.reducer;
