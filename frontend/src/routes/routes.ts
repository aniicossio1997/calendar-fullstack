import { lazy } from "react";
import { IRoute } from "../ts/interfaces/IRoute";

const LazyLogin = lazy(
  () => import(/* webpackChunkName: "Login" */ "../pages/Login")
);
const LazyCalendary = lazy(
  () =>
    import(/* webpackChunkName: "Home" */ "../pages/calendar/CalendarScreen")
);
const LazyRegister = lazy(
  () => import(/* webpackChunkName: "Pojects" */ "../pages/Register")
);

export const dataRoutes: IRoute[] = [
  {
    to: "/",
    path: "",
    Component: LazyCalendary,
    name: "HOME",
  },
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
