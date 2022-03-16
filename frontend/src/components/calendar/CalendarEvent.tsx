import { Badge, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { EventProps } from "react-big-calendar";
import { IEvensCalendar } from "../../ts/interfaces/ICalendar";
import { IUSerSimple } from "../../ts/interfaces/IUser";

interface IProps {
  event: IEvensCalendar;
}
const CalendarEvent = ({ event }: IProps) => {
  const { title, notes } = event;
  return (
    <div>
      <Heading as="h6" size="xs">
        {title}
      </Heading>
      <Text fontSize="sm">{notes}</Text>
    </div>
  );
};

export default CalendarEvent;
