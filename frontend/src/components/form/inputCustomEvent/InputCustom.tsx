import { Input } from "@chakra-ui/react";
import CSS from "csstype";

import React from "react";
import style from "./InputCustom.module.css";

const InputCustom = ({ ...rest }: any) => {
  return (
    <>
      <Input {...rest} />
    </>
  );
};

export default InputCustom;
