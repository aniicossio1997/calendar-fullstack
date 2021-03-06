import { Input, Textarea } from "@chakra-ui/react";
import TextareaCumtom from "../form/TextareaCumtom";
import { TValuesName } from "./validateCalendar";

interface IDataForm {
  name: TValuesName;
  type: string;
  label: string;
  Component: typeof Input | typeof Textarea;
  isRequired: boolean;
}
export const dataFormCalendar: IDataForm[] = [
  {
    name: "title",
    type: "input",
    label: "Titulo",
    Component: Input,
    isRequired: true,
  },
  {
    name: "description",
    type: "textarea",
    label: "Descripción",
    Component: TextareaCumtom,
    isRequired: false,
  },
];
