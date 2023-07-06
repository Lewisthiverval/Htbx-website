import React, { useEffect } from "react";
import { useState } from "react";
import { fetchFromAPI } from "../../functions/helpers";

export default function AdminPage() {
  const [tickets, setTickets] = useState([]);

  const getData = async () => {
    await fetchFromAPI("getPurchasedAndTotal", { body: { code: "" } }).then(
      (response) => {
        setTickets(response);
      }
    );
  };

  useEffect(() => {
    getData().then((response) => {
      console.log(response);
    });
  }, []);

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
