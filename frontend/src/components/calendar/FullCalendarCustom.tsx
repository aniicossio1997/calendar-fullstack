import FullCalendar, {
  DateSelectArg,
  DateSpanApi,
  EventApi,
  EventClickArg,
} from "@fullcalendar/react";
import React, { memo, useEffect } from "react";
import { IEvent } from "../../ts/interfaces/IEvents";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./styleFullCalendar.css";
import { Container } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useEvent from "../../hook/useEvent";
import InputDateTime from "../form/fieldDateTime/InputDateTime";
interface IProps {
  events: IEvent[];
}
const handleSelectable = (...rest: any) => {
  console.log("hello");
  console.log(rest);
  return false;
};

const FullCalendarCustom = ({ events }: IProps) => {
  const { handleClick } = useEvent();
  let calendarRef = React.createRef<null | any>();
  useEffect(() => {
    // console.log(calendarRef);
    return () => {
      console.log(calendarRef);
    };
  }, []);

  return (
    <>
      <Container
        maxW={{ base: "100%", lg: "95%" }}
        padding={{ base: 0, md: undefined }}
      >
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
          eventClick={(e) => handleClick(e.event.id)}
          navLinks={true}
          navLinkWeekClick={() =>
            function (weekStart: any, jsEvent: any) {
              console.log("week start", weekStart.toISOString());
              console.log("coords", jsEvent.pageX, jsEvent.pageY);
            }
          }
          eventBackgroundColor={"blue"}
          ref={calendarRef}
        />
      </Container>
    </>
  );
};

export default FullCalendarCustom;
