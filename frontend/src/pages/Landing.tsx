import React from "react";
import { useEffect } from "react";

//import "../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authMe } from "../features/auth/authActions";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/spinner/LoaderSpinner";

const Landing = () => {
  const dispatch = useAppDispatch();
  const isStateLogin = useAppSelector((state) => state.authState.isLogin);
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = async () => {
      const response = await dispatch(authMe());
      if (response.meta.requestStatus == "rejected") {
        navigate("/login");
      } else {
        navigate("/calendar");
      }
    };

    const timeout = setTimeout(() => {
      isAuthenticated();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [dispatch]);

  return (
    <>
      <LoaderSpinner />
    </>
  );
};

export default Landing;
