import { lazy } from "react";
import { IRoute } from "../ts/interfaces/IRoute";

const LazyLogin = lazy(
  () => import(/* webpackChunkName: "Login" */ "../pages/Login")
);

const LazyRegister = lazy(
  () => import(/* webpackChunkName: "Pojects" */ "../pages/Register")
);

export const publicDataRoutes: IRoute[] = [
  {
    to: "/login",
    path: "login",
    Component: LazyLogin,
    name: "LOGIN",
  },
  {
    to: "/register",
    path: "register",
    Component: LazyRegister,
    name: "REGISTER",
  },
];
