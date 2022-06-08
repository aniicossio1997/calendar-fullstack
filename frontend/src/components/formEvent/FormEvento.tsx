import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { forwardRef } from "react";
import { Interface } from "readline";
import { IMessageUI } from "../../features/ui/uiMessageSlice";
import useModal from "../../hook/useModal";
import { IEvent } from "../../ts/interfaces/IEvents";
import SimpleAlert from "../Alert/SimpleAlert";
import InputDatePicker from "../form/fieldDateTime/InputDatePicker";
import { FielCustomEvent } from "../form/inputCustomEvent/FielCustomEvent";
import InputCustom from "../form/inputCustomEvent/InputCustom";
import TextareaCumtom from "../form/TextareaCumtom";
import { CalendarFormSchema, endNowDate, nowDate } from "./validateForm";

const messageError: IMessageUI = {
  isShow: true,
  description:
    " La fecha de fin debe de ser superior al de la fecha de inicio ",
  type: "error",
};
interface IProps {}
const FormEvento = forwardRef(({}: IProps, ref) => {
  const {
    isErrorDate,
    titleForm,
    formValues,
    activeEvent,
    handleSubmitForm,
    handleEditable,
    isEditable,
    handleCancelEditable,
  } = useModal();
  return (
    <>
      <Formik
        initialValues={formValues as IEvent}
        validationSchema={CalendarFormSchema}
        onSubmit={handleSubmitForm}
      >
        {({ errors, values }) => (
          <Form>
            {isErrorDate && (
              <>
                <SimpleAlert paramsMessage={messageError} />
              </>
            )}
            <FielCustomEvent
              key={"title"}
              name={"title"}
              label={"titulo"}
              Component={InputCustom}
              isRequired={true}
              placeholder="agregar titulo"
              fontSize={"1.3em"}
              isDisabled={Boolean(activeEvent) && !isEditable}
            />
            <InputDatePicker
              name="start"
              label="Fecha de Inicio"
              dateRestric={nowDate.toDate()}
              isError={isErrorDate}
            />
            <InputDatePicker
              name="end"
              label="Fecha de Fin"
              dateRestric={endNowDate.toDate()}
              isError={isErrorDate}
            />
            <FielCustomEvent
              key={"description"}
              name={"description"}
              label={"Descripcion"}
              Component={TextareaCumtom}
              placeholder="agregar una descripcion"
              isRequired={false}
            />
            <Button type="submit" colorScheme={"pink"}>
              Guardar
            </Button>
            {isEditable && activeEvent && (
              <Button colorScheme={"gray"}>Cancelar</Button>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
});

export default FormEvento;
