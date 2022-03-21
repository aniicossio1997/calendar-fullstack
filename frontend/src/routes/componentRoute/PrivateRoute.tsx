import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authMe } from "../../features/auth/authActions";

interface IProps {
  children: JSX.Element;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isAuth?: boolean;
}
const PrivateRoute = ({ children, setError, isAuth = false }: IProps) => {
  return isAuth ? children : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
