import { Badge, Box, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { BiAlignLeft, BiAlarm, BiCalendarEvent } from "react-icons/bi";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { IEvent } from "../../../ts/interfaces/IEvents";
import { prettyDateFull } from "../../../utils/formatDate";
import DatePrettySimple from "../../eventComponents/DatePrettyCustom/DatePrettySimple";
interface IProps {
  event: IEvent;
}
const EventShow = ({ event }: IProps) => {
  return (
    <>
      <Stack padding={4}>
        <Flex>
          <Icon as={BiCalendarEvent} h={6} w={10} />
          <Heading as="h2" size="lg" textTransform={"capitalize"} mt={-1}>
            {event.title}
          </Heading>
        </Flex>
        <Flex paddingBottom={4}>
          <Icon as={BiAlarm} h={6} w={10} />
          <Box>
            <DatePrettySimple date={event.start} title={"Inicio"} />
            <DatePrettySimple date={event.end} title={"Fin"} />
          </Box>
        </Flex>
        <Flex paddingBottom={4}>
          <Icon as={BiAlignLeft} h={6} w={10} />
          <Text
            textTransform={"capitalize"}
            fontSize={{ base: "12px", md: "15px" }}
          >
            {event.description}
          </Text>
        </Flex>
      </Stack>
    </>
  );
};

export default EventShow;
