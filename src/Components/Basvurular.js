import React, { useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

function Basvurular(props) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [basvurular, setBasvurular] = React.useState([]);

  const rows = [
    {
      basvurdugu: "Senior React Native Developer",
      id: 1,
      fullName: "Furkan YILMAZ",
      emailAdress: "furkanvsarda@gmail.com",
      phoneNumber: "0532 123 45 67",
    },
    {
      basvurdugu: "Senior React Native Developer",
      id: 2,
      fullName: "Eren ÖZ",
      emailAdress: "erenoz@gmail.com",
      phoneNumber: "0507 440 71 95",
    },
    {
      basvurdugu: "Senior React Native Developer",
      id: 3,
      fullName: "Mehmet YILMAZ",
      emailAdress: "mehmetyilmaz@gmail.com",
      phoneNumber: "0532 123 45 67",
    },
  ];

  const columns = [
    { field: "basvurdugu", headerName: "Başvurulan İlan", width: 240 },
    { field: "id", headerName: "ID" },
    { field: "fullName", headerName: "Ad - Soyad", width: 200 },
    { field: "emailAdress", headerName: "E-Posta Adresi", width: 200 },
    { field: "phoneNumber", headerName: "Telefon Numarası", width: 200 },
  ];

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

  console.log(basvurular);
  return (
    <div
      style={{
        display: "flex",
        height: "45vw",
        width: "85vw",
      }}
    >
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default Basvurular;
