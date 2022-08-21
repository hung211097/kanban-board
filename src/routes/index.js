import React, { useEffect } from "react";
import { Route, Routes as Switch } from "react-router-dom";
import HomePage from "pages/home";
import LoginPage from "pages/login";
import Page404 from "pages/404";
import PAGES from "./constants";
import PrivateRoutes from "./PrivateRoutes";

export const Routes = () => {
  useEffect(() => {}, []);

  return (
    <Switch>
      <>
        <Route
          path={PAGES.home}
          element={
            <PrivateRoutes>
              <HomePage />
            </PrivateRoutes>
          }
        />
        <Route path={PAGES.login} element={<LoginPage />} />
        <Route path="*" element={<Page404 />} />
      </>
    </Switch>
  );
};
