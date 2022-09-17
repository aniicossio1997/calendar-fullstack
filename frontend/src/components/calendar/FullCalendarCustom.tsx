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
import { openModalReducer } from "../../features/modal/calendarModalSlice";
import { retriveEventsOfUser } from "../../features/calendar/eventsActions";
import { authMe } from "../../services/methodHttp";
import { resetMessage } from "../../features/ui/uiMessageSlice";

interface IProps {
  events?: IEvent[];
}

const FullCalendarCustom = ({ events }: IProps) => {
  const { handleClick } = useEvent();
  const stateUserAuth = useAppSelector((store) => store.authState);

  const dispatch = useAppDispatch();

  const handleModal = () => {
    dispatch(openModalReducer());
  };

  let calendarRef = React.createRef<null | any>();
  const handleSelectable = (rest: DateSelectArg) => {
    dispatch(openModalReducer());
  };

  useEffect(() => {
    // console.log(calendarRef);
    return () => {
      dispatch(resetMessage());
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

            right: "prev,today,next",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleSelectable}
          locale={"es"}
          events={events}
          eventClick={(e) => handleClick(e.event.id)}
          navLinkWeekClick={() =>
            function (weekStart: any, jsEvent: any) {
              console.log("week start", weekStart.toISOString());
              console.log("coords", jsEvent.pageX, jsEvent.pageY);
            }
          }
          navLinks={false}
          selectable={true}
          ref={calendarRef}
        />
      </Container>
    </>
  );
};

export default FullCalendarCustom;
