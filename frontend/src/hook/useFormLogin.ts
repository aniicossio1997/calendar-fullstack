import { FormikState } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { SwalAlertErrorSimple } from "../components/Alert/SwalAlert";
import { authLogin } from "../features/auth/authActions";
import { IValuesLogin } from "../features/auth/validate";
import { resetMessage, showMessage } from "../features/ui/uiMessageSlice";

const useFormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { messages, user, isLogin } = useAppSelector(
    (state) => state.authState
  );
  const [isError, setIsError] = useState(false);
  const sendEmail = useCallback(
    async (
      value: IValuesLogin,
      restForm: (
        nextState?: Partial<FormikState<IValuesLogin>> | undefined
      ) => void
    ) => {
      console.log(isLogin);
      setIsError(false);
      await dispatch(authLogin(value))
        .unwrap()
        .then(() => {
          navigate("/");
          window.location.href = "/";
          restForm();
          //window.location.reload();
        })
        .catch((e: any) => {
          setIsError(true);
          SwalAlertErrorSimple({
            title: "Usuario no encontrado",
            description: "Error en el email o password",
          });
          console.log(e);
        });
    },
    []
  );

  return { sendEmail, isError, messages };
};

export default useFormLogin;
