import { Button, Container, Stack } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { useRef } from "react";
import { InputText } from "../../components/form/InputText";
import { initialValuesLogin, LoginSchema, IValuesLogin } from "./validate";
import { dataLogin } from "./dataForm";

export const LoginScreen = () => {
  const form = useRef<any>(null); // MutableRefObject<null>

  const sendEmail = (value: IValuesLogin) => {};
  return (
    <>
      <Container>
        <Formik
          initialValues={initialValuesLogin}
          onSubmit={(
            values: IValuesLogin,
            { resetForm }: FormikHelpers<IValuesLogin>
          ) => {
            sendEmail(values);
            resetForm();
          }}
          validationSchema={LoginSchema}
        >
          {({ handleReset, errors, touched }) => (
            <Form noValidate ref={form}>
              {dataLogin.map(({ label, name, Component }) => (
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
