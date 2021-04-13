import React from 'react';
import logo from '../../assets/logo.png';
import '../../styles/footer.css';

export default function Footer () {
  return (
    <div className="footer-container">
        <img alt="img" className="logo" src={logo} />
    </div>
  );
}