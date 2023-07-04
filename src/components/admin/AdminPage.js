import React, { useEffect } from "react";
import { useState } from "react";
import Member from "./Member";
import { fetchFromAPI } from "../../functions/helpers";

export default function AdminPage() {
  const [ravers, setRavers] = useState([]);
  const [cash, setCash] = useState(0);

  // const getData = async () => {
  //   await fetchFromAPI("getPurchased", { body: { code: "" } }).then(
  //     (response) => {
  //       setRavers(response);
  //       setCash(calculateCash(response));
  //     }
  //   );
  // };

  const calculateCash = (data) => {
    return data.reduce((prev, curr) => prev + curr.fields.price, 0);
  };
  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {}, [ravers]);

  // const handleRefresh = () => {
  //   getData();
  // };
  return <div></div>;
}

//   return (
//     <div>
//       <h1>{`Tickets sold: ${ravers.length}`}</h1>
//       <h2>{` ${cash}`}</h2>

//       {ravers.map((x) => (
//         <Member key={x.id} x={x} onrefresh onRefresh={handleRefresh} />
//       ))}
//     </div>
//   );
// }
