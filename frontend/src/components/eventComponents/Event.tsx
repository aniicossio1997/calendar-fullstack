import { Box, Heading, Text } from "@chakra-ui/react";
import { IEvent } from "../../ts/interfaces/IEvents";
import { AnimatePresence, motion } from "framer-motion";
import DatePrettySimple from "./DatePrettyCustom/DatePrettySimple";

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
          <DatePrettySimple date={event.start} title="Inicio" />
          <DatePrettySimple date={event.end} title="Fin" />
        </Box>
      </AnimatePresence>
    </>
  );
};

export default Event;
