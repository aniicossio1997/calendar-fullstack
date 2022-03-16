import { Button, Flex, Icon } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { IoIosAdd, IoMdCreate, IoMdTrash } from "react-icons/io";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { eventDeleted } from "../../features/calendar/calendarSlice";
import styles from "./style.module.css";
interface IProps {
  handleClick: () => void;
}
const ButtonAddIcon = ({ handleClick }: IProps) => {
  const dispatch = useAppDispatch();
  const { activeEvent } = useAppSelector((store) => store.eventsCalendar);
  const handleDeleted = () => {
    dispatch(eventDeleted());
  };
  return (
    <>
      <AnimatePresence>
        <Flex
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          bottom={10}
          position={"sticky"}
          padding={4}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          as={motion.div}
          zIndex={5}
          direction={activeEvent === null ? "row-reverse" : "row"}
        >
          {activeEvent !== null && (
            <Button
              className={styles.btnStyles}
              colorScheme={"red"}
              rounded={"full"}
              padding={4}
              onClick={handleDeleted}
            >
              <Icon as={IoMdTrash} h={8} w={8} />
            </Button>
          )}

          <Button
            onClick={(e) => handleClick()}
            className={styles.btnStyles}
            colorScheme={"blue"}
            rounded={"full"}
            padding={4}
          >
            <Icon
              as={activeEvent !== null ? IoMdCreate : IoIosAdd}
              h={8}
              w={8}
            />
          </Button>
        </Flex>
      </AnimatePresence>
    </>
  );
};

export default ButtonAddIcon;
