import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from './About.module.css'
import { BsInfoCircleFill } from "react-icons/bs";
import UseHead from "../../hooks/useHead";

const About = () => {
  // useContext___________________________________________________________
  const themeFromContext = useContext(ThemeContext); 
  // variables____________________________________________________________
  const backgroundColor =
    themeFromContext && themeFromContext.theme === "Light" ? "white" : "black";
  const fontColor =
    themeFromContext && themeFromContext.theme === "Light" ? "black" : "white";
  return (
    <div
    className={styles.About}
      style={{
        background: `${backgroundColor}`,
        color: `${fontColor}`,
      }}
    >
      <UseHead title="A propos" content="Objectifs du site web" />
     <BsInfoCircleFill size={30}/>
      <p>Ce projet a été réalisé uniquement dans un but personnel.</p>
      <p>{"Les articles, images et autres contenus qui y sont utilisés n'appartiennent pas à l'auteur de"} <a href="https://infoot.vercel.app/">Infoot</a>.</p>
    </div>
  );
};

export default About;
