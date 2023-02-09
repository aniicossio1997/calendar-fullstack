import { IUSerSimple } from "./IUser";

export interface IEvensCalendar {
  user: IUSerSimple;
  title: string;
  description: string;
  start: Date;
  end: Date | null;
}
export interface IEvents {
  user: IUSerSimple;
  title: string;
  description: string;
  start: Date;
  end: Date | null;
}

export interface IEventPOST {
  title: string;
  description?: string;
  start: Date;
  end: Date;
  user_id: string;
}
export interface IEventPUT {
  title: string;
  description: string;
  start: Date;
  end: Date;
}
