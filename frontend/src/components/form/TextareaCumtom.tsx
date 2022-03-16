import { Textarea } from "@chakra-ui/react";
import React from "react";

const TextareaCumtom = ({ ...props }: any) => {
  return (
    <>
      <Textarea size={"md"} resize={"none"} {...props} />
    </>
  );
};

export default TextareaCumtom;
