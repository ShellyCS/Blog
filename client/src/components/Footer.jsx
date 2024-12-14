import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#757575", // Grey text color
          background: "linear-gradient(45deg, #4CAF50, #81C784)", // Green gradient
          WebkitBackgroundClip: "text",
          color: "#ffff",
          padding: "5px 15px",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          transition: "all 0.3s ease-in-out",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        WriteFlow
      </span>
    </footer>
  );
};

export default Footer;
