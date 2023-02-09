import { lazy } from "react";
import { Login, Register } from "../pages";
import { IRoute } from "../ts/interfaces/IRoute";

// const LazyLogin = lazy(
//   () => import(/* webpackChunkName: "Login" */ "../pages/Login")
// );

// const LazyRegister = lazy(
//   () => import(/* webpackChunkName: "Pojects" */ "../pages/Register")
// );

export const publicDataRoutes: IRoute[] = [
  {
    to: "/login",
    path: "login",
    Component: Login,
    name: "LOGIN",
  },
  {
    to: "/register",
    path: "register",
    Component: Register,
    name: "REGISTER",
  },
];
