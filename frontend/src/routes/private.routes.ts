import { lazy } from "react";
import { IRoute } from "../ts/interfaces/IRoute";
import { IconType } from "react-icons";
import { BiCalendar, BiNotepad, BiUser } from "react-icons/bi";
import { GrBladesVertical, GrGrid, GrUser } from "react-icons/gr";
import { IoListSharp } from "react-icons/io5";
import CalendarScreen from "../pages/calendar/CalendarScreen";
import EventsScreen from "../pages/private/EventsScreen";
import ProfileScreen from "../pages/private/ProfileScreen";

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
    to: "/calendar",
    path: "",
    icon: BiCalendar,
    Component: CalendarScreen,
    name: "Calendario",
  },
  {
    to: "/calendar/events",
    path: "events",
    icon: BiNotepad,
    Component: EventsScreen,
    name: "Eventos",
  },
  {
    to: "/calendar/profile",
    path: "profile",
    icon: BiUser,
    Component: ProfileScreen,
    name: "Perfil",
  },
];
