import React from "react";
import Logo from "../Logo";
import style from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <Logo /> 
    </footer>
  );
};

export default Footer;
