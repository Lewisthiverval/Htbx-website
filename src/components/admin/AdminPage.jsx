import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { fetchFromAPI } from "../../functions/helpers";

export const AdminPage = () => {
  const [data, setData] = useState("No result");

  const markAsScanned = async () => {
    await fetchFromAPI("updateQr", { body: data });
  };

  return (
    <div style={{ backgroundColor: "black", height: "80vh", width: "80vh" }}>
      <QrReader
        onResult={async (result, error) => {
          if (!!result) {
            const parsedResult = JSON.parse(result?.text);
            const response = await fetchFromAPI("scan", {
              body: {
                name: parsedResult?.name,
                id: parsedResult?.id,
              },
            });
            setData({
              responseMessage: response.response,
              id: parsedResult.id,
            });
          }
          if (error) {
            console.log(error);
          }
        }}
        style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
      />
      <p style={{ color: "white", textAlign: "center" }}>
        {data.responseMessage}
      </p>
      <button
        onClick={markAsScanned}
        style={{ backgroundColor: "white", color: "black" }}
      >
        MARK AS SCANNED
      </button>
      {data === "valid" ? (
        <button
          style={{
            backgroundColor: "white",
            color: "white",
            width: "200px",
            height: "100px",
            fontSize: "200px",
          }}
        >
          MARK QR AS SCANNED
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};
