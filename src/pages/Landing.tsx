import React, { useState } from "react";
import { useEffect } from "react";

//import "../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/spinner/LoaderSpinner";
interface IProps {
  isAuth: boolean;
}
const Landing = ({ isAuth }: IProps) => {
  const dispatch = useAppDispatch();
  const isStateLogin = useAppSelector((state) => state.authState.isLogin);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isStateLogin);
    if (isAuth) {
      navigate("/calendar");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <LoaderSpinner />
    </>
  );
};

export default Landing;
