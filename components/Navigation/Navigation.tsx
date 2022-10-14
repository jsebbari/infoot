import { useState, useContext, useEffect } from "react";
import styles from "./Navigation.module.css";
import { useRouter } from "next/router";
import OutsideClickHandler from "react-outside-click-handler";
import { Squash as Hamburger } from "hamburger-react";
import ThemeButton from "../ThemeButton";
import Logo from "../Logo";
import { ImHome } from "react-icons/im";
import Link from "next/link";
import { ThemeContext } from "../../context/ThemeContext";

const Navigation = () => {
  //states _______________________________________________
  const [screenIsSmall, setScreenIsSmall] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  // useContext___________________________________________________________
  const themeFromContext = useContext(ThemeContext);

  //functions ____________________________________________
  const router = useRouter();
  const homeIcon = <ImHome size={30} />;

  const handleShowNav = () => {
    setShowNavbar(!showNavbar);
  };

  const screenSize = () => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 700) {
        return setScreenIsSmall(true);
      }
      return setScreenIsSmall(false);
    });
  };
  useEffect(() => {
    screenSize();
  }, []);

  const showNavToggle =
    screenIsSmall && !showNavbar ? styles.hideNav : styles.showNav;
  const toggleMenuBtnColor = () => {
    if (
      themeFromContext &&
      themeFromContext.theme === "Light" &&
      !showNavbar &&
      router.pathname !== "/"
    ) {
      return "black";
    }
    return "white";
  };
  
  return (
   <>
       {screenIsSmall && (
        <span className={styles.hamburgerBtn}>
            <Hamburger
              toggled={showNavbar}
              toggle={setShowNavbar}
              hideOutline={true}
              color={toggleMenuBtnColor()}
            />
          </span>
          )}
      <nav className={`${styles.Navigation} ${showNavToggle}`}>
        <Logo/>
        <ul
          className={`${styles.navList}`}
          onClick={handleShowNav}
        >
          <li className={styles.navItems}>
            <Link href="/">{homeIcon}</Link>
          </li>
          <li className={styles.navItems}>
            <Link href="/articles">Actualités</Link>
          </li>
          <li className={styles.navItems}>
            <Link href="/">About</Link>
          </li>
          <li className={styles.navItems}>
            <ThemeButton />
          </li>
        </ul>
  
      </nav>
      </>
  );
};

export default Navigation;
