import React, { forwardRef, useState } from "react";
import { Field } from "formik";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import "./style.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AuxDate from "./AuxDate";

interface IProps {
  name: string;
  label: string;
  dateRestric?: Date;
  isError?: boolean;
  isEdit?: boolean;
  [x: string]: any;
}
interface IField {
  name: string;
  onBlur: void;
  onChange: void;
  value: null | string | Date;
}

export const InputDatePicker = forwardRef(
  (
    { name, label, dateRestric, isError = false, isEdit = false }: IProps,
    ref: any
  ) => {
    const [selectedDate, handleDateChange] = useState<Date>(new Date());
    const [isOpen, setIsOpen] = useState(false);
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
                    ref={ref}
                  >
                    <FormLabel
                      htmlFor={field.name}
                      color={"gray.600"}
                      fontSize={{ base: "12", md: "15px" }}
                    >
                      {label}
                    </FormLabel>
                  </FormControl>
                  {console.log(new Date(field.value))}
                  {console.log("Fiel =>> ", field)}
                  {/* <DateTimePicker
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
                  /> */}
                  <AuxDate />

                  <FormControl
                    isInvalid={(meta.touched && meta.error) || isError}
                  >
                    <FormHelperText
                      color={"blackAlpha.600"}
                      fontSize={{ base: "10px", md: "12px", lg: "15px" }}
                    >
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
