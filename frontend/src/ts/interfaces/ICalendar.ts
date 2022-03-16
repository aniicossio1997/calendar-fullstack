import { IUSerSimple } from "./IUser";

export interface IEvensCalendar {
  user: IUSerSimple;
  bgColor?: string;
  title: string;
  notes: string;
  dateStart: Date;
  dateEnd: Date | null;
}
export interface IEvents {
  user: IUSerSimple;
  bgColor?: string;
  title: string;
  notes: string;
  dateStart: Date;
  dateEnd: Date | null;
}
