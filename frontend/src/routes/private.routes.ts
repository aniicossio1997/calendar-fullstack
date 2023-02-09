import { lazy } from "react";
import { IRoute } from "../ts/interfaces/IRoute";
import { IconType } from "react-icons";
import { BiCalendar, BiNotepad, BiUser, BiHome } from "react-icons/bi";
import { GrBladesVertical, GrGrid, GrUser } from "react-icons/gr";
import { IoListSharp } from "react-icons/io5";
import CalendarScreen from "../pages/calendar/CalendarScreen";
import EventsScreen from "../pages/private/EventsScreen";
import ProfileScreen from "../pages/private/ProfileScreen";
import HomeScreen from "../pages/private/HomeScreen";

// const LazyCalendary = lazy(
//   () =>
//     import(/* webpackChunkName: "Home" */ "../pages/calendar/CalendarScreen")
// );
// const LazyEvents = lazy(
//   () => import(/* webpackChunkName: "Home" */ "../pages/private/EventsScreen")
// );
// const LazyProfile = lazy(
//   () => import(/* webpackChunkName: "Home" */ "../pages/private/ProfileScreen")
// );

export interface IRouteWithIcon extends IRoute {
  icon: IconType;
}

export const privateDataRoutes: IRouteWithIcon[] = [
  {
    to: "/",
    path: "",
    icon: BiHome,
    Component: HomeScreen,
    name: "Home",
  },
  {
    to: "/calendar",
    path: "calendar",
    icon: BiCalendar,
    Component: CalendarScreen,
    name: "Calendario",
  },
  {
    to: "/events",
    path: "events",
    icon: BiNotepad,
    Component: EventsScreen,
    name: "Eventos",
  },
  {
    to: "/profile",
    path: "profile",
    icon: BiUser,
    Component: ProfileScreen,
    name: "Perfil",
  },
];

export const privateDataRouterExpress = privateDataRoutes.filter(
  (route) => route.to !== "/"
);
