import * as Yup from "yup";

export interface IValuesLogin {
  email: string;
  password: string;
}
export type IValuesRegister = {
  name: string;
  email: string;
  password: string;
  repitPassword: string;
};
export const initialValuesLogin: IValuesLogin = {
  email: "",
  password: "",
};
export const initialValuesRegister: IValuesRegister = {
  name: "",
  email: "",
  password: "",
  repitPassword: "",
};
export const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too short").required("Name is required"),
  password: Yup.string()
    .min(4, "Too short")
    .max(100, "Sorry, Too Long")
    .required("Password is required"),
  repitPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});
