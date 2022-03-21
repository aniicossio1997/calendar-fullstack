import Modal from "react-modal";

import { useEffect, useState } from "react";
import { dataFormCalendar } from "./dataForm";
import { InputText } from "../form/InputText";
import { Form, Formik, FormikHelpers } from "formik";
import { CalendarFormSchema, initialValuesCalendar } from "./validateCalendar";
import moment from "moment";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import InputDatePicker from "../form/fieldDateTime/InputDatePicker";
import style from "./style.module.css";
import "./style.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeModalReducer } from "../../features/modal/calendarModalSlice";
import {
  eventActiveChangedToNull,
  eventAddNew,
  eventUpdated,
  IEventsReducer,
} from "../../features/calendar/calendarSlice";
import { AnimatePresence, motion } from "framer-motion";
import { IEvent, IEventSave } from "../../ts/interfaces/IEvents";
import { saveEventsOfUser } from "../../features/calendar/eventsActions";

Modal.setAppElement("#root");
const startDateInitial = moment().minutes(0).seconds(0).add(1, "hours");
const endDateInitial = startDateInitial.clone().add(1, "hours");

const CalendarModal = () => {
  const dispatch = useAppDispatch();
  const [isErrorDate, setIsErrorDate] = useState(false);
  const [FormValues, setFormValues] = useState<IEvent>(initialValuesCalendar);
  const isOpenReducer = useAppSelector((store) => store.modalRedux.isOpen);
  const userActual = useAppSelector((store) => store.authState.user);
  const { activeEvent } = useAppSelector((store) => store.eventsCalendar);
  const [titleForm, setTitleForm] = useState("Agregar");
  const handleCloseModal = () => {
    dispatch(closeModalReducer());
    dispatch(eventActiveChangedToNull());
    setFormValues(initialValuesCalendar);
    setTitleForm("Agregar");
  };

  useEffect(() => {
    setIsErrorDate(false);
    if (activeEvent) {
      setFormValues(activeEvent);
      setTitleForm("Editar");
    } else {
      setFormValues(initialValuesCalendar);
      setTitleForm("Agregar");
    }
  }, [activeEvent, setFormValues, setTitleForm]);
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            isOpen={isOpenReducer}
            //onRequestClose={closeModal}
            contentLabel="Example Modal"
            className={style.modal}
            overlayClassName={style["modal-fondo"]}
            closeTimeoutMS={200}
          >
            <Box>
              <Heading>{titleForm}</Heading>
              <Formik
                initialValues={FormValues}
                validationSchema={CalendarFormSchema}
                onSubmit={(
                  values: IEvent,
                  { resetForm }: FormikHelpers<IEvent>
                ) => {
                  //TODO:
                  setIsErrorDate(false);
                  const startMoment = moment(values.start);
                  const endMoment = moment(values.end);
                  if (!startMoment.isSameOrAfter(endMoment)) {
                    setIsErrorDate(false);
                    if (activeEvent) {
                      dispatch(eventUpdated(values));
                    } else {
                      const event: IEventSave = {
                        title: values.title,
                        end: values.end,
                        start: values.start,
                        description: values.description,
                        user_id: userActual.id as string,
                      };
                      dispatch(saveEventsOfUser(event));
                    }
                    handleCloseModal();
                    resetForm();
                  } else {
                    setIsErrorDate(true);
                  }
                }}
              >
                {({ errors, values }) => (
                  <Form>
                    {isErrorDate && (
                      <Alert
                        status="error"
                        variant="left-accent"
                        flexDirection={"row"}
                      >
                        <AlertIcon top={0} />
                        <Text>
                          La fecha de fin debe de ser superior al de la fecha de
                          inicio
                        </Text>
                      </Alert>
                    )}
                    <InputDatePicker
                      name="start"
                      label="Fecha de Inicio"
                      dateRestric={startDateInitial.toDate()}
                      isError={isErrorDate}
                    />
                    <InputDatePicker
                      name="end"
                      label="Fecha de Fin"
                      dateRestric={endDateInitial.toDate()}
                      isError={isErrorDate}
                    />

                    {dataFormCalendar.map(
                      ({ name, label, Component, isRequired }) => (
                        <InputText
                          key={name}
                          name={name}
                          label={label}
                          Component={Component}
                          isRequired={isRequired}
                        />
                      )
                    )}
                    <Stack
                      direction={["column", "row"]}
                      justifyContent={"space-between"}
                    >
                      <Button type="submit" colorScheme={"pink"}>
                        Guardar
                      </Button>
                      <Button
                        colorScheme={"gray"}
                        onClick={handleCloseModal}
                        variant="solid"
                      >
                        Cancelar
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Box>
          </Modal>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CalendarModal;
