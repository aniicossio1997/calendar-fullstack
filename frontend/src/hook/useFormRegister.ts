import { FormikState } from "formik";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userRegister } from "../features/auth/authActions";
import { IValuesRegister } from "../features/auth/validate";
import { showMessage } from "../features/ui/uiMessageSlice";
import { IBadRequestUser, IUserRegister } from "../ts/interfaces/IUser";

const useFormRegister = () => {
  const navigate = useNavigate();
  const messages = useAppSelector((state) => state.authState.messages);
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState(false);
  const sendEmail = useCallback(
    async (
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

      await dispatch(userRegister(dataResgister))
        .unwrap()
        .then(() => {
          dispatch(
            showMessage({
              type: "success",
              description: `Se ha creado el usuario exitosamente`,
            })
          );
          navigate("/login");
        })
        .catch((error: IBadRequestUser) => {
          console.log(error);
          setIsError(true);
          console.log("lo sentimos intente de nuevo");
          dispatch(
            showMessage({
              type: "error",
              description: error.msg,
            })
          );
        });
    },
    []
  );

  return { sendEmail, isError, messages };
};

export default useFormRegister;
