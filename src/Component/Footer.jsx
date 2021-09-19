import React, { useState } from "react";
import "../Styles/Footer.css";
const Footer = ({ language }) => {
  const [state, setState] = useState(localStorage.getItem("language") || "KZ");
  const setLanguage = (lang) => {
    localStorage.setItem("language", lang);
    setState(lang);
    language(lang);
  };
  return (
    <footer style={{ display: "flex", flexGrow: 0.5, alignItems: "center" }}>
      <div className="language">
        <span className={state === "KZ" ? "active" : null} onClick={() => setLanguage("KZ")}>
          KZ
        </span>
        <span className={state === "RU" ? "active" : null} onClick={() => setLanguage("RU")}>
          RU
        </span>
      </div>
    </footer>
  );
};
export default Footer;
