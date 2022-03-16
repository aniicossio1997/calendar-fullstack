import React from "react";
import { Field } from "formik";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";

import style from "./style.module.css";
import "./style.module.css";
interface IProps {
  name: string;
  label: string;
  dateRestric?: Date;
  isError?: boolean;
  [x: string]: any;
}
export const InputDatePicker = ({
  name,
  label,
  dateRestric,
  isError = false,
}: IProps) => {
  return (
    <>
      <Box my={4}>
        <Field name={name}>
          {({ field, meta, form: { setFieldValue } }: any) => {
            return (
              <>
                <FormControl isInvalid={meta.touched && meta.error} isRequired>
                  <FormLabel htmlFor={field.name}>{label}</FormLabel>
                </FormControl>
                <DateTimePicker
                  name={field.name}
                  className={[
                    style.datePicker,
                    meta.error || isError ? style.errorDatePicker : "",
                  ]}
                  value={field.value || null}
                  onChange={(val) => {
                    setFieldValue(field.name, val);
                  }}
                  minDate={dateRestric}
                />
                <FormControl isInvalid={meta.error}>
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              </>
            );
          }}
        </Field>
      </Box>
    </>
  );
};

export default InputDatePicker;
