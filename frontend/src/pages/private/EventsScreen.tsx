import {
  Container,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BaseCalendar from "../../components/calendar/BaseCalendar";
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  VariantLabels,
} from "framer-motion";
import { BsFillGrid3X3GapFill, BsFillHddStackFill } from "react-icons/bs";
import { TiThMenu, TiThMenuOutline } from "react-icons/ti";

import { LocalStorageService } from "../../services/ServiceLocalStore";
import Event from "../../components/eventComponents/Event";
import NavbarFormEvent from "../../components/eventComponents/NavbarFormEvent";
import useEvent from "../../hook/useEvent";
import InputDateTime from "../../components/form/fieldDateTime/InputDateTime";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initial } from "../../features/events/eventsSlice";

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
  const { events, handleClick } = useEvent();
  const [view, setView] = useState<boolean>(
    LocalStorageService.getItem<boolean>("viewEvents") || false
  );

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAnimate, setIsAnimate] = useState<boolean>(false);

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
      setIsVisible(false);
    };
  }, []);

  return (
    <>
      <BaseCalendar>
        <Flex justify={"flex-start"} width={"100%"}>
          <Container maxW="100%">
            <NavbarFormEvent />
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
                <motion.div
                  initial="hidden"
                  variants={listVariants}
                  animate={isVisible ? "visible" : "hidden"}
                >
                  <SimpleGrid
                    as={motion.div}
                    initial="hidden"
                    variants={listVariants}
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
