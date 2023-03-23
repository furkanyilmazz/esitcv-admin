import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
import axios from "axios";
import ImageUploading from "react-images-uploading";

function Profil(props) {
  const userData = JSON.parse(localStorage.getItem("userData"));
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
  });

  const [image, setImage] = useState(null);

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const initialValues = {
    fullname: userData.company.name,
    phoneNumber: userData.company.phoneNumber,
    email: userData.company.emailAddress,
    taxNumber: userData.company.taxNumber,
    yearOfFoundation: "",
    sector: "",
  };

  useEffect(() => {
    axios
      .get("https://api.esitcv.com/api/Company/GetById", {
        params: {
          id: userData.token.companyID,
        },
      })
      .then((response) => {
        setImage(response.data.data.companyPicture);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setSubmitting(true);
      enableLoading();
      axios
        .post("https://api.esitcv.com/api/Company/Update", {
          id: userData.token.companyID,
          name: values.fullname,
          phoneNumber: values.phoneNumber,
          emailAddress: values.email,
          taxNumber: values.taxNumber,
          sector: values.sector,
          yearOfFoundation: values.yearOfFoundation,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.resultStatus === 0) {
            console.log("Profil başarıyla güncellendi");
          }
          disableLoading();
          setSubmitting(false);
        })
        .catch((e) => {
          console.log(e);
          setSubmitting(false);
          setStatus(
            intl.formatMessage({
              id: "PROFIL.UPDATE.ERROR",
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
        marginLeft: "20%",
      }}
    >
      <div
        className="login-form login-signin"
        style={{
          justifyContent: "center",
          alignSelf: "center",
          marginLeft: "20%",
          marginTop: "5%",
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

          {/* begin: Profil Fotosu */}
          <div
            className="form-group fv-plugins-icon-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageUploading
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <button
                      style={[isDragging ? { color: "red" } : undefined]}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Fotoğrafını Güncelle
                    </button>
                  </div>
                  &nbsp;
                  {imageList.length ? null : (
                    <img
                      src={"https://via.placeholder.com/150"}
                      alt=""
                      style={{
                        width: "10vw",
                        height: "10vw",
                        objectFit: "cover",
                        marginTop: "5%",
                      }}
                    />
                  )}
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={
                          image["data_url"]
                            ? image["data_url"]
                            : "https://via.placeholder.com/150"
                        }
                        alt=""
                        style={{
                          width: "10vw",
                          height: "10vw",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        className="image-item__btn-wrapper"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          width: "10vw",
                        }}
                      >
                        <button
                          onClick={() => {
                            let formData = new FormData();
                            formData.append("file", images[0]?.data_url);
                            axios
                              .post(
                                `https://api.esitcv.com/api/CompanyPicture/Add`,
                                {
                                  companyID: userData.token.companyID,
                                  File: images[0]?.data_url,
                                },
                                {
                                  headers: {
                                    "Content-Type": "multipart/form-data",
                                    Authorization: `Bearer ${userData.token.token}`,
                                  },
                                }
                              )
                              .then((response) => {
                                console.log(response.data);
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          Onayla
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
            {/* <img
              src={
                image
                  ? "https://via.placeholder.com/450"
                  : "https://via.placeholder.com/150"
              }
              style={{
                width: "10vw",
                height: "10vw",
                marginTop: "1vw",
                marginRight: "1vw",
              }}
              alt="profil "
            />
            <button
              onClick={() => {}}
              className="btn btn-primary font-weight-bold "
              style={{
                width: "10vw",
                marginTop: "1vw",
                height: "4vh",
                backgroundColor: "#301934",
              }}
            >
              <span>Fotoğrafını Güncelle</span>
            </button> */}
          </div>
          {/* end: Profil Fotosu */}

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

          <div
            className="form-group d-flex flex-wrap flex-center"
            style={{
              justifyContent: "space-between",
            }}
          >
            <button
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              className="btn btn-primary font-weight-bold "
              style={{
                width: "10vw",
                marginTop: "1vw",
                height: "5vh",
                backgroundColor: "#301934",
              }}
            >
              <span>Bilgilerini Güncelle</span>
              {loading && <span className="ml-3 spinner spinner-white"></span>}
            </button>

            <button
              onClick={() => {
                formik.resetForm();
              }}
              type="button"
              className="btn btn-light-primary font-weight-bold "
              style={{
                width: "10vw",
                marginTop: "1vw",
                height: "5vh",
                backgroundColor: "#820000",
                color: "white",
              }}
            >
              Vazgeç
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default injectIntl(Profil);
