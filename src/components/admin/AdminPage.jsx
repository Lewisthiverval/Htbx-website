import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { fetchFromAPI } from "../../functions/helpers";

export const AdminPage = () => {
  const [data, setData] = useState("No result");

  const markAsScanned = async () => {
    await fetchFromAPI("updateQr", { body: data });
  };

  return (
    <div style={{ backgroundColor: "black", height: "100vh", width: "80vh" }}>
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
        // style={{ width: "100%", height: "100%" }}
      />

      <p>{data.responseMessage}</p>
      <button onClick={markAsScanned}>MARK AS SCANNED</button>
      {data === "valid" ? (
        <div>
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
        </div>
      ) : (
        <div className="flex bg-black h-5 w-7"></div>
      )}
    </div>
  );
};
