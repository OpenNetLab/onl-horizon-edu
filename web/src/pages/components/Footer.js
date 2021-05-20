import React from 'react';
import logo from '../../assets/ONL-Logo.png';
import '../../styles/footer.css';

export default function Footer () {
  return (
    <div className="footer-container">
      <div className="logo-container">
        <img alt="img" className="logo-footer" src={logo} />
        <div className="footer-text">
          <div className="footer-title">OpenNetLab</div>
          <div className="footer-info">© 2021 OpenNetLab. All Rights Reserved.</div>
        </div>
      </div>
      <div className="contact-container">
        <div className="contact">Welcome to Contact us</div>
        <div className="email">contact@opennetlab.org</div>
      </div>
      <div className="links">
        <a href="https://opennetlab.org/about">ABOUT US</a>
        <a href="https://opennetlab.org/join">JOIN US</a>
      </div>
    </div>
  );
}