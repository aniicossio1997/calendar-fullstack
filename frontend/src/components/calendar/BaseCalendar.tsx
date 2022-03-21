import { Box } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { openModalReducer } from "../../features/modal/calendarModalSlice";
import ButtonAddIcon from "../btnAddEvent/ButtonAddIcon";
import CalendarModal from "../calendarModal/CalendarModal";
interface IProps {
  children: React.ReactNode;
}
const BaseCalendar = ({ children }: IProps) => {
  const dispatch = useAppDispatch();
  const handleModal = () => {
    dispatch(openModalReducer());
  };
  return (
    <>
      {children}
      <CalendarModal />
      <Box width={"90%"}>
        <ButtonAddIcon handleClick={handleModal} />
      </Box>
    </>
  );
};

export default BaseCalendar;
