import React from "react";
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">@apawar</p>
      <ul className="footer-links">
        <li className="footer-item"><a href="/terms&condition">Terms & Conditions</a></li>
        <li className="footer-item"><a href="/privacy">Privacy</a></li>
        <li className="footer-item"><a href="/data-processing">Data Processing Agreement</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
