import {
  Container,
  Flex,
  Grid,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import BaseCalendar from "../../components/calendar/BaseCalendar";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { retriveEventsOfUser } from "../../features/calendar/eventsActions";
import { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillGrid3X3GapFill, BsFillHddStackFill } from "react-icons/bs";
import { LocalStorageService } from "../../services/ServiceLocalStore";
import Event from "../../components/eventComponents/Event";

const EventsScreen = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.eventsCalendar.events);
  const user = useAppSelector((state) => state.authState.user);
  const [view, setView] = useState<boolean>(
    LocalStorageService.getItem<boolean>("viewEvents") || false
  );
  const handleView = () => {
    LocalStorageService.setItem("viewEvents", !view);
    setView(!view);
  };
  useEffect(() => {
    const retriveEvents = async () => {
      await dispatch(retriveEventsOfUser(user.id));
    };
    retriveEvents();
  }, [dispatch]);

  return (
    <>
      <BaseCalendar>
        <AnimatePresence>
          <motion.div>
            <Flex
              justify={"flex-start"}
              as={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              width={"100%"}
            >
              <Container maxW="container.lg">
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                  }}
                  gap={4}
                  my={3}
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={BiSearch} />}
                    />
                    <Input type="search" placeholder="Search" />
                  </InputGroup>
                  <Select placeholder="Ordenar">
                    <option value="option1">Eventos vigente</option>
                    <option value="option2">Eventos pasadas</option>
                    <option value="option3">A-Z</option>
                    <option value="option3">Z-A</option>
                  </Select>
                </Grid>
                <IconButton
                  display={{ base: "none", md: "flex" }}
                  aria-label="view"
                  color={"gray.500"}
                  icon={
                    <Icon
                      as={view ? BsFillGrid3X3GapFill : BsFillHddStackFill}
                      w={8}
                      h={8}
                    />
                  }
                  my={4}
                  onClick={handleView}
                />

                <SimpleGrid
                  columns={{ base: 1, md: view ? 1 : 3 }}
                  spacing={10}
                  my={3}
                  bg={"gray.200"}
                  rounded={"md"}
                  padding={4}
                  height={"auto"}
                >
                  {events.map((event) => (
                    <Event key={event.id} event={event} />
                  ))}
                </SimpleGrid>
              </Container>
            </Flex>
          </motion.div>
        </AnimatePresence>
      </BaseCalendar>
    </>
  );
};

export default EventsScreen;
