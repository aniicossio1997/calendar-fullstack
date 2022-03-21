import { Container, useColorModeValue } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers, FormikState } from "formik";
import { useRef, useState } from "react";
import { InputText } from "../../components/form/InputText";
import { initialValuesLogin, LoginSchema, IValuesLogin } from "./validate";
import { dataLogin } from "./dataForm";
import { useAppDispatch } from "../../app/hooks";
import { authLogin } from "./authActions";
import { useNavigate } from "react-router-dom";
import LayoutBaseForm from "../../components/form/LayoutBaseForm";

export const LoginScreen = () => {
  const form = useRef<any>(null); // MutableRefObject<null>
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bgContainer = useColorModeValue("gray.50", "gray.800");
  const bgForm = useColorModeValue("white", "gray.700");
  const [isError, setIsError] = useState(false);
  const sendEmail = async (
    value: IValuesLogin,
    restForm: (
      nextState?: Partial<FormikState<IValuesLogin>> | undefined
    ) => void
  ) => {
    const response = await dispatch(authLogin(value));
    if (response.meta.requestStatus === "rejected") {
      setIsError(true);
    } else {
      setIsError(false);
      restForm();
      navigate("/");
    }
  };
  return (
    <>
      <Container minH={"100vh"} bg={useColorModeValue("gray.50", "gray.800")}>
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
              </LayoutBaseForm>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};
