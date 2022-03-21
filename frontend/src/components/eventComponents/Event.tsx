import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import DatePrettyContainer from "./DatePrettyContainer";
import { IEvent } from "../../ts/interfaces/IEvents";

interface IProps {
  event: IEvent;
}
const Event = ({ event }: IProps) => {
  return (
    <>
      <Box bg={"white"} p={6} key={event.id} height={"120px"} rounded="md">
        <Heading as="h5" size="sm" textTransform={"capitalize"}>
          {event.title}
        </Heading>
        <Text>{event.description}</Text>
        <DatePrettyContainer date={event.start} title="inicio" />
        <DatePrettyContainer date={event.end as Date} title="fin" />
      </Box>
    </>
  );
};

export default Event;
