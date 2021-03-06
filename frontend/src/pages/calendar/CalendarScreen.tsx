import { momentLocalizer } from "react-big-calendar";

import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { retriveEventsOfUser } from "../../features/calendar/eventsActions";
import FullCalendarCustom from "../../components/calendar/FullCalendarCustom";
import BaseCalendar from "../../components/calendar/BaseCalendar";
import style from "./style.module.css";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

export const CalendarScreen = () => {
  const localizer = momentLocalizer(moment);
  const dispatch = useAppDispatch();
  const stateUserAuth = useAppSelector((store) => store.authState);
  let events = useAppSelector((store) => store.eventsCalendar.events);

  useEffect(() => {
    dispatch(retriveEventsOfUser(stateUserAuth.user.id));
    moment.locale("es");
  }, []);
  useEffect(() => {
    const retriveEvents = async () => {
      await dispatch(retriveEventsOfUser(stateUserAuth.user.id));
    };
    retriveEvents();
  }, [dispatch]);

  return (
    <>
      <BaseCalendar>
        <Box className={style["calendar-screen"]}>
          <FullCalendarCustom events={events} />
        </Box>
      </BaseCalendar>
    </>
  );
};
export default CalendarScreen;
