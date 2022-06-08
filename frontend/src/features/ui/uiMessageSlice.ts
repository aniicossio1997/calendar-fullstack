import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IMessageUI {
  isShow: boolean;
  description: string;
  type: "success" | "error" | null;
}
export interface IMessageUIParams {
  description: string;
  type: "success" | "error" | null;
}
export const initialMessage = {
  isShow: false,
  description: "",
  type: null,
};
const initialState: IMessageUI = {
  isShow: initialMessage.isShow,
  description: initialMessage.description,
  type: initialMessage.type,
};
const uiMessageSlice = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    showMessage(state: IMessageUI, action: PayloadAction<IMessageUIParams>) {
      const { description, type } = action.payload;
      state.description = description;
      state.type = type;
      state.isShow = true;
    },
    resetMessage(state: IMessageUI) {
      state.type = null;
      state.isShow = false;
      state.description = "";
    },
  },
});
export const { showMessage, resetMessage } = uiMessageSlice.actions;
export default uiMessageSlice.reducer;
