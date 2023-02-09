import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authMe } from "../../features/auth/authActions";

interface IProps {
  children: JSX.Element;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isAuth?: boolean;
}
const PublicRoute = ({ children, setError, isAuth = false }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState();
  useEffect(() => {
    const isAuthenticated = async () => {
      await dispatch(authMe())
        .unwrap()
        .then(() => console.log("USTED ESTA LOGUADO"))
        .catch((e) => e);
    };
    isAuthenticated();
  }, [dispatch, setIsLogin]);

  return isAuth ? <Navigate to={"/"} replace /> : children;
  //return children;
};

export default PublicRoute;
