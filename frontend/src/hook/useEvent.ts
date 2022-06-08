import { EventClickArg } from "@fullcalendar/react";
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
  deleteAnUserevent,
  retriveEventsOfUser,
} from "../features/calendar/eventsActions";
import {
  closeModalReducer,
  openModalReducer,
} from "../features/modal/calendarModalSlice";
import { resetMessage, showMessage } from "../features/ui/uiMessageSlice";
import { IEvent } from "../ts/interfaces/IEvents";
interface IProps {
  events?: IEvent[];
}
const useEvent = () => {
  const dispatch = useAppDispatch();
  const { activeEvent, events } = useAppSelector(
    (store) => store.eventsCalendar
  );
  const user = useAppSelector((state) => state.authState.user);

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
        deleteAnUserevent({
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
    const retriveEvents = async () => {
      await dispatch(retriveEventsOfUser(user.id));
    };
    retriveEvents();
  }, [dispatch]);
  useEffect(() => {
    return () => {
      dispatch(eventActiveChangedToNull());
      dispatch(resetMessage());
    };
  }, [dispatch]);

  return {
    handleSeletedEvent,
    deleteEvent,
    handleClick,
    handleResetEventActive,
    events,
    handleDeleted,
  };
};

export default useEvent;
