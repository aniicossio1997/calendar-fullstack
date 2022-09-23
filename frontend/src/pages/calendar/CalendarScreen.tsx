import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { retriveEventsOfUser } from "../../features/calendar/eventsActions";
import FullCalendarCustom from "../../components/calendar/FullCalendarCustom";
import BaseCalendar from "../../components/calendar/BaseCalendar";
import style from "./style.module.css";
import { Box } from "@chakra-ui/react";

export const CalendarScreen = () => {
  const dispatch = useAppDispatch();
  const stateUserAuth = useAppSelector((store) => store.authState);
  let events = useAppSelector((store) => store.eventsCalendar.events);

  useEffect(() => {
    const retriveEvents = async () => {
      await dispatch(retriveEventsOfUser(stateUserAuth.user.id));
    };
    retriveEvents();
    moment.locale("es");
  }, []);

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
