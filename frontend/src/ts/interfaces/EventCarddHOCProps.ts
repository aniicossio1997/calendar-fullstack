import React from "react";
import { IEvent } from "./IEvents";
import { IProps as DatePrettyLabel } from "../../components/eventComponents/DatePrettyCustom/DatePrettyLabel";
interface IEventProps {
  event: IEvent;
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
    | undefined;
}
export interface EventCarddHOCProps {
  ({ children, event }: IEventProps): JSX.Element;

  Title: (Props: DatePrettyLabel) => JSX.Element;
}
