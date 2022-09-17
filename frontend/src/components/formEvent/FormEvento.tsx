import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { forwardRef } from "react";
import { IMessageUI } from "../../features/ui/uiMessageSlice";
import useEvent from "../../hook/useEvent";
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
const FormEvento = forwardRef(({}: IProps) => {
  const { isErrorDate, formValues, activeEvent, isEditable, handleCloseModal } =
    useModal();
  const { handleSaveEvent, handleUpdateEvent } = useEvent();

  return (
    <>
      <Formik
        initialValues={activeEvent ? activeEvent : (formValues as IEvent)}
        validationSchema={CalendarFormSchema}
        onSubmit={activeEvent ? handleUpdateEvent : handleSaveEvent}
      >
        {() => (
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
              fontSize={{ base: "16px", md: "1.3em" }}
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
              <Button colorScheme={"gray"} onClick={handleCloseModal}>
                Cancelar
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
});

export default FormEvento;
