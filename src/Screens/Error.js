import React from "react";
import esitCV from "../assets/esitcvlogobeyaz.png";

function Error(props) {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#301934",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img
        src={esitCV}
        style={{
          height: "20vh",
          width: "20vh",
          objectFit: "contain",
          alignSelf: "center",
          justifyContent: "center",
        }}
        alt="esitcv"
      />
      <h1
        style={{
          color: "white",
          justifyContent: "center",
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        Daha iyi deneyim için lütfen bilgisayar kullanınız.
      </h1>
    </div>
  );
}

export default Error;
