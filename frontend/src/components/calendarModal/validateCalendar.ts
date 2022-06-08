import moment from "moment";
import * as Yup from "yup";
import { IEventsReducer } from "../../features/calendar/calendarSlice";
import { IEvent } from "../../ts/interfaces/IEvents";

const nowDate = moment().minutes(0).seconds(0).add(1, "hours");
const endNowDate = nowDate.clone().add(1, "hours");
export type TValuesName = "title" | "start" | "end" | "description";
export enum EValuesName {
  title,
  start,
  end,
  description,
}
const date = moment().add(1, "hour");
export const initialValuesCalendar = {
  id: "",
  title: "",
  description: "",
  start: null,
  end: null,
  user: { id: "", name: "", email: "" },
};

export const CalendarFormSchema = Yup.object().shape({
  start: Yup.date().nullable().required("La fecha de inicio es requerido"),
  // .min(
  //   nowDate,
  //   `La fecha y hora debe ser superior al  ${nowDate.format("DD/MM h:mm a")} `
  // )
  end: Yup.date().nullable().required("La fecha de fin es requerido"),
  // .min(
  //   endNowDate,
  //   `La fecha y hora debe ser superior al  ${endNowDate.format(
  //     "DD/MM h:mm a"
  //   )} `
  // )
  title: Yup.string().required("El titulo es requerido"),
});
