import { EventClickArg } from "@fullcalendar/react";
import { FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  SwalAlertDelete,
  SwalAlertErrorSimple,
} from "../components/Alert/SwalAlert";
import {
  eventActiveChangedToNull,
  eventSetActive,
} from "../features/calendar/calendarSlice";
import {
  deleteAnUserEvent,
  retriveEventsOfUser,
  saveEventsOfUser,
  updateAnUserEvent,
} from "../features/calendar/eventsActions";
import {
  closeModalReducer,
  openModalReducer,
} from "../features/modal/calendarModalSlice";
import { resetMessage, showMessage } from "../features/ui/uiMessageSlice";
import { IEvent, IEventSave } from "../ts/interfaces/IEvents";
import useModal from "./useModal";
interface IProps {
  events?: IEvent[];
}
const useEvent = () => {
  const dispatch = useAppDispatch();
  const { activeEvent, events } = useAppSelector(
    (store) => store.eventsCalendar
  );
  const user = useAppSelector((state) => state.authState.user);
  const { handleCloseModal } = useModal();

  const handleSeletedEvent = (e: EventClickArg) => {
    let id = e.event.id;
    const anEvent = events.find((e) => e.id === id);
    if (anEvent) {
      dispatch(eventSetActive(anEvent));
    } else {
      SwalAlertErrorSimple({
        title: "Error al seleccionar un evento",
        description: "Lo sentimos, intente más tarde",
      });
    }
  };

  const deleteEvent = async () => {
    try {
      const result = await dispatch(
        deleteAnUserEvent({
          userId: String(activeEvent?.user),
          idEvent: String(activeEvent?.id),
        })
      ).unwrap();
      if (result.title) {
        dispatch(
          showMessage({
            type: "success",
            description: `Se elimino el evento ${result.title}`,
          })
        );
      }
    } catch (error) {
      dispatch(
        showMessage({
          type: "error",
          description: "Lo sentimos hubo un error al eliminar",
        })
      );
    }
  };

  const responseDelete = async () => {
    await deleteEvent();
  };
  const handleDeleted = () => {
    SwalAlertDelete({
      title: ` ${activeEvent?.title}`,
      description: `¿Desea eliminar el evento?`,
      handleDeleted: responseDelete,
      handleResetButtons: handleResetEventActive,
    }).finally(() => dispatch(closeModalReducer()));
  };

  const handleSaveEvent = async (
    values: IEvent,
    { resetForm }: FormikHelpers<IEvent>
  ) => {
    console.log("nuevo");
    const event: IEventSave = {
      title: values.title,
      end: values.end,
      start: values.start,
      description: values.description,
      user_id: String(user.id),
    };
    try {
      const result = await dispatch(saveEventsOfUser(event)).unwrap();
      if (result.title) {
        dispatch(
          showMessage({
            type: "success",
            description: `Se creo el evento exitosamente ${result.title}`,
          })
        );
        resetForm();
        dispatch(closeModalReducer());
      }
    } catch (error) {
      dispatch(
        showMessage({
          type: "error",
          description: "Lo sentimos hubo un error",
        })
      );
    }
  };
  const handleUpdateEvent = async (
    values: IEvent,
    { resetForm }: FormikHelpers<IEvent>
  ) => {
    //si edit
    if (activeEvent) {
      const event: IEvent = {
        title: values.title,
        end: values.end,
        start: values.start,
        description: values.description,
        user: activeEvent.user,
        id: activeEvent.id,
      };
      try {
        const response = await dispatch(updateAnUserEvent(event)).unwrap();
        if (response.title) {
          dispatch(
            showMessage({
              type: "success",
              description: `Se actualizo el evento exitosamente ${response.title}`,
            })
          );
          resetForm();
          dispatch(closeModalReducer());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleClick = (idEvent: string) => {
    const anEvent = events.find((e) => e.id === idEvent);
    if (anEvent) {
      dispatch(eventSetActive(anEvent));
      dispatch(openModalReducer());
    } else {
      SwalAlertErrorSimple({
        title: "Error al seleccionar un evento",
        description: "Lo sentimos, intente más tarde",
      });
    }
  };
  const handleResetEventActive = () => {
    dispatch(eventActiveChangedToNull());
  };

  useEffect(() => {
    return () => {
      dispatch(eventActiveChangedToNull());
    };
  }, [dispatch]);

  return {
    handleSeletedEvent,
    deleteEvent,
    handleClick,
    handleResetEventActive,
    events,
    handleDeleted,
    handleSaveEvent,
    handleUpdateEvent,
  };
};

export default useEvent;
