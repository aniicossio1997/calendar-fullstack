import FullCalendar, {
  DateSelectArg,
  DateSpanApi,
  EventApi,
  EventClickArg,
} from "@fullcalendar/react";
import React, { memo } from "react";
import { IEvent } from "../../ts/interfaces/IEvents";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./styleFullCalendar.css";
import { Container } from "@chakra-ui/react";
import CalendarScreen from "../../pages/calendar/CalendarScreen";
interface IProps {
  events: IEvent[];
}
const handleSelectable = (...rest: any) => {
  console.log(rest);
  return false;
};

const FullCalendarCustom = ({ events }: IProps) => {
  const handleClickEvent = (e: DateSelectArg) => {
    console.log(e);
  };
  const handleClick = (e: EventClickArg) => {
    console.log(e.event.id);
    let id = e.event.id;
    const anEvent = events.find((e) => e.id === id);
    console.log(anEvent);
  };
  return (
    <>
      <Container maxW="95%">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: "title", // will normally be on the left. if RTL, will be on the right
            center: "",
            right: "prev,today,next",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectAllow={handleSelectable}
          selectMirror={true}
          dayMaxEvents={true}
          locale={"es"}
          events={events}
          select={handleClickEvent}
          eventClick={handleClick}
        />
      </Container>
    </>
  );
};

export default FullCalendarCustom;
