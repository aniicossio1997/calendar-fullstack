import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";
import "./style.css";
interface Props {
  label: string;
  name: string;
  isRequired?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  [x: string]: any;
  Component: typeof Input | typeof Textarea | React.ReactChildren;
}
const RequiredText = () => {
  return <span style={{ color: "red" }}> *</span>;
};
export const InputText = ({
  label,
  name,
  Component,
  isRequired = true,
  isError = false,
  isDisabled = false,
  ...rest
}: Props) => {
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
                <FormLabel htmlFor={name}>
                  {label}
                  {isRequired && RequiredText()}
                </FormLabel>
                <Field
                  {...field}
                  id={name}
                  as={Component}
                  name={name}
                  value={field.value || ""}
                  isDisabled={isDisabled}
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
