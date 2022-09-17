import {
  Grid,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch } from "../../app/hooks";
import {
  eventsActive,
  eventsOrderedbyDesc,
  eventsOrderedbySort,
  eventsPast,
  initial,
} from "../../features/events/eventsSlice";
import useEvent from "../../hook/useEvent";

export const orderBy = {
  EVENTS: "0",
  EVENTS_VIGENTES: "1",
  EVENTS_PAST: "2",
  EVENTS_ASC: "3",
  EVENTS_DESC: "4",
};

const NavbarFormEvent = () => {
  const dispatch = useAppDispatch();
  const { events } = useEvent();

  const handleSelected = (value: React.ChangeEvent<HTMLSelectElement>) => {
    const order = value.target.value;
    switch (order) {
      case orderBy.EVENTS:
        dispatch(initial(events));
        break;
      case orderBy.EVENTS_ASC:
        dispatch(eventsOrderedbySort(events));
        break;
      case orderBy.EVENTS_DESC:
        dispatch(eventsOrderedbyDesc(events));
        break;
      case orderBy.EVENTS_VIGENTES:
        dispatch(eventsActive(events));
        break;
      case orderBy.EVENTS_PAST:
        dispatch(eventsPast(events));
        break;

      default:
        console.log(`Sorry, we are out `);
    }
  };
  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={4}
        my={3}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={BiSearch} />}
          />
          <Input type="search" placeholder="Search" />
        </InputGroup>
        <Select onChange={handleSelected}>
          <option value={orderBy.EVENTS}>Order</option>
          <option value={orderBy.EVENTS_VIGENTES}>Eventos vigente</option>
          <option value={orderBy.EVENTS_PAST}>Eventos pasadas</option>
          <option value={orderBy.EVENTS_ASC}>A-Z</option>
          <option value={orderBy.EVENTS_DESC}>Z-A</option>
        </Select>
      </Grid>
    </>
  );
};

export default NavbarFormEvent;
