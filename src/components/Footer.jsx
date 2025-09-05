import React from "react";

const Footer = () => (
  <footer
    style={{
      background: "#222",
      color: "#fff",
      textAlign: "center",
      padding: "18px 0",
      fontSize: 16,
      marginTop: "auto",
      letterSpacing: 0.5,
    }}
  >
    © {new Date().getFullYear()} AuthValidator. All rights reserved.
  </footer>
);

export default Footer;