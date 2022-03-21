import FullCalendar from "@fullcalendar/react";
import React, { memo } from "react";
import { IEvent } from "../../ts/interfaces/IEvents";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
interface IProps {
  events: IEvent[];
}
const FullCalendarCustom = ({ events }: IProps) => {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          start: "title", // will normally be on the left. if RTL, will be on the right
          center: "",
          right: "prev,today,next",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        locale={"es"}
        events={events}
      />
    </>
  );
};

export default FullCalendarCustom;
