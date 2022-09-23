import {
  Container,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import BaseCalendar from "../../components/calendar/BaseCalendar";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { LocalStorageService } from "../../services/ServiceLocalStore";
import Event from "../../components/eventComponents/Event";
import FilterFormEvent from "../../components/eventComponents/FilterFormEvent";
import useEvent from "../../hook/useEvent";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initial } from "../../features/events/eventsSlice";
import { resetIsModified } from "../../features/calendar/calendarSlice";
import { retriveEventsOfUser } from "../../features/calendar/eventsActions";
import { IEvent } from "../../ts/interfaces/IEvents";
import { resetMessage } from "../../features/ui/uiMessageSlice";

const listVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};
const itemVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const EventsScreen = () => {
  const dispatch = useAppDispatch();
  const eventsOrder = useAppSelector((store) => store.eventsOrder);
  const isModifiqueEvents = useAppSelector(
    (store) => store.eventsCalendar.isModifiqueEvents
  );
  const { user } = useAppSelector((store) => store.authState);
  const eventsPrincipal = useAppSelector(
    (store) => store.eventsCalendar.events
  );
  const { events, handleClick } = useEvent();
  const [view, setView] = useState<boolean>(
    LocalStorageService.getItem<boolean>("viewEvents") || false
  );

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const componentWillUnmount = useRef(null);

  const handleView = () => {
    setIsVisible((prevValue) => !prevValue);
    setIsAnimate(false);
    LocalStorageService.setItem("viewEvents", !view);
    setView(!view);
    setIsAnimate(true);
    setIsVisible(true);
  };
  useEffect(() => {
    dispatch(initial(events));
    setIsVisible(true);
    return () => {
      dispatch(resetMessage());
    };
  }, []);
  useEffect(() => {
    if (isModifiqueEvents) {
      setIsVisible(false);
      getEvents();
      dispatch(resetIsModified());
    }
    return () => {};
  }, [isModifiqueEvents]);

  const getEvents = async () => {
    let aux_events = (await (
      await dispatch(retriveEventsOfUser(user.id))
    ).payload) as IEvent[];
    dispatch(initial(aux_events));
  };

  return (
    <>
      <BaseCalendar>
        <Flex justify={"flex-start"} width={"100%"} ref={componentWillUnmount}>
          <Container maxW="100%">
            <FilterFormEvent />
            <IconButton
              display={{ base: "none", md: "flex" }}
              aria-label="view"
              color={"gray.500"}
              icon={
                <Icon as={view ? BsFillGrid3X3GapFill : TiThMenu} w={8} h={8} />
              }
              my={4}
              onClick={handleView}
            />

            <AnimateSharedLayout>
              <AnimatePresence initial={false}>
                <motion.div>
                  <SimpleGrid
                    columns={{ base: 1, md: view ? 1 : 2, xl: view ? 1 : 3 }}
                    transitionDuration={"2"}
                    spacing={{ base: 4, lg: 6 }}
                    my={3}
                    bg={"gray.100"}
                    rounded={"md"}
                    padding={2}
                    height={"auto"}
                    boxSizing="border-box"
                  >
                    {eventsOrder.events.map((event) => (
                      <Event
                        key={event.id}
                        event={event}
                        handleClick={handleClick}
                      />
                    ))}
                  </SimpleGrid>
                </motion.div>
              </AnimatePresence>
            </AnimateSharedLayout>
          </Container>
        </Flex>
      </BaseCalendar>
    </>
  );
};

export default EventsScreen;
