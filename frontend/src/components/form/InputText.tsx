import {
  Box,
  ComponentWithAs,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Text,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

interface Props {
  label: string;
  name: string;
  type?: "text" | "email" | "textarea" | "password" | any;
  isRequired?: boolean;
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
              <FormControl isInvalid={meta.touched && meta.error}>
                <FormLabel htmlFor={name}>
                  {label}
                  {isRequired && RequiredText()}
                </FormLabel>
                <Field
                  {...field}
                  id={name}
                  component={Component}
                  name={name}
                  value={field.value || null}
                />
                {console.log("value", field.value)}
                <FormErrorMessage>{meta.error}</FormErrorMessage>
              </FormControl>
            </>
          )}
        </Field>
      </Box>
    </>
  );
};
