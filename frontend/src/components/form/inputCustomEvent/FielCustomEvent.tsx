import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Field, FormikErrors } from "formik";
import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { IEvent } from "../../../ts/interfaces/IEvents";
import "../style.css";
interface Props {
  label: string;
  name: string;
  isRequired?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  [x: string]: any;
  Component: typeof Input | typeof Textarea | React.ReactChildren;
  valuesForm?: IEvent;
  errorStart?: FormikErrors<Date> | undefined;
}
const RequiredText = () => {
  return <span style={{ color: "red" }}> *</span>;
};
export const FielCustomEvent = ({
  label,
  name,
  Component,
  isRequired = true,
  isError = false,
  isDisabled = false,
  valuesForm = {} as IEvent,
  errorStart = undefined,
  ...rest
}: Props) => {
  const activeEvent = useAppSelector(
    (state) => state.eventsCalendar.activeEvent
  );
  return (
    <>
      <Box mb={5}>
        <Field name={name}>
          {({
            field, // { name, value, onChange, onBlur }
            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: any) => (
            <>
              <FormControl isInvalid={(meta.touched && meta.error) || isError}>
                <FormLabel
                  htmlFor={name}
                  color={"gray.600"}
                  fontSize={{ base: "12", md: "15px" }}
                  textTransform="capitalize"
                >
                  {label}
                  {isRequired && RequiredText()}
                </FormLabel>
                <Field
                  {...field}
                  {...rest}
                  id={name}
                  as={Component}
                  name={name}
                  value={field.value || ""}
                />
                <FormErrorMessage>{meta.error}</FormErrorMessage>
              </FormControl>
            </>
          )}
        </Field>
      </Box>
    </>
  );
};
