import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { Form, Formik, useFormikContext } from "formik";
import { CalendarFormSchema } from "./validateCalendar";
import moment from "moment";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Icon,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import InputDatePicker from "../form/fieldDateTime/InputDatePicker";
import style from "./style.module.css";
import "./style.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useModal from "../../hook/useModal";
import SimpleAlert from "../Alert/SimpleAlert";
import { IMessageUI } from "../../features/ui/uiMessageSlice";
import MenuDots from "./menuDot/MenuDots";
import { BiEdit, BiTrash } from "react-icons/bi";
import InputCustom from "../form/inputCustomEvent/InputCustom";
import { FielCustomEvent } from "../form/inputCustomEvent/FielCustomEvent";
import TextareaCumtom from "../form/TextareaCumtom";
import useEvent from "../../hook/useEvent";
import EventShow from "./eventShow/EventShow";
import { IEvent } from "../../ts/interfaces/IEvents";
import FormEvento from "../formEvent/FormEvento";

Modal.setAppElement("#root");
const startDateInitial = moment().minutes(0).seconds(0).add(1, "hours");
const endDateInitial = startDateInitial.clone().add(1, "hours");
const messageError: IMessageUI = {
  isShow: true,
  description:
    " La fecha de fin debe de ser superior al de la fecha de inicio ",
  type: "error",
};
const CalendarModal = () => {
  const {
    handleCloseModal,
    isErrorDate,
    titleForm,
    formValues,
    activeEvent,
    handleSubmitForm,
    handleEditable,
    isEditable,
    handleCancelEditable,
    refModal,
    refForm,
  } = useModal();
  const { handleDeleted } = useEvent();
  const [stateModal, setStateModal] = useState(null);
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
