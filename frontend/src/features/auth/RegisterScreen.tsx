import { Container } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { useRef } from "react";
import { InputText } from "../../components/form/InputText";
import { dataRegister } from "./dataForm";
import {
  initialValuesRegister,
  IValuesRegister,
  RegisterSchema,
} from "./validate";
import LayoutBaseForm from "../../components/form/LayoutBaseForm";
import useFormRegister from "../../hook/useFormRegister";
import SimpleAlert from "../../components/Alert/SimpleAlert";

//index.ts, line 80

export const RegisterScreen = () => {
  const form = useRef<any>(null); // MutableRefObject<null>
  const { isError, sendEmail, messages } = useFormRegister();
  return (
    <>
      <Container>
        <SimpleAlert />
        {/* {JSON.stringify(messages)} */}
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
