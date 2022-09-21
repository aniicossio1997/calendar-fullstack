import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authMe } from "../features/auth/authActions";

const useRoute = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.authState);
  const [isAuth, setIsAuth] = useState(false);
  const [isWait, setIsWait] = useState(true);
  const navigate = useNavigate();
  let falseAuth;
  useEffect(() => {
    //esperar
    setIsWait(true);
    //no esta autentificado
    setIsAuth(false);
    const isAuthenticated = async () => {
      const value = await dispatch(authMe())
        .unwrap()
        .then((e) => {
          setIsAuth(isLogin);
        })
        .catch(() => {
          navigate("/login");
          setIsAuth(isLogin);
        })
        .finally(() => {
          console.log("del estado de redux en finnally", isLogin);
          setIsWait(false);
        });
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
