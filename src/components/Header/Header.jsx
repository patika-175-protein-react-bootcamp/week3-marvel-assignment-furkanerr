import React from "react";
import kahramanlar from '../../img/kahramanlar.png';
import marvelText from '../../img/marvelYazisi.png';
import style from './style.css';
const Header = () => {
  return (
    <header className="header">
      <img src={kahramanlar} className="heros" alt="kahramanlar" />
      <img src={marvelText} className="marvelText" alt="marvelYazisi" />
    </header>
  );
};

export default Header;
