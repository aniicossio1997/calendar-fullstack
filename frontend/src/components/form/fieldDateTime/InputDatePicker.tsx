import React, { forwardRef, Ref, useRef, useState } from "react";
import { Field } from "formik";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  isEdit?: boolean;
  [x: string]: any;
}
export const InputDatePicker = forwardRef(
  (
    { name, label, dateRestric, isError = false, isEdit = false }: IProps,
    ref: Ref<any>
  ) => {
    const refInputDate = useRef<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    //console.log(refInputDate);
    return (
      <>
        <Box my={4}>
          <Field name={name}>
            {({ field, meta, form: { setFieldValue } }: any) => {
              return (
                <>
                  <FormControl
                    isInvalid={(meta.touched && meta.error) || isError}
                    isRequired
                  >
                    <FormLabel htmlFor={field.name} color={"gray.600"}>
                      {label}
                    </FormLabel>
                  </FormControl>
                  <DateTimePicker
                    name={field.name}
                    className={[
                      style.datePicker,
                      (meta.touched && meta.error) || isError
                        ? style.errorDatePicker
                        : "",
                      isOpen ? style.focusDataPicker : "",
                    ]}
                    format={"dd/MM/y  H:mm a"}
                    amPmAriaLabel={"Select AM/PM"}
                    value={field.value ? field.value : null}
                    onChange={(val) => {
                      setFieldValue(field.name, val);
                    }}
                    onCalendarOpen={() => setIsOpen(true)}
                    onCalendarClose={() => setIsOpen(false)}
                    minDate={dateRestric}
                  />
                  <FormControl
                    isInvalid={(meta.touched && meta.error) || isError}
                  >
                    <FormHelperText color={"gray.400"}>
                      La fecha de fin debe de ser superior a la de inicio
                    </FormHelperText>

                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                </>
              );
            }}
          </Field>
        </Box>
      </>
    );
  }
);

export default InputDatePicker;
