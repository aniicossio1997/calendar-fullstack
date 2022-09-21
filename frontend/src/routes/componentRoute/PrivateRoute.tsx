import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authMe } from "../../features/auth/authActions";
import { LocalStorageService } from "../../services/ServiceLocalStore";

interface IProps {
  children: JSX.Element;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isAuth?: boolean;
}
const PrivateRoute = ({ children, setError, isAuth = false }: IProps) => {
  useEffect(() => {
    const token = LocalStorageService.getItem<string>("token");
    console.log("token", token);
  }, []);

  return isAuth ? children : <Navigate to={"/login"} replace />;
  //return children;
};

export default PrivateRoute;
