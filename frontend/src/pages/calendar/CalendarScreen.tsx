import { momentLocalizer } from "react-big-calendar";

import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openModalReducer } from "../../features/modal/calendarModalSlice";
import {
  eventActiveChangedToNull,
  eventSetActive,
} from "../../features/calendar/calendarSlice";
import { retriveEventsOfUser } from "../../features/calendar/eventsActions";
import { IEvent } from "../../ts/interfaces/IEvents";

import style from "./style.module.css";

import FullCalendarCustom from "../../components/calendar/FullCalendarCustom";
import BaseCalendar from "../../components/calendar/BaseCalendar";
export const CalendarScreen = () => {
  const localizer = momentLocalizer(moment);
  const dispatch = useAppDispatch();
  const stateUserAuth = useAppSelector((store) => store.authState);
  let events = useAppSelector((store) => store.eventsCalendar.events);

  const [listEvents, setListState] = useState<IEvent[]>([]);
  const onDoubleClick = (e: IEvent) => {
    //cerrar modal
    dispatch(openModalReducer());
  };
  const onSelectEvent = (e: IEvent) => {
    dispatch(eventSetActive(e));
  };

  const onSelectSlot = () => {
    dispatch(eventActiveChangedToNull());
  };

  useEffect(() => {
    dispatch(retriveEventsOfUser(stateUserAuth.user.id));
    moment.locale("es");
  }, []);
  useEffect(() => {
    const retriveEvents = async () => {
      await dispatch(retriveEventsOfUser(stateUserAuth.user.id));
    };
    retriveEvents();
    console.log("stateDis.requestId");
  }, [dispatch]);

  return (
    <>
      <BaseCalendar>
        <div className={style["calendar-screen"]}>
          <FullCalendarCustom events={events} />
        </div>
      </BaseCalendar>
    </>
  );
};
export default CalendarScreen;
