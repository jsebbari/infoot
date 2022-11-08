import React, { useEffect } from "react";
import Logo from "../Logo";
import styles from "./HomePage.module.css";
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
      <div className={styles.homePageContainer}>
        <div className={styles.logoAndLink}>
          <Logo displayInLargeScreen={true} />
          <Link href="/articles">
            <a className={styles.homeLink}>{"Voir l'actualité"}</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
