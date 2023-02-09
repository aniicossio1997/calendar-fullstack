import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { IEvent } from "../../ts/interfaces/IEvents";

interface IData {
  events: IEvent[];
}
const initialState = {
  events: [] as IEvent[],
};
const orderBySort = (events: IEvent[]) => {
  return events.sort((a, b) => {
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
};
const checkDesc = (fa: string, fb: string) => {
  if (fa > fb) {
    return -1;
  }
  if (fa < fb) {
    return 1;
  }
  return 0;
};
const orderByDesc = (events: IEvent[]) => {
  return events.sort((a, b) => {
    let fa = a.title.toLowerCase().toString(),
      fb = b.title.toLowerCase();

    return checkDesc(fa, fb);
  });
};
const orderById = (events: IEvent[]) => {
  return events.sort((a, b) => {
    let e1 = a.id as string;
    let e2 = b.id as string;
    return checkDesc(e1, e2);
  });
};

const orderbyDateDesc = (events: IEvent[]) => {
  return events.sort(
    (objA, objB) =>
      new Date(objB.start).getTime() - new Date(objA.start).getTime()
  );
};
const orderbyDateAsc = (events: IEvent[]) => {
  const sortedAsc = events.sort(
    (objA, objB) =>
      new Date(objA.start).getTime() - new Date(objB.start).getTime()
  );
  return sortedAsc;
};
const eventsSlice = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    initial(state, action: PayloadAction<IEvent[]>) {
      state.events = action.payload;
    },
    eventsOrderedByAsc(state, action: PayloadAction<IEvent[]>) {
      state.events = orderBySort(state.events);
    },
    eventsOrderedByDesc(state, action: PayloadAction<IEvent[]>) {
      state.events = orderByDesc(state.events);
    },
    eventsOrderedByDateDesc(state, action: PayloadAction<IEvent[]>) {
      state.events = orderbyDateDesc(state.events);
    },
    eventsOrderedByDateAsc(state, action: PayloadAction<IEvent[]>) {
      state.events = orderbyDateAsc(state.events);
    },
    eventsCurrent(state, action: PayloadAction<IEvent[]>) {
      state.events = action.payload.filter((event) =>
        moment(new Date()).isSameOrBefore(moment(event.start))
      );
    },
    eventsPast(state, action: PayloadAction<IEvent[]>) {
      state.events = action.payload.filter((event) =>
        moment(new Date()).isSameOrAfter(moment(event.start))
      );
    },
  },
});
export const {
  initial,
  eventsOrderedByAsc,
  eventsOrderedByDesc,
  eventsCurrent,
  eventsPast,
  eventsOrderedByDateAsc,
  eventsOrderedByDateDesc,
} = eventsSlice.actions;
export default eventsSlice.reducer;
