import { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Layout from "../components/Layout";
import { useState } from "react";
import { authMe } from "../features/auth/authActions";
import { Route, Routes, useNavigate } from "react-router-dom";
import { publicDataRoutes } from "./public.routes";
import PublicRoute from "./componentRoute/PublicRoute";
import { privateDataRoutes } from "./private.routes";
import PrivateRoute from "./componentRoute/PrivateRoute";
import { NotFound } from "../pages";
import LayoutWithNavbarSidebar from "../layout/private/LayoutWithNavbarSidebar";
import Landing from "../pages/Landing";
import LoaderSpinner from "../components/spinner/LoaderSpinner";
import useRoute from "./useRoute";
const AppRouter = () => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { messages, status } = useAppSelector((state) => state.authState);
  const [isClose, setIsClose] = useState(false);
  const { isAuth, isWait, isLogin } = useRoute();

  return (
    <>
      {isWait && <LoaderSpinner />}
      <Suspense fallback={<LoaderSpinner />}>
        <Routes>
          {!isWait && (
            <>
              <Route path="/" element={<Landing isAuth={isAuth} />} />
              <Route path="/calendar" element={<LayoutWithNavbarSidebar />}>
                {privateDataRoutes.map((route) => (
                  <Route
                    key={route.to}
                    path={route.path}
                    element={
                      <PrivateRoute setError={setError} isAuth={isLogin}>
                        <route.Component />
                      </PrivateRoute>
                    }
                  />
                ))}
              </Route>
              <Route element={<Layout />}>
                {publicDataRoutes.map((route) => (
                  <Route
                    index={route.path === "login"}
                    key={route.to}
                    path={route.path}
                    element={
                      <PublicRoute setError={setError} isAuth={isLogin}>
                        <route.Component />
                      </PublicRoute>
                    }
                  />
                ))}
              </Route>
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRouter;
