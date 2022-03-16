import moment from "moment";
import * as Yup from "yup";
import { IEventsReducer } from "../../features/calendar/calendarSlice";

export const nowDate = moment().minutes(0).seconds(0).add(1, "hours");
export const endNowDate = nowDate.clone().add(1, "hours");

export type TValuesName = "title" | "dateStart" | "dateEnd" | "notes";
export enum EValuesName {
  title,
  dateStart,
  dateEnd,
  notes,
}

export const initialValuesCalendar: IEventsReducer = {
  id: "",
  title: "",
  notes: "",
  dateStart: nowDate.toDate(),
  dateEnd: endNowDate.toDate(),
  user: { id: "", name: "" },
};

export const CalendarFormSchema = Yup.object().shape({
  dateStart: Yup.date()
    .nullable()
    .required("La fecha de inicio es requerido")
    .min(
      nowDate,
      `La fecha y hora debe ser superior al  ${nowDate.format("DD/MM h:mm a")} `
    ),
  dateEnd: Yup.date()
    .nullable()
    .required("La fecha de fin es requerido")
    .min(
      endNowDate,
      `La fecha y hora debe ser superior al  ${endNowDate.format(
        "DD/MM h:mm a"
      )} `
    ),
  title: Yup.string().required("El titulo es requerido"),
});
// .test({
//   name: "date",
//   test: function (values) {
//     const { dateStart, dateEnd } = this.parent;
//     const startMoment = moment(dateStart);
//     const endMoment = moment(dateEnd);
//     const isValid = !startMoment.isSameOrAfter(endMoment);
//     if (isValid) return true;
//     return this.createError({
//       path: "field1 | field2",
//       message: "One field must be set",
//     });
//   },
// });
