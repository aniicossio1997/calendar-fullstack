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
const orderByDesc = (events: IEvent[]) => {
  return events.sort((a, b) => {
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

    if (fa > fb) {
      return -1;
    }
    if (fa < fb) {
      return 1;
    }
    return 0;
  });
};
const eventsSlice = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    initial(state, action: PayloadAction<IEvent[]>) {
      state.events = action.payload;
    },
    eventsOrderedbySort(state, action: PayloadAction<IEvent[]>) {
      const auxEvents = [...action.payload];
      state.events = orderBySort(auxEvents);
    },
    eventsOrderedbyDesc(state, action: PayloadAction<IEvent[]>) {
      const auxEvents = [...action.payload];
      state.events = orderByDesc(auxEvents);
    },
    eventsActive(state, action: PayloadAction<IEvent[]>) {
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
  eventsOrderedbySort,
  eventsOrderedbyDesc,
  eventsActive,
  eventsPast,
} = eventsSlice.actions;
export default eventsSlice.reducer;
