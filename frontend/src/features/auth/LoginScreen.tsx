import { Container, useColorModeValue } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers, FormikState } from "formik";
import { useRef, useState } from "react";
import { InputText } from "../../components/form/InputText";
import { initialValuesLogin, LoginSchema, IValuesLogin } from "./validate";
import { dataLogin } from "./dataForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authLogin } from "./authActions";
import { useNavigate } from "react-router-dom";
import LayoutBaseForm from "../../components/form/LayoutBaseForm";
import { retriveEventsOfUser } from "../calendar/eventsActions";

export const LoginScreen = () => {
  const form = useRef<any>(null); // MutableRefObject<null>
  const dispatch = useAppDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const { messages, user, isLogin } = useAppSelector(
    (state) => state.authState
  );

  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const sendEmail = async (
    value: IValuesLogin,
    restForm: (
      nextState?: Partial<FormikState<IValuesLogin>> | undefined
    ) => void
  ) => {
    console.log(isLogin);
    setIsAuth(false);
    await dispatch(authLogin(value))
      .unwrap()
      .then((response) => {
        setIsAuth(true);
        //window.location.href = "/";
        navigate("/");
        restForm();
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Container bg={useColorModeValue("gray.50", "gray.800")}>
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
