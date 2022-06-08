import { Box, Heading, Icon, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { IEvent } from "../../ts/interfaces/IEvents";
import { GrEdit } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion";
import { DatePretty } from "./DatePrettyCustom/DatePretty";

interface IProps {
  event: IEvent;
  handleClick: (id: string) => void;
}
const Event = ({ event, handleClick }: IProps) => {
  return (
    <>
      <AnimatePresence>
        <Box
          as={motion.div}
          bg={"white"}
          p={4}
          key={event.id}
          rounded="md"
          onClick={() => handleClick(String(event.id))}
          _hover={{
            color: "pink.500",
            cursor: "pointer",
          }}
        >
          <Heading as="h5" size="sm" textTransform={"capitalize"} my={2}>
            {event.title}
          </Heading>
          <Text
            isTruncated
            fontSize={{ base: "15px", md: "14px" }}
            color={"gray.600"}
          >
            {event.description}
          </Text>
          <DatePretty datePretty={{ date: event.start, label: "start" }}>
            <DatePretty.Label label={"inicio"} />
            <DatePretty.Date date={event.start} />
          </DatePretty>
          <DatePretty datePretty={{ date: event.start, label: "end" }}>
            <DatePretty.Label label={"fin"} />
            <DatePretty.Date date={event.end} />
          </DatePretty>
        </Box>
      </AnimatePresence>
    </>
  );
};

export default Event;
