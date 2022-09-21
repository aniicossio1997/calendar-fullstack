import { FormikState } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { SwalAlertErrorSimple } from "../components/Alert/SwalAlert";
import { authLogin, authMe } from "../features/auth/authActions";
import { IValuesLogin } from "../features/auth/validate";
import { retriveEventsOfUser } from "../features/calendar/eventsActions";
import { resetMessage, showMessage } from "../features/ui/uiMessageSlice";
import { auth } from "../services/methodHttp";
import { IAuthResult } from "../ts/interfaces/IAuth";

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
      console.log("Is Login before ", isLogin);
      setIsError(false);
      try {
        const data = await dispatch(authLogin(value)).unwrap();
        try {
          const response = auth.me();
          const data = (await response).data as IAuthResult;
          //console.log("por el service", data.user);
        } catch (error) {
          console.log("por el service USTED NO ESTA AUTH");
        }
        if (data.user.id) {
          const authData = await dispatch(authMe()).unwrap();
          await dispatch(retriveEventsOfUser(data.user.id)).unwrap();
          //console.log("Dispacht", authData.user);
          //console.log("Is Login AFTER ", isLogin);
          const idTime = setTimeout(() => navigate("/calendar"), 3000);
          clearTimeout(idTime);
          // navigate("/calendar");
          //window.location.href = "/calendar";
          //restForm();
          //
        }
      } catch (error) {
        setIsError(true);
        SwalAlertErrorSimple({
          title: "Usuario no encontrado",
          description: "Error en el email o password",
        });
      }
    },
    []
  );

  return { sendEmail, isError, messages };
};

export default useFormLogin;
