import { Badge, Box, Stack, Text, TextProps } from "@chakra-ui/react";
import React, { createContext, ReactElement, useState } from "react";
import { DatePrettyLabel } from "./DatePrettyLabel";
import { DatePrettyView } from "./DatePrettyView";

export interface IDatePretty {
  date: Date;
  label: string;
}
export interface IContexData {
  datePretty: IDatePretty;
}
export interface IDatePrettyContextProps {
  datePretty: IDatePretty;
  textProps?: TextProps;
  children?: ReactElement | ReactElement[];
}
export const DatePrettyContext = createContext({} as IContexData);
const { Provider } = DatePrettyContext;

export const DatePretty = ({
  datePretty,
  children,
  ...rest
}: IDatePrettyContextProps) => {
  return (
    <>
      <Provider value={{ datePretty }}>
        <Stack spacing={6}>
          <Box>{children}</Box>
        </Stack>
      </Provider>
    </>
  );
};
DatePretty.Label = DatePrettyLabel;
DatePretty.Date = DatePrettyView;
