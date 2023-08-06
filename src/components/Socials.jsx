import React from "react";
import "./socials.css"; // Import the CSS file for styling

export const Socials = () => {
  return (
    <div className="socials-container">
      <a
        href="https://www.instagram.com/h_t_b_x/?hl=fr"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <h3 className="social-text">Instagram</h3>
      </a>
      <a
        href="https://www.soundcloud.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <h3 className="social-text">Soundcloud</h3>
      </a>{" "}
      <a href="mailto:hi@htbx.london" className="social-link">
        <h3 className="social-text"> hi@htbx.london</h3>
      </a>
    </div>
  );
};
