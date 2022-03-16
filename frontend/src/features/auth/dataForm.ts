import { ComponentWithAs, Input, InputProps, Textarea } from "@chakra-ui/react";
import PasswordShowHide from "../../components/form/PasswordShowHide";

interface IDataForm {
  name: string;
  type: string;
  label: string;
  Component: typeof Input;
}
export const dataRegister: IDataForm[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    Component: Input,
  },
  {
    name: "email",
    type: "text",
    label: "Email",
    Component: Input,
  },
  {
    name: "password",
    type: "text",
    label: "Password",
    Component: PasswordShowHide,
  },
  {
    name: "repitPassword",
    type: "text",
    label: "repit Password",
    Component: PasswordShowHide,
  },
];

export const dataLogin: IDataForm[] = [
  {
    name: "email",
    type: "text",
    label: "Email",
    Component: Input,
  },
  {
    name: "password",
    type: "text",
    label: "Password",
    Component: PasswordShowHide,
  },
];
