import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { BiFilterAlt, BiSearch, BiSortAlt2, BiX } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetIsModified } from "../../features/calendar/calendarSlice";
import { retriveEventsOfUser } from "../../features/calendar/eventsActions";
import { initial } from "../../features/events/eventsSlice";
import useFilter from "../../hook/useFilter";
import { IEvent } from "../../ts/interfaces/IEvents";
import "./style.css";
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
const FilterFormEvent = () => {
  const dispatch = useAppDispatch();
  const { isModified } = useAppSelector((store) => store.eventsCalendar);
  const stateUserAuth = useAppSelector((store) => store.authState);

  const {
    filterValue,
    handleFilter,
    handleOrdered,
    handleRestart,
    ifChangeFilter,
    ifChangeOrder,
    orderValue,
  } = useFilter();
  const retriveEvents = async () => {
    let aux_events = await dispatch(retriveEventsOfUser(stateUserAuth.user.id));
    dispatch(initial(aux_events.payload as IEvent[]));
  };

  // if (isModified) {
  //   handleRestart();
  //   retriveEvents();
  //   dispatch(resetIsModified());
  // }
  return (
    <>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: 1, md: 6 }}
      >
        <InputGroup width={{ base: "100%", md: "50%" }}>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={BiSearch} />}
          />
          <Input type="search" placeholder="Search" />
        </InputGroup>
        <Flex flexDirection={"row"} gap={2} width={{ base: "100%", md: "40%" }}>
          <Select
            onChange={handleFilter}
            width={{ base: "50%", md: "100%" }}
            fontSize={{ base: "10px", lg: "15px" }}
            icon={<Icon as={BiFilterAlt} />}
            value={filterValue}
          >
            {!ifChangeFilter && (
              <option disabled value={""}>
                Filter
              </option>
            )}

            {options_filter.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select
            onChange={handleOrdered}
            width={{ base: "50%", md: "100%" }}
            icon={<Icon as={BiSortAlt2} />}
            fontSize={{ base: "10px", lg: "15px" }}
            textTransform="capitalize"
            value={orderValue}
          >
            {!ifChangeOrder && (
              <option disabled value={""}>
                Sort
              </option>
            )}
            {options_order.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Flex>

        <Button
          rightIcon={<Icon as={BiX} h={6} w={6} />}
          colorScheme={!(ifChangeFilter || ifChangeOrder) ? "gray" : "red"}
          variant="solid"
          padding={2}
          boxSizing="border-box"
          disabled={!(ifChangeFilter || ifChangeOrder) ? true : false}
          onClick={handleRestart}
          fontSize={{ base: "11px", md: "14px", lg: "15px" }}
        >
          Restart
        </Button>
      </Flex>
    </>
  );
};

export default FilterFormEvent;
