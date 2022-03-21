import { IUser } from "./IUser";

export interface IGetAllSuccess {
  ok: boolean;
  msg: string;
  events: IEvent[];
}

export interface IEvent {
  id?: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  user: IUser;
}

export interface IEventShort {
  title: string;
  description: string;
  start: Date;
  end: Date;
  id: string;
}

export interface IEventSave {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  user_id?: string;
}

export interface IEventRequestSuccess {
  ok: boolean;
  msg: string;
  event: IEventSave;
}
export interface IEventBadRequest {
  ok: boolean;
  errors?: IErrorsRequest;
  msg?: string;
}
export interface IErrorsRequest {
  title: IErrorCampo;
  start: IErrorCampo;
  end: IErrorCampo;
}

export interface IErrorCampo {
  msg: string;
  param: string;
  location: string;
}
