import { Box, Container } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openModalReducer } from "../../features/modal/calendarModalSlice";
import SimpleAlert from "../Alert/SimpleAlert";
import ButtonAddIcon from "../btnAddEvent/ButtonAddIcon";
import CalendarModal from "../calendarModal/CalendarModal";
import { motion } from "framer-motion";
interface IProps {
  children: React.ReactNode;
}
const BaseCalendar = ({ children }: IProps) => {
  const dispatch = useAppDispatch();
  const { activeEvent, message } = useAppSelector(
    (store) => store.eventsCalendar
  );
  const handleModal = () => {
    dispatch(openModalReducer());
  };
  return (
    <>
      {message.isShow && message.description}

      <SimpleAlert />
      <Container
        minW={{ base: "100%", md: "90%" }}
        padding={{ base: 0, md: undefined }}
        marginTop={10}
      >
        {children}
      </Container>
      <CalendarModal />
      <Box width={"90%"}>
        <ButtonAddIcon handleClick={handleModal} />
      </Box>
    </>
  );
};

export default BaseCalendar;
