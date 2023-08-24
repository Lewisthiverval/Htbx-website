import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { fetchFromAPI } from "../../functions/helpers";

export const AdminPage = () => {
  const [data, setData] = useState("No result");

  const markAsScanned = async () => {
    await fetchFromAPI("updateQr", { body: data });
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black">
      <div className="h-4/5 w-4/5 bg-black overflow-hidden group">
        <QrReader
          facingMode="environment"
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
        />
        <style>
          {`
        .group video {
           width: 100%!important;
           height: 100%!important;
        }
      `}
        </style>
      </div>

      <p className="text-white mt-4">{data.responseMessage}</p>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
        onClick={markAsScanned}
      >
        MARK AS SCANNED
      </button>
      {data === "valid" ? (
        <div className="mt-4">
          <button className="bg-white text-black w-52 h-28 text-6xl rounded focus:outline-none">
            MARK QR AS SCANNED
          </button>
        </div>
      ) : (
        <div className="flex bg-black h-5 w-7 mt-4"></div>
      )}
    </div>
  );
};
