import React, { useEffect } from "react";
import Logo from "../Logo";
import style from "./HomePage.module.css";
import Link from "next/link";
import AOS from "aos";
import UseHead from "../../hooks";

const Home = () => {
  const aosAnime = () => {
    AOS.init({ duration: 6000 });
    AOS.refresh();
  };
  useEffect(() => {
    return aosAnime();
  }, []);

  return (
    <>
      <UseHead title="Home" content="Toute l'actualité football du moment" />
      <div className={style.loaderPageContainer}>
        <div className={style.overlay}></div>
        <div className={style.logoAndLink}>
          <Logo displayIn="home" />
          <Link href="/articles">
            <a className={style.homeLink}>
              Actualités
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
