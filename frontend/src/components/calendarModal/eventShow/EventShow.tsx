import { Heading, Stat, StatLabel, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { IEvent } from "../../../ts/interfaces/IEvents";
import {
  DatePretty,
  IDatePretty,
} from "../../eventComponents/DatePrettyCustom/DatePretty";
interface IProps {
  event: IEvent;
}
const EventShow = ({ event }: IProps) => {
  return (
    <>
      <Heading as="h2" size="lg" textTransform={"capitalize"} my={6}>
        {event.title}
      </Heading>
      <Stat>
        <StatLabel>Collected Fees</StatLabel>
        {/* dd/MM/y  H:mm aa */}

        <DatePretty datePretty={{ date: event.start, label: "inicio" }} />
        <DatePretty datePretty={{ date: event.end, label: "fin" }} />
      </Stat>
      <Text textTransform={"capitalize"}>{event.description}</Text>
    </>
  );
};

export default EventShow;
