import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import axios from "axios";
import Select from "react-select";

function Ilanver(props) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [lisansDerecesi, setLisansDerecesi] = useState();
  const [isTuru, setIsTuru] = useState();

  const [lisansDerecesiMap, setLisansDerecesiMap] = useState([]);
  const [isTuruMap, setIsTuruMap] = useState([]);

  console.log(lisansDerecesiMap);

  useEffect(() => {
    const lisansDerecesiMaps =
      lisansDerecesi &&
      lisansDerecesi.map((item) => {
        return item.label;
      });
    const isTuruMaps =
      isTuru &&
      isTuru.map((item) => {
        return item.value;
      });
    setLisansDerecesiMap(lisansDerecesiMaps);
    setIsTuruMap(isTuruMaps);
  }, [lisansDerecesi, isTuru]);

  const initialValues = {
    baslik: "Senior React Native Developer",
    icerik:
      "ikinci el otomotiv sektöründe yapay zeka çözümleri sunan bir teknopark şirketidir. Fotoğraflara Computer Vision algoritmalarıyla işlemler uygulandıktan sonra arabaları saniyesinde profesyonel stüdyolara yerleştirerek arabaların satış hızını artırmakta ve diğer ilanlar arasında standardizasyon sağlamaktadır. Car Studio; 16 ülkedeki ikinci el bayiileri, otomotiv grup şirketleri ve ilan platformlarına hizmet vermektedir. Bizimle birlikte büyüme ve geliştirme tutkusunu paylaşacak, Senior React Native Developer ekip arkadaşları arıyoruz.",
    sektor: "Bilişim",
    pozisyon: "Mobile Developer",
    lisansderecesi: "Lisans, Ön Lisans",
    dil: "Türkçe",
    isturu: 1,
  };

  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const RegistrationSchema = Yup.object().shape({
    baslik: Yup.string()
      .min(3, "Minimum 3 karakter")
      .max(50, "Maximum 50 karakter")
      .required(
        intl.formatMessage({
          id: "ILAN.BASLIK.REQUIRED",
        })
      ),
    icerik: Yup.string().required(
      intl.formatMessage({
        id: "ILAN.ICERIK.REQUIRED",
      })
    ),
    sektor: Yup.string()
      .min(3, "Minimum 3 karakter")
      .max(50, "Maximum 50 karakter")
      .required(
        intl.formatMessage({
          id: "ILAN.SEKTOR.REQUIRED",
        })
      ),
    pozisyon: Yup.string()
      .min(3, "Minimum 3 karakter")
      .max(50, "Maximum 50 karakter")
      .required(
        intl.formatMessage({
          id: "ILAN.POZISYON.REQUIRED",
        })
      ),
    dil: Yup.string().required(
      intl.formatMessage({
        id: "ILAN.DIL.REQUIRED",
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

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setSubmitting(true);
      enableLoading();
      axios
        .post("https://api.esitcv.com/api/JobPosting/Add", {
          header: values.baslik,
          content: values.icerik,
          sector: values.sektor,
          jobPosition: values.pozisyon,
          licenceDegree: lisansDerecesiMap,
          language: values.dil,
          typeOfWork: isTuruMap,
          companyID: userData.token.companyID,
          questions: [],
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.resultStatus === 0) {
            console.log("İş ilanı başarıyla oluşturuldu");
          }
          disableLoading();
          setSubmitting(false);
        })
        .catch((e) => {
          console.log(e);
          setSubmitting(false);
          setStatus(
            intl.formatMessage({
              id: "ILAN.ERROR",
            })
          );
          disableLoading();
        });
    },
  });

  const options = [
    { value: "yok", label: "Yok" },
    { value: "onLisans", label: "Ön Lisans" },
    { value: "lisans", label: "Lisans" },
    { value: "yuksekLisans", label: "Yüksek Lisans" },
    { value: "doktora", label: "Doktora" },
  ];

  const options2 = [
    { value: "0", label: "Tam Zamanlı" },
    { value: "1", label: "Yarı Zamanlı" },
    { value: "2", label: "Stajyer" },
    { value: "3", label: "Sözleşmeli" },
  ];

  return (
    <div
      className="login-form login-signin"
      id="kt_login_signin_form"
      style={{
        flexdirection: "column",
        display: "flex",
        marginTop: "3vw",
      }}
    >
      <div
        className="login-form login-signin"
        style={{
          justifyContent: "center",
          alignSelf: "center",
          marginLeft: "30%",
        }}
      >
        <div className="text-center mb-10 mb-lg-20">
          <p className="text-muted font-weight-bold">
            İlan vermek için alanları doldurun
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

          {/* begin: Başlık */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="İlan Başlığı"
              type="text"
              className={`form-control form-control-solid ${getInputClasses(
                "text"
              )}`}
              style={{
                width: "35vw",
                marginTop: "1vw",
                height: "6vh",
              }}
              name="baslik"
              {...formik.getFieldProps("baslik")}
            />
            {formik.touched.baslik && formik.errors.baslik ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.baslik}</div>
              </div>
            ) : null}
          </div>
          {/* end: Başlık */}

          {/* begin: İçerik */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="İlan İçeriği"
              type="text"
              className={`form-control form-control-solid ${getInputClasses(
                "text"
              )}`}
              style={{
                width: "35vw",
                marginTop: "1vw",
                height: "6vh",
              }}
              name="icerik"
              {...formik.getFieldProps("icerik")}
            />
            {formik.touched.icerik && formik.errors.icerik ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.icerik}</div>
              </div>
            ) : null}
          </div>
          {/* end: İçerik */}

          {/* begin: Sektör */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Sektör"
              type="text"
              className={`form-control form-control-solid ${getInputClasses(
                "text"
              )}`}
              style={{
                width: "35vw",
                marginTop: "1vw",
                height: "6vh",
              }}
              name="sektor"
              {...formik.getFieldProps("sektor")}
            />
            {formik.touched.sektor && formik.errors.sektor ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.sektor}</div>
              </div>
            ) : null}
          </div>
          {/* end: Sektör */}

          {/* begin: Pozisyon */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="İş Pozisyonu"
              type="text"
              className={`form-control form-control-solid ${getInputClasses(
                "text"
              )}`}
              style={{
                width: "35vw",
                marginTop: "1vw",
                height: "6vh",
              }}
              name="pozisyon"
              {...formik.getFieldProps("pozisyon")}
            />
            {formik.touched.pozisyon && formik.errors.pozisyon ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.pozisyon}</div>
              </div>
            ) : null}
          </div>
          {/* end: Pozisyon */}

          {/* begin: Lisans Derecesi */}
          <div
            className="form-group fv-plugins-icon-container"
            style={{
              width: "35vw",
              border: "0px solid ",
              marginTop: "1vw",
            }}
          >
            <Select
              isMulti
              isClearable
              isSearchable={false}
              classNamePrefix="select"
              placeholder="Lisans Derecesi"
              className={`form-control form-control-solid ${getInputClasses(
                "text"
              )}`}
              styles={{
                control: (base) => ({
                  ...base,
                  width: "33vw",
                  border: "0px solid ",
                  height: "5vh",
                }),
              }}
              name="lisansderecesi"
              onChange={(valueOption) => setLisansDerecesi(valueOption)}
              options={options}
            />
            {formik.touched.lisansderecesi && formik.errors.lisansderecesi ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  {formik.errors.lisansderecesi}
                </div>
              </div>
            ) : null}
          </div>
          {/* end: Lisans Derecesi */}

          {/* begin:Dil */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Sektörünüz"
              type="text"
              className={`form-control form-control-solid ${getInputClasses(
                "text"
              )}`}
              style={{
                width: "35vw",
                height: "6vh",
                marginTop: "1vw",
              }}
              name="dil"
              {...formik.getFieldProps("dil")}
            />
            {formik.touched.dil && formik.errors.dil ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.dil}</div>
              </div>
            ) : null}
          </div>
          {/* end: Dil */}

          {/* begin: İş Türü */}
          <div
            className="form-group fv-plugins-icon-container"
            style={{
              width: "35vw",
              border: "0px solid ",
              marginTop: "1vw",
            }}
          >
            <Select
              isMulti
              isClearable
              isSearchable={false}
              classNamePrefix="select"
              placeholder="İş Türü"
              className={`form-control form-control-solid ${getInputClasses(
                "text"
              )}`}
              styles={{
                control: (base) => ({
                  ...base,
                  width: "33vw",
                  border: "0px solid ",
                  height: "5vh",
                }),
              }}
              name="isturu"
              onChange={(valueOption) => setIsTuru(valueOption)}
              options={options2}
            />
            {formik.touched.isturu && formik.errors.isturu ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.isturu}</div>
              </div>
            ) : null}
          </div>
          {/* end: İş Türü */}

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
              <span>İlan Ver</span>
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

export default injectIntl(Ilanver);
