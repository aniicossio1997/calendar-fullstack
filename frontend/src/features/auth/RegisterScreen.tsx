import { Button, Container, Stack } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { useRef } from "react";
import { InputText } from "../../components/form/InputText";
import { dataRegister } from "./dataForm";
import {
  initialValuesRegister,
  IValuesRegister,
  RegisterSchema,
} from "./validate";

//index.ts, line 80

export const RegisterScreen = () => {
  const form = useRef<any>(null); // MutableRefObject<null>

  const sendEmail = (value: IValuesRegister) => {
    console.log("hello", value);
  };
  return (
    <>
      <Container>
        <Formik
          initialValues={initialValuesRegister}
          onSubmit={(
            values: IValuesRegister,
            { resetForm }: FormikHelpers<IValuesRegister>
          ) => {
            console.log("estoy en el onSumit");
            sendEmail(values);
            resetForm();
          }}
          validationSchema={RegisterSchema}
        >
          {({ handleReset, errors, touched }) => (
            <Form noValidate ref={form}>
              {dataRegister.map(({ label, name, Component }) => (
                <InputText
                  key={name}
                  label={label}
                  name={name}
                  Component={Component}
                />
              ))}
              <Stack direction={"column"} spacing={4} mt={5}>
                <Button
                  colorScheme="pink"
                  variant="solid"
                  type={"submit"}
                  width={"fullWidth"}
                >
                  Send
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};
export default RegisterScreen;
