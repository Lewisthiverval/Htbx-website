import React from "react";
import "../App.css";

export default function PromoTix() {
  return (
    <div>
      <div className="frame">
        <iframe
          title="link"
          // style="width:100%"
          height="500"
          src="https://app.promotix.com/trade/select-tickets/HTBX---8-Years-tickets?embedded_to_iframe=true"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
}
