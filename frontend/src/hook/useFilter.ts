import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { resetIsModified } from "../features/calendar/calendarSlice";
import { retriveEventsOfUser } from "../features/calendar/eventsActions";
import {
  eventsCurrent,
  eventsOrderedByAsc,
  eventsOrderedByDateAsc,
  eventsOrderedByDateDesc,
  eventsOrderedByDesc,
  eventsPast,
  initial,
} from "../features/events/eventsSlice";
import { IEvent } from "../ts/interfaces/IEvents";
import useEvent from "./useEvent";

export const orderBy = {
  EVENTS_ASC: "A-Z",
  EVENTS_DESC: "Z-A",
  EVENTS_DATE_ASC: "Date ▲",
  EVENTS_DATE_DESC: "Date ▼",
  EVENTS_INITIAL_ORDER: "Order",
};
export const filterBy = {
  EVENTS_INITIAL_ALL: "Events",
  EVENTS_CURRENT: "current",
  EVENTS_PAST: "past",
};
interface IOption {
  label: string;
  value: string;
}
const options_filter: IOption[] = [
  { label: filterBy.EVENTS_PAST, value: filterBy.EVENTS_PAST },
  { label: filterBy.EVENTS_CURRENT, value: filterBy.EVENTS_CURRENT },
];
const options_order: IOption[] = [
  { label: orderBy.EVENTS_ASC, value: orderBy.EVENTS_ASC },
  { label: orderBy.EVENTS_DESC, value: orderBy.EVENTS_DESC },
  { label: orderBy.EVENTS_DATE_ASC, value: orderBy.EVENTS_DATE_ASC },
  { label: orderBy.EVENTS_DATE_DESC, value: orderBy.EVENTS_DATE_DESC },
];
interface IProps {
  valueIfchangedEvents?: string;
}
const useFilter = () => {
  const dispatch = useAppDispatch();
  const stateUserAuth = useAppSelector((store) => store.authState);
  const { events } = useEvent();
  const { isModified } = useAppSelector((store) => store.eventsCalendar);

  const [ifChangeOrder, setIfChangeOrder] = useState(false);
  const [ifChangeFilter, setIfChangeFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [orderValue, setOrderValue] = useState("");
  const handleOrdered = (value: React.ChangeEvent<HTMLSelectElement>) => {
    const order = value.target.value;
    setIfChangeOrder(true);
    setOrderValue(order);
    switch (order) {
      case orderBy.EVENTS_ASC:
        dispatch(eventsOrderedByAsc(events));
        break;
      case orderBy.EVENTS_DESC:
        dispatch(eventsOrderedByDesc(events));
        break;
      case orderBy.EVENTS_DATE_ASC:
        dispatch(eventsOrderedByDateAsc(events));
        break;
      case orderBy.EVENTS_DATE_DESC:
        dispatch(eventsOrderedByDateDesc(events));
        break;
      default:
    }
  };
  const handleFilter = (value: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = value.target.value;
    setFilterValue(filter);
    setIfChangeFilter(true);
    switch (filter) {
      case filterBy.EVENTS_CURRENT:
        dispatch(eventsCurrent(events));
        break;
      case filterBy.EVENTS_PAST:
        dispatch(eventsPast(events));
        break;
      default:
        break;
    }
  };
  const handleRestart = async () => {
    setFilterValue("");
    setOrderValue("");
    setIfChangeFilter(false);
    setIfChangeOrder(false);
    try {
      await dispatch(retriveEventsOfUser(stateUserAuth.user.id));
      dispatch(initial(events));
    } catch (error) {}
  };

  const compare = () => {};
  const result = useMemo(() => compare(), []);

  return {
    ifChangeFilter,
    ifChangeOrder,
    handleRestart,
    handleFilter,
    handleOrdered,
    filterValue,
    orderValue,
  };
};

export default useFilter;
