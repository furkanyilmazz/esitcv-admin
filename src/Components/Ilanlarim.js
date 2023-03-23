import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function İlanlarim(props) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [basvurular, setBasvurular] = React.useState([]);

  useEffect(() => {
    axios
      .get("https://api.esitcv.com/api/JobPosting/GetAll", {
        headers: {
          Authorization: `Bearer ${userData.token.token}`,
        },
      })
      .then((response) => {
        // eslint-disable-next-line
        setBasvurular(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData.token.token]);

  const rows = [
    {
      id: 1,
      header: "Senior React Native Developer",
      content:
        "ikinci el otomotiv sektöründe yapay zeka çözümleri sunan bir teknopark şirketidir. Fotoğraflara Computer Vision algoritmalarıyla işlemler uygulandıktan sonra arabaları saniyesinde profesyonel stüdyolara yerleştirerek arabaların satış hızını artırmakta ve diğer ilanlar arasında standardizasyon sağlamaktadır. Car Studio; 16 ülkedeki ikinci el bayiileri, otomotiv grup şirketleri ve ilan platformlarına hizmet vermektedir. Bizimle birlikte büyüme ve geliştirme tutkusunu paylaşacak, Senior React Native Developer ekip arkadaşları arıyoruz.",
      sector: "Bilişim",
      jobPosition: "Mobile Developer",
      licenceDegree: "Lisans, Ön Lisans",
      language: "Türkçe",
      typeOfWork: "Tam Zamanlı",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "header", headerName: "Başlık", width: 200 },
    { field: "content", headerName: "İçerik", width: 450 },
    { field: "sector", headerName: "Sektör", width: 100 },
    { field: "jobPosition", headerName: "İş Pozisyonu", width: 150 },
    { field: "licenceDegree", headerName: "Lisans Derecesi", width: 150 },
    { field: "language", headerName: "Dil", width: 100 },
    { field: "typeOfWork", headerName: "Çalışma Türü", width: 200 },
  ];

  console.log(basvurular);

  return (
    <div
      style={{
        display: "flex",
        height: "45vw",
        width: "85vw",
      }}
    >
      <DataGrid rows={rows} columns={columns} editMode="row" isRowSelectable />
    </div>
  );
}

export default İlanlarim;
