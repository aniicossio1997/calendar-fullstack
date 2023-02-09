import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ICalendarModal {
  isOpen: boolean;
}
const initialState: ICalendarModal = {
  isOpen: false,
};
const calendarModalSlice = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    closeModalReducer(state) {
      state.isOpen = false;
    },
    openModalReducer(state) {
      state.isOpen = true;
    },
  },
});
export const { closeModalReducer, openModalReducer } =
  calendarModalSlice.actions;

export default calendarModalSlice.reducer;
