import { ComponentWithAs, Input, InputProps, Textarea } from "@chakra-ui/react";
import InputCustom from "../form/inputCustomEvent/InputCustom";

interface IDataForm {
  name: string;
  type: string;
  label: string;
  Component: typeof Input;
}
export const dataFormPrivate: IDataForm[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    Component: InputCustom,
  },
  {
    name: "email",
    type: "text",
    label: "Email",
    Component: InputCustom,
  },
];
