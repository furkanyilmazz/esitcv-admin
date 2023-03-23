import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import esitCV from "../assets/esitcvlogobeyaz.png";
import { FormattedMessage, injectIntl } from "react-intl";

const initialValues = {
  email: "fuykan37@icloud.com",
  password: "Fuykan1041!",
};

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Yanlış E-Mail Formatı")
      .min(3, "Minimum 3 karakter")
      .max(50, "Maximum 50 karakter")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 karakter")
      .max(50, "Maximum 50 karakter")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const navigate = useNavigate();

  const GoToHome = () => {
    return navigate("/home");
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        axios
          .post("https://api.esitcv.com/api/Auth/CompanyLoginWithEmail", {
            password: values.password,
            emailAddress: values.email,
          })
          .then((response) => {
            disableLoading();
            console.log(response.data);
            if (response.data.resultStatus === 0) {
              console.log("Giriş Başarılı");
              GoToHome();
              localStorage.setItem(
                "userData",
                JSON.stringify(response.data.data)
              );
            }
          })
          .catch(() => {
            setStatus(
              intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_LOGIN",
              })
            );
          })
          .finally(() => {
            disableLoading();
            setSubmitting(false);
          });
      }, 1000);
    },
  });

  return (
    <div
      className="login-form login-signin"
      id="kt_login_signin_form"
      style={{
        flexdirection: "column",
        display: "flex",
      }}
    >
      <div
        className="d-flex flex-column flex-root"
        style={{
          flexdirection: "column",
          height: "100vh",
          width: "30vw",
          backgroundColor: "#301934",
        }}
      >
        <img
          src={esitCV}
          style={{
            width: "40%",
            height: "30%",
            objectFit: "contain",
            objectPosition: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: "60%",
          }}
          alt="esitcvlogo"
        />
      </div>

      <div
        style={{
          flexdirection: "column",
          justifyContent: "center",
          alignSelf: "center",
          marginLeft: "20%",
        }}
      >
        {/* begin::Head */}
        <div
          className="text-center mb-10 mb-lg-20"
          style={{
            justifyContent: "center",
          }}
        >
          <h3 className="font-size-h1">
            <FormattedMessage id="AUTH.LOGIN.TITLE" />
          </h3>
          <p className="text-muted font-weight-bold">
            E-Mail ve Şifrenizi Giriniz
          </p>
        </div>
        {/* end::Head */}

        {/*begin::Form*/}
        <form
          onSubmit={formik.handleSubmit}
          className="form fv-plugins-bootstrap fv-plugins-framework"
          style={{
            flexdirection: "row",
          }}
        >
          {formik.status ? (
            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          ) : (
            <div className="mb-10 alert alert-custom alert-light-info alert-dismissible">
              <div className="alert-text ">
                <strong>Panel'e</strong> giriş yapmak için bilgilerinizi
                giriniz.
              </div>
            </div>
          )}

          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Email"
              type="email"
              style={{
                width: "30vw",
                height: "5vw",
              }}
              className={`form-control form-control-solid ${getInputClasses(
                "email"
              )}`}
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.email}</div>
              </div>
            ) : null}
          </div>
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Password"
              type="password"
              style={{
                width: "30vw",
                height: "5vw",
                marginTop: "1vw",
              }}
              className={`form-control form-control-solid ${getInputClasses(
                "password"
              )}`}
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.password}</div>
              </div>
            ) : null}
          </div>
          <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
            <Link
              to="/auth/forgot-password"
              className="text-dark-50 text-hover-primary my-3 mr-2"
              id="kt_login_forgot"
            >
              <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
            </Link>
            <button
              id="kt_login_signin_submit"
              type="submit"
              disabled={formik.isSubmitting}
              className={`btn btn-primary font-weight-bold`}
              style={{
                width: "10vw",
                height: "3vw",
                marginTop: "1vw",
                backgroundColor: "#301934",
              }}
            >
              <span>Giriş Yap</span>
              {loading && <span className="ml-3 spinner spinner-white"></span>}
            </button>
          </div>
        </form>
        <Link
          to="/register"
          id="kt_login_forgot"
          style={{
            position: "absolute",
            right: "5vw",
            top: "5vw",
          }}
        >
          Hesabınız yok mu? {""}
          <FormattedMessage id="AUTH.REGISTER.TITLE" />
        </Link>
        {/*end::Form*/}
      </div>
    </div>
  );
}

export default injectIntl(Login);
