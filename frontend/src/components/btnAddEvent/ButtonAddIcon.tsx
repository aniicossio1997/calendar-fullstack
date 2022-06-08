import { Button, Flex, Icon } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosAdd, IoMdCreate, IoMdTrash } from "react-icons/io";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import useEvent from "../../hook/useEvent";
import { SwalAlertDelete } from "../Alert/SwalAlert";
import styles from "./style.module.css";
interface IProps {
  handleClick: () => void;
}
const ButtonAddIcon = ({ handleClick }: IProps) => {
  const dispatch = useAppDispatch();
  const { activeEvent } = useAppSelector((store) => store.eventsCalendar);
  const { deleteEvent, handleResetEventActive } = useEvent();

  const responseDelete = async () => {
    await deleteEvent();
  };
  const handleDeleted = () => {
    SwalAlertDelete({
      title: ` ${activeEvent?.title}`,
      description: `¿Desea eliminar el evento?`,
      handleDeleted: responseDelete,
      handleResetButtons: handleResetEventActive,
    });
  };
  return (
    <>
      <AnimatePresence>
        <Flex
          bottom={{ base: 2, md: 10 }}
          position={"fixed"}
          padding={4}
          alignItems={"center"}
          justifyContent={"space-between"}
          zIndex={5}
          justify={"space-around"}
          float={"left"}
          direction={"row-reverse"}
          width={{ base: "99%", lg: "75%", xl: "85%" }}
        >
          {/* {activeEvent !== null && (
            <Button
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              fontWeight="extrabold"
              className={styles.btnStyles}
              colorScheme={"red"}
              rounded={"full"}
              padding={4}
              onClick={handleDeleted}
            >
              <Icon as={IoMdTrash} h={8} w={8} />
            </Button>
          )} */}

          <Button
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            onClick={(e) => handleClick()}
            className={styles.btnStyles}
            colorScheme={"blue"}
            rounded={"full"}
            padding={4}
            justifySelf={"flex-end"}
            marginRight={{ base: 6, md: 10 }}
          >
            <Icon as={IoIosAdd} h={8} w={8} fontWeight="extrabold" />
          </Button>
        </Flex>
      </AnimatePresence>
    </>
  );
};

export default ButtonAddIcon;
