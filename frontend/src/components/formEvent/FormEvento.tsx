import { Box, Button, Flex } from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/es";

import { Form, Formik } from "formik";
import { createRef, useEffect, useState } from "react";
import { IMessageUI } from "../../features/ui/uiMessageSlice";
import useEvent from "../../hook/useEvent";
import useModal from "../../hook/useModal";
import { IEvent } from "../../ts/interfaces/IEvents";
import SimpleAlert from "../Alert/SimpleAlert";
import { FielCustomEvent } from "../form/inputCustomEvent/FielCustomEvent";
import InputCustom from "../form/inputCustomEvent/InputCustom";
import TextareaCumtom from "../form/TextareaCumtom";
import { CalendarFormSchema } from "./validateForm";
import InputDateTime from "../form/fieldDateTime/InputDateTime";

const messageError: IMessageUI = {
  isShow: true,
  description:
    " La fecha de fin debe de ser superior al de la fecha de inicio ",
  type: "error",
};
interface IProps {}
const FormEvento = ({}: IProps) => {
  const { isErrorDate, formValues, activeEvent, isEditable, handleCloseModal } =
    useModal();
  const { handleSaveEvent, handleUpdateEvent } = useEvent();
  const [selectedDate, handleDateChange] = useState<string>(
    moment().format("DD/MM/yyyy").toString()
  );
  const [selectedHour, handleHourChange] = useState<any>(new Date());

  const refInputDateStart = createRef();
  const refInputDateEnd = createRef();
  useEffect(() => {
    moment.locale("es");
  }, []);
  const dateMin = () => moment().add(1, "hour");

  function validateDateStart(value: any) {
    let error;
    let dateMinLocal = dateMin();
    if (!Boolean(value)) {
      error = "Esta vacio";
    }
    if (moment(value).isValid()) {
      error = "No es Date";
    }
    if (moment(value).isBefore(dateMinLocal)) {
      error = `La Fecha debe ser superior a ${dateMinLocal} `;
    }
    return error;
  }

  return (
    <>
      <Formik
        initialValues={activeEvent ? activeEvent : (formValues as IEvent)}
        validationSchema={CalendarFormSchema}
        onSubmit={activeEvent ? handleUpdateEvent : handleSaveEvent}
      >
        {({ handleChange, errors, values }) => (
          <Form>
            {isErrorDate && (
              <>
                <SimpleAlert paramsMessage={messageError} />
              </>
            )}
            {/* <Text>{JSON.stringify(errors)}</Text> */}
            <FielCustomEvent
              key={"title"}
              name={"title"}
              label={"titulo"}
              Component={InputCustom}
              isRequired={true}
              placeholder="agregar titulo"
              fontSize={{ base: "16px", md: "1.3em" }}
              isDisabled={Boolean(activeEvent) && !isEditable}
            />
            <InputDateTime label="Fecha inicio" name="start" />
            <InputDateTime label="Fecha fin" name="end" />

            <FielCustomEvent
              key={"description"}
              name={"description"}
              label={"Descripcion"}
              Component={TextareaCumtom}
              placeholder="agregar una descripcion"
              isRequired={false}
            />
            <Flex flexDirection={"row"} justifyContent={"space-between"}>
              <Box>
                {isEditable && activeEvent && (
                  <Button colorScheme={"gray"} onClick={handleCloseModal}>
                    Cancelar
                  </Button>
                )}
              </Box>

              <Button type="submit" colorScheme={"pink"} float={"left"}>
                Guardar
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormEvento;
