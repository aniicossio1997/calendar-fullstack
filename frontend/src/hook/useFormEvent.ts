import { FormikHelpers } from "formik";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { initialValuesCalendar } from "../components/calendarModal/validateCalendar";
import {
  eventActiveChangedToNull,
  eventUpdated,
} from "../features/calendar/calendarSlice";
import { saveEventsOfUser } from "../features/calendar/eventsActions";
import { closeModalReducer } from "../features/modal/calendarModalSlice";
import { resetMessage } from "../features/ui/uiMessageSlice";
import { IEvent, IEventSave } from "../ts/interfaces/IEvents";
import useModal from "./useModal";

const startDateInitial = moment().minutes(0).seconds(0).add(1, "hours");
const endDateInitial = startDateInitial.clone().add(1, "hours");
const useFormModal = () => {
  const dispatch = useAppDispatch();
  const [isErrorDate, setIsErrorDate] = useState(false);
  const { activeEvent } = useAppSelector((store) => store.eventsCalendar);
  const [formValues, setFormValues] = useState<
    IEvent | typeof initialValuesCalendar
  >(initialValuesCalendar);
  const [titleForm, setTitleForm] = useState("Agregar");
  const userActual = useAppSelector((store) => store.authState.user);
  const { handleCloseModal } = useModal();

  const handleSubmitForm = async (
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
        await dispatch(saveEventsOfUser(event));
      }
      handleCloseModal();
      resetForm();
    } else {
      setIsErrorDate(true);
    }
  };
  useEffect(() => {
    setIsErrorDate(false);
    if (activeEvent) {
      setFormValues({
        ...activeEvent,
        start: moment(activeEvent.start).toDate(),
        end: moment(activeEvent.end).toDate(),
      });
      setTitleForm("Editar");
    } else {
      setFormValues(initialValuesCalendar);
      setTitleForm("Agregar");
    }
    return () => {
      setFormValues(initialValuesCalendar);
      setTitleForm("Agregar");
    };
  }, [activeEvent, setFormValues, setTitleForm]);

  return {
    handleCloseModal,
    isErrorDate,
    titleForm,
    formValues,
    handleSubmitForm,
    activeEvent,
  };
};

export default useFormModal;
