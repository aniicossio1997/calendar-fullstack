import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const PublicRoute = ({ children }: any) => {
  const { isLogin } = useAppSelector((state) => state.authState);

  return isLogin ? <Navigate to="/" /> : children;
};
