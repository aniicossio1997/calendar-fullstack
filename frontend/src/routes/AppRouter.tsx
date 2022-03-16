import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import { NotFound } from "../pages";
import { dataRoutes } from "./routes";

const AppRouter = () => {
  return (
    <>
      <Layout>
        <Suspense fallback="cargando....">
          <Routes>
            {dataRoutes.map((route) => (
              <Route
                key={route.to}
                path={route.path}
                element={<route.Component />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
};

export default AppRouter;
