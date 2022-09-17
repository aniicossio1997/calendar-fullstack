import dayjs from "dayjs";
import { FormikHelpers } from "formik";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { initialValuesCalendar } from "../components/calendarModal/validateCalendar";
import {
  eventActiveChangedToNull,
  eventUpdated,
} from "../features/calendar/calendarSlice";
import {
  saveEventsOfUser,
  updateAnUserEvent,
} from "../features/calendar/eventsActions";
import { closeModalReducer } from "../features/modal/calendarModalSlice";
import { resetMessage, showMessage } from "../features/ui/uiMessageSlice";
import { IEvent, IEventBadRequest, IEventSave } from "../ts/interfaces/IEvents";

const startDateInitial = moment().minutes(0).seconds(0).add(1, "hours");
const endDateInitial = startDateInitial.clone().add(1, "hours");
const useModal = () => {
  const dispatch = useAppDispatch();
  const [isErrorDate, setIsErrorDate] = useState(false);
  const { activeEvent } = useAppSelector((store) => store.eventsCalendar);
  const [formValues, setFormValues] = useState<
    IEvent | typeof initialValuesCalendar
  >(initialValuesCalendar);
  const [titleForm, setTitleForm] = useState("Agregar");
  const userActual = useAppSelector((store) => store.authState.user);
  const [isEditable, setIsEditable] = useState(Boolean(activeEvent));
  const [isShowIconEdit, setIsShowIconEdit] = useState(Boolean(activeEvent));
  const refModal = useRef<any>(null);
  const refForm = useRef<any>(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleCloseModal = () => {
    dispatch(closeModalReducer());
    dispatch(eventActiveChangedToNull());
    setFormValues(initialValuesCalendar);
    setIsErrorDate(false);
    setTitleForm("Agregar");
  };
  const handleEditable = () => {
    setIsEditable(!isEditable);
  };
  const handleCancelEditable = () => {
    setIsEditable(false);
  };

  useEffect(() => {
    setIsSubmit(false);
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
      if (activeEvent) {
        setIsEditable(true);
      } else {
        setIsEditable(false);
        setFormValues(initialValuesCalendar);
        setTitleForm("Agregar");
      }

      setIsErrorDate(false);
      refModal.current = null;
    };
  }, [activeEvent, setFormValues, setTitleForm, setIsEditable]);

  return {
    handleCloseModal,
    isErrorDate,
    titleForm,
    formValues,
    activeEvent,
    setIsEditable,
    isEditable,
    handleEditable,
    handleCancelEditable,
    refModal,
    refForm,
  };
};

export default useModal;
