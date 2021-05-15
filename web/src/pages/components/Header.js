import React from 'react';
import logo from '../../assets/ONL-Logo.png';
import '../../styles/header.css';

export default function Header () {
  return (
    <div className="header-container">
      <div className="logo-container">
        <img alt="img" className="logo" src={logo} />
        <div className="header-title">OpenNetLab</div>
      </div>
      <div className="links">
        <a href="https://opennetlab.org/about">ABOUT US</a>
        <a href="https://opennetlab.org/join">JOIN US</a>
      </div>
    </div>
  );
}