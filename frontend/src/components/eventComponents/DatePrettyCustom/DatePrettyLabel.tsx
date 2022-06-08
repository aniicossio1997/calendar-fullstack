import { Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { DatePrettyContext } from "./DatePretty";

export interface IProps {
  label?: string;
}
export const DatePrettyLabel = ({ label = "" }: IProps) => {
  const { datePretty } = useContext(DatePrettyContext);
  let labelValue;
  if (label) {
    labelValue = label;
  } else {
    labelValue = datePretty.label;
  }
  return (
    <>
      <Text
        color={"gray.500"}
        display="inline-block"
        fontSize={{ base: "12px", md: "10px" }}
        textTransform={"capitalize"}
      >
        {labelValue}
      </Text>
    </>
  );
};
