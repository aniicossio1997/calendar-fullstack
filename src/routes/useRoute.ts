import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authMe, authMev2 } from "../features/auth/authActions";

const useRoute = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.authState);
  const [isAuth, setIsAuth] = useState(false);
  const [isWait, setIsWait] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    //esperar
    setIsWait(true);
    //no esta autentificado
    setIsAuth(false);
    const isAuthenticated = async () => {
      const value = await dispatch(authMev2())
       
    };
    const timeout = setTimeout(() => {
      isAuthenticated();
      setIsWait(false);
      console.log("is auth: ", isAuth);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, setIsAuth, setIsWait]);

  return { isWait, isAuth, isLogin };
};

export default useRoute;
