import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import { I18nProvider } from "./i18n";
import Registration from "./Screens/Registration";
import Home from "./Screens/Home";
function Router() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/register" exact element={<Registration />} />

          {localStorage.getItem("userData") && (
            <Route path="/home" exact element={<Home />} />
          )}

          <Route path="*" exact element={<Login />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default Router;
