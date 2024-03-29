import { useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import style from "./style.module.css";
import "./style.module.css";
import { useAppSelector } from "../../app/hooks";
import useModal from "../../hook/useModal";
import { IMessageUI } from "../../features/ui/uiMessageSlice";
import MenuDots from "./menuDot/MenuDots";
import { BiEdit } from "react-icons/bi";
import useEvent from "../../hook/useEvent";
import EventShow from "./eventShow/EventShow";
import FormEvento from "../formEvent/FormEvento";

Modal.setAppElement("#root");
const startDateInitial = moment().minutes(0).seconds(0).add(1, "hours");
const CalendarModal = () => {
  const {
    handleCloseModal,
    activeEvent,
    handleEditable,
    isEditable,
    refModal,
  } = useModal();
  const { handleDeleted } = useEvent();
  const isOpenReducer = useAppSelector((store) => store.modalRedux.isOpen);
  return (
    <>
      <Modal
        isOpen={isOpenReducer}
        //onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={style.modal}
        overlayClassName={style["modal-fondo"]}
        ref={refModal}
      >
        <Box>
          <Flex direction={"row"} justifyContent="space-between">
            <Flex mb={4} direction="row" justifyContent={"space-between"}>
              <CloseButton onClick={handleCloseModal} />
            </Flex>
            <div>
              <Heading display={!isEditable && activeEvent ? "none" : "flex"}>
                {activeEvent ? " Editar" : "Agregar"}
              </Heading>
            </div>
            <Box>
              <Box display={activeEvent ? "flex" : "none"}>
                {!isEditable && activeEvent && (
                  <IconButton
                    aria-label="edit"
                    icon={<Icon as={BiEdit} w={6} h={6} />}
                    onClick={handleEditable}
                  />
                )}
                {activeEvent && <MenuDots handleDeleted={handleDeleted} />}
              </Box>
            </Box>
          </Flex>
          {!isEditable && activeEvent ? (
            <EventShow event={activeEvent} />
          ) : (
            <FormEvento />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CalendarModal;
