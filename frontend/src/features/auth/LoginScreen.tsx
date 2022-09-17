import { Container, Text, useColorModeValue } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { useRef } from "react";
import { InputText } from "../../components/form/InputText";
import { initialValuesLogin, LoginSchema, IValuesLogin } from "./validate";
import { dataLogin } from "./dataForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import LayoutBaseForm from "../../components/form/LayoutBaseForm";
import { Link } from "react-router-dom";
import SimpleAlert from "../../components/Alert/SimpleAlert";
import useFormLogin from "../../hook/useFormLogin";

export const LoginScreen = () => {
  const form = useRef<any>(null); // MutableRefObject<null>
  const dispatch = useAppDispatch();
  const { messages, user, isLogin } = useAppSelector(
    (state) => state.authState
  );
  const { sendEmail, isError } = useFormLogin();
  return (
    <>
      <Container bg={useColorModeValue("gray.50", "gray.800")}>
        <SimpleAlert />
        {/* {JSON.stringify(messages)} */}
        <Formik
          initialValues={initialValuesLogin}
          onSubmit={(
            values: IValuesLogin,
            { resetForm }: FormikHelpers<IValuesLogin>
          ) => {
            sendEmail(values, resetForm);
            //resetForm();
          }}
          validationSchema={LoginSchema}
        >
          {({ handleReset, errors, touched }) => (
            <Form noValidate ref={form}>
              <LayoutBaseForm title="Login">
                {dataLogin.map(({ label, name, Component }) => (
                  <InputText
                    key={name}
                    label={label}
                    name={name}
                    Component={Component}
                    isError={isError}
                  />
                ))}
                <Text color={"blackAlpha.700"} fontSize="xs">
                  ¿Usted no posee una cuenta?
                </Text>
                <Text color={"cyan.700"} fontSize="xs">
                  <Link to={"/register"}>Click Aqui</Link>
                </Text>
              </LayoutBaseForm>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};
