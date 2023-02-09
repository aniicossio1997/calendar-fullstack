import { IUser } from "./IUser";

export interface IAuthResult {
  ok: boolean;
  user: IUser;
  token: string;
}
export interface IBadRequest {
  ok: boolean;
  errors: {
    msg: string;
  };
}
export interface IAuthMeResult{
  ok: boolean,
  msg: string,
  user: IUser;
}
