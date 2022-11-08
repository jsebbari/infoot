import React from "react";
import styles from "./Footer.module.css";
import { HiExternalLink } from "react-icons/hi";
import { AiFillLinkedin } from "react-icons/ai";
import { FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  const portfolioLink = <HiExternalLink size={30} />;
  const githubLink = <FaGithubSquare size={30} />;
  const linkedinLink = <AiFillLinkedin size={30} />;

  return (
    // Text copyright is in Css
    <footer className={styles.footer}>
      <small className={styles.copyright}>
        Copyright © 2022 Jamal SEBBARI. All Rights Reserved
      </small>
      <ul className={styles.socialMedias}>
        <li>
          <a href="https://jsitineraire.fr/">{portfolioLink}</a>
        </li>
        <li>
          <a href="https://github.com/jsebbari">{githubLink}</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/jamal-sebbari/">
            {linkedinLink}
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
