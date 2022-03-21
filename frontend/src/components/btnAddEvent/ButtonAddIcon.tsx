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
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <Flex
            bottom={10}
            position={"fixed"}
            padding={4}
            alignItems={"center"}
            justifyContent={"space-between"}
            zIndex={5}
            justify={"space-around"}
            float={"left"}
            direction={activeEvent ? "row" : "row-reverse"}
            width={{ base: "99%", md: "70%", lg: "75%", xl: "84%" }}
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
              justifySelf={"flex-end"}
              marginRight={{ base: 6, md: 10 }}
            >
              <Icon
                as={activeEvent !== null ? IoMdCreate : IoIosAdd}
                h={8}
                w={8}
              />
            </Button>
          </Flex>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ButtonAddIcon;
