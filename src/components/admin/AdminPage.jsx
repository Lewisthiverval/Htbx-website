import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

export const AdminPage = () => {
  const [data, setData] = useState("No result");

  return (
    <div style={{ backgroundColor: "black", height: "80vh", width: "100vh" }}>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
      />
      <p style={{ color: "white", textAlign: "center" }}>{data}</p>
    </div>
  );
};
