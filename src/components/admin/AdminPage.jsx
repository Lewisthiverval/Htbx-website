import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { fetchFromAPI } from "../../functions/helpers";
import { useEffect } from "react";

export const AdminPage = () => {
  const [data, setData] = useState("No result");
  const [res, setRes] = useState("");

  const markAsScanned = async () => {
    const scanResponse = await fetchFromAPI("updateQr", { body: data });
    setRes(scanResponse);
    setData("");
  };

  useEffect(() => {
    console.log(data);
  });

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black  border-pink-500 border-solid border-2">
      <div className="h-3/5 w-4/5 bg-black overflow-hidden group  border-pink-500 border-solid border-2">
        <div className="">
          <QrReader
            className="h-full w-[200%]"
            key="environment"
            constraints={{ facingMode: "environment" }}
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
        </div>
      </div>

      <p className="text-red-400 text-4xl mt-4"> {data.responseMessage}</p>

      {data.responseMessage === "Valid" ? (
        <div>
          {/* <div className="mt-4 bg-pink-300 text-white py-2 px-4 rounded">
            VALID
          </div> */}
          <button
            className="mt-4 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-800 focus:outline-none"
            onClick={markAsScanned}
          >
            MARK AS SCANNED
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
