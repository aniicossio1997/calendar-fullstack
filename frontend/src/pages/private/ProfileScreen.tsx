import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import BaseForn from "../../components/profileComponents/BaseForn";
import { dataRegister } from "../../features/auth/dataForm";
import { IValuesRegister } from "../../features/auth/validate";
import { useAppSelector } from "../../app/hooks";
import { Form, Formik, FormikHelpers, FormikState } from "formik";
import { InputText } from "../../components/form/InputText";
import InputCustom from "../../components/form/inputCustomEvent/InputCustom";
import { dataFormPrivate } from "../../components/profileComponents/dataFormPrivate";

export default function ProfileScreen(): JSX.Element {
  const form = useRef<any>(null); // MutableRefObject<null>
  const user = useAppSelector((state) => state.authState.user);
  const [show, setShow] = React.useState(false);
  const [isError, setIsError] = useState(false);

  const handleClick = () => setShow(!show);
  const initialValues: IValuesRegister = {
    name: user.name,
    email: user.email,
    password: "",
    repitPassword: "",
  };
  const sendEmail = async (
    value: IValuesRegister,
    restForm: (
      nextState?: Partial<FormikState<IValuesRegister>> | undefined
    ) => void
  ) => {
    console.log("datos modificados");
  };
  return (
    <BaseForn handleShowBtnEdit={handleClick}>
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: IValuesRegister,
          { resetForm }: FormikHelpers<IValuesRegister>
        ) => {
          sendEmail(values, resetForm);
        }}
      >
        {({ handleReset, errors, touched }) => (
          <Form noValidate ref={form}>
            <Stack spacing={4}>
              {dataFormPrivate.map((dataForm) => (
                <InputText
                  key={dataForm.name}
                  label={dataForm.label}
                  name={dataForm.name}
                  Component={dataForm.Component}
                  isError={isError}
                  isDisabled={!show}
                />
              ))}
              <Stack
                spacing={6}
                direction={["column", "row"]}
                display={show ? "flex" : "none"}
              >
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Guardar
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </BaseForn>
  );
}
