import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
interface IProps {
  auth: boolean;
  redirectPath?: string;
}
export const ProtectedRoute = ({ auth, redirectPath = "/landing" }: IProps) => {
  return auth ? <Outlet /> : <Navigate to="/login" />;
};
