import React from 'react';
import logo from '../../assets/logo.png';
import '../../styles/header.css';

export default function Header () {
  return (
    <div className="header-container">
        <img alt="img" className="logo" src={logo} />
    </div>
  );
}