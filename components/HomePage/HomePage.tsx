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
      <div className={style.homePageContainer}>
        <div className={style.logoAndLink}>
          <Logo displayInLargeScreen={true} />
          <Link href="/articles">
            <a className={style.homeLink}>{"Voir l'actualité"}</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
