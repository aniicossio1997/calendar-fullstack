import { Calendar, momentLocalizer, View } from "react-big-calendar";

import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../components/calendar/calendarMessages";
import CSS from "csstype";
import CalendarEvent from "../../components/calendar/CalendarEvent";
import { IEvensCalendar } from "../../ts/interfaces/ICalendar";
import { useEffect, useState } from "react";
import { LocalStorageService } from "../../services/ServiceLocalStore";
import CalendarModal from "../../components/calendarModal/CalendarModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openModalReducer } from "../../features/modal/calendarModalSlice";
import { Button, Icon } from "@chakra-ui/react";
import {
  eventActiveChangedToNull,
  eventSetActive,
  IEventsReducer,
} from "../../features/calendar/calendarSlice";
import ButtonAddIcon from "../../components/btnAddEvent/ButtonAddIcon";
import { IoMdTrash } from "react-icons/io";

import style from "./style.module.css";
export const CalendarScreen = () => {
  const localizer = momentLocalizer(moment);
  const dispatch = useAppDispatch();
  const eventsCalendar = useAppSelector((store) => store.eventsCalendar.events);

  const [lastView, setLastView] = useState<View>(
    LocalStorageService.getItem<View>("lastView") || "month"
  );

  const styleEvent = (
    event: Object,
    start: Date,
    end: Date,
    isSelected: boolean,
    title: string
  ) => {
    const style: CSS.Properties = {
      backgroundColor: "orange",
      padding: "0.1rem",
      fontFamily: "sans-serif",
      fontSize: "1rem",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      textAlign: "justify",
    };

    return {
      style,
    };
  };
  const onDoubleClick = (e: IEventsReducer) => {
    //cerrar modal
    dispatch(openModalReducer());
  };
  const onSelectEvent = (e: IEventsReducer) => {
    dispatch(eventSetActive(e));
  };
  const onViewChange = (e: View) => {
    setLastView(e);
    LocalStorageService.setItem("lastView", e);
    console.log(e);
  };
  const handleModal = () => {
    dispatch(openModalReducer());
  };
  const onSelectSlot = () => {
    dispatch(eventActiveChangedToNull());
  };

  useEffect(() => {
    moment.locale("es");
  }, []);

  return (
    <>
      <div className={style["calendar-screen"]}>
        <Calendar
          localizer={localizer}
          events={eventsCalendar}
          startAccessor="dateStart"
          endAccessor="dateEnd"
          messages={messages}
          components={{ event: CalendarEvent }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          view={lastView}
          onSelectSlot={onSelectSlot}
          selectable={true}
        />
        <CalendarModal />
      </div>
      <ButtonAddIcon handleClick={handleModal} />
    </>
  );
};
export default CalendarScreen;
