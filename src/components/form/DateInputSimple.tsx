import { Input } from "@chakra-ui/react";
import React from "react";

const DateInputSimple = ({ ...rest }: any) => {
  return (
    <Input
      size="md"
      type="datetime-local"
      pattern={"DD/MM/YYYY HH:mm"}
      {...rest}
    />
  );
};

export default DateInputSimple;
