import {
  Container,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import BaseCalendar from "../../components/calendar/BaseCalendar";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { LocalStorageService } from "../../services/ServiceLocalStore";
import Event from "../../components/eventComponents/Event";
import useEvent from "../../hook/useEvent";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initial } from "../../features/events/eventsSlice";
import { retriveEventsOfUser } from "../../features/calendar/eventsActions";
import { IEvent } from "../../ts/interfaces/IEvents";
import { resetMessage } from "../../features/ui/uiMessageSlice";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import { BiSearch, BiSortAlt2 } from "react-icons/bi";

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

const options_order = [
  { label: orderBy.EVENTS_ASC, value: "title,asc" },
  {
    label: orderBy.EVENTS_DESC,
    value: "title,desc",
  },
  {
    label: orderBy.EVENTS_DATE_ASC,
    value: "start,asc",
  },
  {
    label: orderBy.EVENTS_DATE_DESC,
    value: "start,desc",
  },
];

const EventsScreen = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.authState);
  const { events, handleClick } = useEvent();
  const [view, setView] = useState<boolean>(
    LocalStorageService.getItem<boolean>("viewEvents") || false
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const componentWillUnmount = useRef(null);

  let [params, setParams] = useSearchParams();
  const [orderValueType, setOrderValueType] = useState("");
  const [filterOrderValue, setFilterOrderValue] = useState("");

  const { data, error, loading, fetchData } = useFetch(
    `http://localhost:8000/api/users/${user.id.toString()}/events`,
    false
  );

  const handleAddSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let search = e.target.value;
    console.log(search);
    if (search) {
      params.set("search", search);
      setParams(params);
    } else {
      params.delete("search");
      setParams(params);
    }
  };
  const handleAddSort = (value: React.ChangeEvent<HTMLSelectElement>) => {
    let order: any = value.target.value;
    setOrderValueType(order);
    let sort: Array<String> = order.split(",");
    console.log(sort[0], sort[1]);
    console.log(params.entries.length > 0);
    if (sort) {
      console.log("ok, sort");
      params.set("sort", sort.map((value) => `${value}`).join(","));
      setParams(params);
    }
  };
  const handleAddOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value: any = e.target.value;
    setFilterOrderValue(value);
    let filter: Array<String> = value.split(",");
  };
  const handleView = () => {
    setIsVisible((prevValue) => !prevValue);
    setIsAnimate(false);
    LocalStorageService.setItem("viewEvents", !view);
    setView(!view);
    setIsAnimate(true);
    setIsVisible(true);
  };
  useEffect(() => {
    return () => {
      dispatch(resetMessage());
    };
  }, []);

  useEffect(() => {
    console.log(params.get("sort"));
    let paramsAux = "";
    let sort = params.get("sort") ? `&sort=${params.get("sort")}` : "";
    if (Boolean(params.get("search"))) {
      paramsAux = `search=${params.get("search")}${sort}`;
    }
    fetchData(paramsAux);
  }, [params]);

  const getEvents = async () => {
    let aux_events = (await (
      await dispatch(retriveEventsOfUser(user.id))
    ).payload) as IEvent[];
    dispatch(initial(aux_events));
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error !== "") {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <BaseCalendar>
        <Flex justify={"flex-start"} width={"100%"} ref={componentWillUnmount}>
          <Container maxW="100%">
            {/* <InputGroup width={{ base: "100%", md: "50%" }}>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={BiSearch} />}
              />
              <Input
                type="search"
                placeholder="Search"
                value={params.get("search") || ""}
                onChange={handleAddSearch}
              />
            </InputGroup>
            <Select
              onChange={handleAddSort}
              width={{ base: "50%", md: "100%" }}
              icon={<Icon as={BiSortAlt2} />}
              fontSize={{ base: "10px", lg: "15px" }}
              textTransform="capitalize"
              value={orderValueType}
            >
              {orderValueType === "" && (
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
            <Select
              onChange={handleAddOrder}
              width={{ base: "50%", md: "100%" }}
              fontSize={{ base: "10px", lg: "15px" }}
              icon={<Icon as={BiSortAlt2} />}
              value={filterOrderValue}
            >
              {!filterOrderValue && (
                <option disabled value={""}>
                  Filter
                </option>
              )}

              {options_filter.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select> */}
            <IconButton
              display={{ base: "none", md: "flex" }}
              aria-label="view"
              color={"gray.500"}
              icon={
                <Icon as={view ? BsFillGrid3X3GapFill : TiThMenu} w={8} h={8} />
              }
              my={4}
              onClick={handleView}
            />

            <AnimateSharedLayout>
              <AnimatePresence initial={false}>
                <motion.div>
                  <SimpleGrid
                    columns={{ base: 1, md: view ? 1 : 2, xl: view ? 1 : 3 }}
                    transitionDuration={"2"}
                    spacing={{ base: 4, lg: 6 }}
                    my={3}
                    bg={"gray.100"}
                    rounded={"md"}
                    padding={2}
                    height={"auto"}
                    boxSizing="border-box"
                  >
                    {data.map((event) => (
                      <Event
                        key={event.id}
                        event={event}
                        handleClick={handleClick}
                      />
                    ))}
                  </SimpleGrid>
                </motion.div>
              </AnimatePresence>
            </AnimateSharedLayout>
          </Container>
        </Flex>
      </BaseCalendar>
    </>
  );
};

export default EventsScreen;
