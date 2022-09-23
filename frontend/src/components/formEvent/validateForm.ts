import moment from "moment";
import * as Yup from "yup";
import { IEventsReducer } from "../../features/calendar/calendarSlice";
import { IEvent } from "../../ts/interfaces/IEvents";

export type TValuesName = "title" | "start" | "end" | "description";
export enum EValuesName {
  title,
  start,
  end,
  description,
}
const dateMin = () => moment().add(1, "hour");
export const initialValuesCalendar = {
  id: "",
  title: "",
  description: "",
  start: null,
  end: null,
  user: { id: "", name: "", email: "" },
};

export const CalendarFormSchema = Yup.object()
  .shape({
    start: Yup.date()
      .required("La fecha de inicio es requerido")
      .nullable()
      .min(
        dateMin(),
        `La fecha y hora debe ser superior al  ${dateMin().format(
          "DD/MM h:mm a"
        )} `
      ),
    end: Yup.date()
      .required("La fecha de fin es requerido")
      .nullable()
      .min(
        dateMin(),
        `La fecha y hora debe ser superior al  ${dateMin().format(
          "DD/MM h:mm a"
        )} `
      ),

    title: Yup.string().required("El titulo es requerido"),
  })
  .test({
    name: "form date validate",
    test: (parent, { createError }) => {
      let isValid = true;
      // Object.keys(parent).forEach((key) => {
      //   console.log(parent["start"]);
      //   //if (parent[key]) isValid = true;
      // });
      if (!moment(parent["end"]).isSameOrAfter(parent["start"])) {
        isValid = false;
      }

      if (!isValid) {
        return createError({
          path: "end",
          message: "La fecha Fin debe ser superior o igual a la fecha fin",
        });
        // I don't know what to put for path if it's a whole form validation,
        // at least one field has to be valid to submit. however it doesn't
        // throw an error when all is empty
        // name 2 has to be touched/focused for this error to be thrown
        // when all is empty
      }
      return true;
    },
  });
