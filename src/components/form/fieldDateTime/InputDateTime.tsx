import React, { useState } from "react";
import { useField, FieldHookConfig } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import moment from "moment";

interface IProps {
  label: string;
  [x: string]: any | FieldHookConfig<any>;
  name: string;
}

function helperDate(date: Date) {
  let now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes()
  );
  return now_utc;
}
const InputDateTime = ({ label, name, ...props }: IProps) => {
  const [field, meta, form] = useField(name);
  const { setValue } = form;
  const [valueAux, setValueAux] = useState<any>(field.value ? field.value : "");

  return (
    <>
      <FormControl isInvalid={meta.touched && meta.error ? true : false}>
        <FormLabel
          htmlFor={name}
          color={"gray.600"}
          fontSize={{ base: "12", md: "15px" }}
          textTransform="capitalize"
        >
          {label}
          <span style={{ color: "red" }}> *</span>
        </FormLabel>

        <Input
          id={name}
          type={"datetime-local"}
          {...field}
          {...props}
          value={moment(valueAux).format("yyyy-MM-DDTHH:mm").toString()}
          onChange={(d: any) => {
            setValue(d?.target.value);
            setValueAux(d?.target.value);
          }}
        />
        {/* <Text>2018-06-07T00:00</Text>
        <Text>{moment(valueAux).format("yyyy-MM-DDT00:00").toString()}</Text> */}
        {meta.touched && meta.error ? (
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        ) : null}
      </FormControl>
    </>
  );
};

export default InputDateTime;
