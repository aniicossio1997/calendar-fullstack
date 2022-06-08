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
  const [isLogin, setIsLogin] = useState(false);
  // useEffect(() => {
  //   const isAuthenticated = async () => {
  //     await dispatch(authMe())
  //       .unwrap()
  //       .then(() => navigate("/calendar"))
  //       .catch((e) => e);
  //   };
  //   isAuthenticated();
  // }, [dispatch, setIsLogin]);

  return isAuth ? <Navigate to={"/calendar"} replace /> : children;
};

export default PublicRoute;
