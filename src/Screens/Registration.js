import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import esitCV from "../assets/esitcvlogobeyaz.png";

const initialValues = {
  fullname: "Furkan YILMAZ",
  phoneNumber: "5342007931",
  email: "fuykan1@icloud.com",
  password: "Fuykan1041!",
  changepassword: "Fuykan1041!",
  taxNumber: "25484052241",
  yearOfFoundation: "2001",
  sector: "Bilişim",
  acceptTerms: false,
};

function Registration(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const RegistrationSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(3, "Minimum 3 karakter")
      .max(50, "Maximum 50 karakter")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    phoneNumber: Yup.number()
      .typeError("Lütfen geçerli bir telefon numarası giriniz")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    email: Yup.string()
      .email("Lütfen geçerli bir e-posta adresi giriniz")
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
    changepassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "Şifreler eşleşmiyor"),
      }),
    taxNumber: Yup.number()
      .typeError("Lütfen geçerli bir vergi numarası giriniz")
      .min(2525252525, "Minimum 10 karakter")
      .max(252525252557, "Maximum 11 karakter")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    sector: Yup.string()
      .min(3, "Minimum 3 karakter")
      .max(50, "Maximum 50 karakter")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    yearOfFoundation: Yup.string()
      // .typeError("Lütfen geçerli bir yıl giriniz")
      // .min(new Date(1900, 0, 1), "Lütfen geçerli bir yıl giriniz")
      // .max(new Date(2025, 0, 1), "Lütfen geçerli bir yıl giriniz")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    acceptTerms: Yup.bool().required("Kullanım koşullarını kabul etmelisiniz"),
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

  const navigation = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setSubmitting(true);
      enableLoading();
      axios
        .post("https://api.esitcv.com/api/Auth/CompanyRegister", {
          name: values.fullname,
          phoneNumber: values.phoneNumber,
          password: values.password,
          emailAddress: values.email,
          taxNumber: values.taxNumber,
          sector: values.sector,
          yearOfFoundation: values.yearOfFoundation,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.resultStatus === 0) {
            console.log("Kayıt başarılı");
            navigation.push("/auth/login");
          }
          disableLoading();
          setSubmitting(false);
        })
        .catch((e) => {
          console.log(e);
          setSubmitting(false);
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
          disableLoading();
        });
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
        className="login-form login-signin"
        style={{
          justifyContent: "center",
          alignSelf: "center",
          marginLeft: "20%",
        }}
      >
        <div className="text-center mb-10 mb-lg-20">
          <h3 className="font-size-h1">
            <FormattedMessage id="AUTH.REGISTER.TITLE" />
          </h3>
          <p className="text-muted font-weight-bold">
            Hesabınızı oluşturmak için bilgilerinizi giriniz
          </p>
        </div>

        <form
          id="kt_login_signin_form"
          className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          onSubmit={formik.handleSubmit}
        >
          {/* begin: Alert */}
          {formik.status && (
            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          )}
          {/* end: Alert */}

          {/* begin: Fullname */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Full name"
              type="text"
              className={`form-control form-control-solid ${getInputClasses(
                "fullname"
              )}`}
              style={{
                width: "30vw",
                marginTop: "1vw",
                height: "6vh",
              }}
              name="fullname"
              {...formik.getFieldProps("fullname")}
            />
            {formik.touched.fullname && formik.errors.fullname ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.fullname}</div>
              </div>
            ) : null}
          </div>
          {/* end: Fullname */}

          {/* begin: Phone Number */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Telefon Numaranız"
              pattern="[0-9]*"
              type="tel"
              className={`form-control form-control-solid ${getInputClasses(
                "phoneNumber"
              )}`}
              style={{
                width: "30vw",
                marginTop: "1vw",
                height: "6vh",
              }}
              name="phoneNumber"
              {...formik.getFieldProps("phoneNumber")}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.phoneNumber}</div>
              </div>
            ) : null}
          </div>
          {/* end: Phone Number */}

          {/* begin: Email */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Email"
              type="email"
              className={`form-control form-control-solid ${getInputClasses(
                "email"
              )}`}
              style={{
                width: "30vw",
                marginTop: "1vw",
                height: "6vh",
              }}
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.email}</div>
              </div>
            ) : null}
          </div>
          {/* end: Email */}

          {/* begin: Password */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Password"
              type="password"
              className={`form-control form-control-solid ${getInputClasses(
                "password"
              )}`}
              style={{
                width: "30vw",
                marginTop: "1vw",
                height: "6vh",
              }}
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.password}</div>
              </div>
            ) : null}
          </div>
          {/* end: Password */}

          {/* begin: Confirm Password */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Confirm Password"
              type="password"
              className={`form-control form-control-solid ${getInputClasses(
                "changepassword"
              )}`}
              style={{
                width: "30vw",
                marginTop: "1vw",
                height: "6vh",
              }}
              name="changepassword"
              {...formik.getFieldProps("changepassword")}
            />
            {formik.touched.changepassword && formik.errors.changepassword ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  {formik.errors.changepassword}
                </div>
              </div>
            ) : null}
          </div>
          {/* end: Confirm Password */}

          {/* begin: tax number */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Vergi Numaranız"
              type="text"
              className={`form-control form-control-solid ${getInputClasses(
                "taxNumber"
              )}`}
              style={{
                width: "30vw",
                marginTop: "1vw",
                height: "6vh",
              }}
              name="taxNumber"
              {...formik.getFieldProps("taxNumber")}
            />
            {formik.touched.taxNumber && formik.errors.taxNumber ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.taxNumber}</div>
              </div>
            ) : null}
          </div>
          {/* end: tax number */}

          {/* begin:sector */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Sektörünüz"
              type="text"
              className={`form-control form-control-solid ${getInputClasses(
                "sector"
              )}`}
              style={{
                width: "30vw",
                height: "6vh",
                marginTop: "1vw",
              }}
              name="sector"
              {...formik.getFieldProps("sector")}
            />
            {formik.touched.sector && formik.errors.sector ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.sector}</div>
              </div>
            ) : null}
          </div>
          {/* end: sector */}

          {/* begin: year of foundation */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Kuruluş Yılınız"
              type="text"
              className={`form-control form-control-solid ${getInputClasses(
                "yearOfFoundation"
              )}`}
              style={{
                width: "30vw",
                marginTop: "1vw",
                height: "6vh",
              }}
              name="yearOfFoundation"
              {...formik.getFieldProps("yearOfFoundation")}
            />
            {formik.touched.yearOfFoundation &&
            formik.errors.yearOfFoundation ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  {formik.errors.yearOfFoundation}
                </div>
              </div>
            ) : null}
          </div>
          {/* end: year of foundation */}

          {/* begin: Terms and Conditions */}
          <div className="form-group">
            <label className="checkbox">
              <input
                type="checkbox"
                name="acceptTerms"
                className="m-1"
                {...formik.getFieldProps("acceptTerms")}
              />
              <Link
                to="/terms"
                target="_blank"
                className="mr-1"
                rel="noopener noreferrer"
              >
                Gizlilik ve Kullanım Şartlarını Kabul Ediyorum
              </Link>
              <span />
            </label>
            {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.acceptTerms}</div>
              </div>
            ) : null}
          </div>
          {/* end: Terms and Conditions */}
          <div
            className="form-group d-flex flex-wrap flex-center"
            style={{
              justifyContent: "space-between",
            }}
          >
            <button
              type="submit"
              disabled={
                formik.isSubmitting ||
                !formik.isValid ||
                !formik.values.acceptTerms
              }
              className="btn btn-primary font-weight-bold "
              style={{
                width: "10vw",
                marginTop: "1vw",
                height: "5vh",
                backgroundColor: "#301934",
              }}
            >
              <span>Kayıt Ol</span>
              {loading && <span className="ml-3 spinner spinner-white"></span>}
            </button>

            <Link to="/">
              <button
                type="button"
                className="btn btn-light-primary font-weight-bold "
                style={{
                  width: "10vw",
                  marginTop: "1vw",
                  height: "5vh",
                  backgroundColor: "#820000",
                }}
              >
                Vazgeç
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default injectIntl(Registration);
