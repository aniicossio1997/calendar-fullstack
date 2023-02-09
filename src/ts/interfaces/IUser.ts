export interface IUSerSimple {
  id: string;
  name: string;
}
export interface IUserRevalidate {
  id: string;
  email: string;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
}
export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserRegister {
  email: string;
  name: string;
  password: string;
}
export interface IBadRequestUser {
  ok: boolean;
  msg: string;
}
