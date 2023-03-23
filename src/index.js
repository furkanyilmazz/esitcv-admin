import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Router from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";

import { MetronicI18nProvider } from "./i18n";
import Error from "./Screens/Error";

const root = ReactDOM.createRoot(document.getElementById("root"));

const isMobilePhone = () => {
  if (typeof window.orientation !== "undefined") {
    return true;
  }
  return (
    navigator.userAgent.indexOf("IEMobile") !== -1 ||
    !!navigator.userAgent.match(/Windows Phone/i) ||
    !!navigator.userAgent.match(/WPDesktop/i) ||
    !!navigator.userAgent.match(/IEMobile/i) ||
    !!navigator.userAgent.match(/Windows Phone/i) ||
    !!navigator.userAgent.match(/WindowsMobile/i)
  );
};

console.log(isMobilePhone());

root.render(
  <React.StrictMode>
    {isMobilePhone() ? (
      <Error />
    ) : (
      <MetronicI18nProvider>
        <Router />
      </MetronicI18nProvider>
    )}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
