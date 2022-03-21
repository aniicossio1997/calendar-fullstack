import { Container } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers, FormikState } from "formik";
import { useRef, useState } from "react";
import { InputText } from "../../components/form/InputText";
import { dataRegister } from "./dataForm";
import { IUserRegister } from "../../ts/interfaces/IUser";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  initialValuesRegister,
  IValuesRegister,
  RegisterSchema,
} from "./validate";
import { userRegister } from "./authActions";
import LayoutBaseForm from "../../components/form/LayoutBaseForm";

//index.ts, line 80

export const RegisterScreen = () => {
  const form = useRef<any>(null); // MutableRefObject<null>
  const navigate = useNavigate();
  const messages = useAppSelector((state) => state.authState.messages);
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState(false);
  const sendEmail = async (
    value: IValuesRegister,
    restForm: (
      nextState?: Partial<FormikState<IValuesRegister>> | undefined
    ) => void
  ) => {
    const dataResgister: IUserRegister = {
      name: value.name,
      email: value.email,
      password: value.password,
    };

    const response = await dispatch(userRegister(dataResgister));
    if (response.meta.requestStatus == "fulfilled") {
      navigate("/");
    } else {
      setIsError(true);
      console.log("lo sentimos intente de nuevo");
    }
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
            sendEmail(values, resetForm);
          }}
          validationSchema={RegisterSchema}
        >
          {({ handleReset, errors, touched }) => (
            <Form noValidate ref={form}>
              <LayoutBaseForm title="Register">
                {dataRegister.map(({ label, name, Component }) => (
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
export default RegisterScreen;
