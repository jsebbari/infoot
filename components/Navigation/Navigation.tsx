import { useState, useContext } from "react";
import styles from "./Navigation.module.css";
import { useRouter } from "next/router";
import { Squash as Hamburger } from "hamburger-react";
import ThemeButton from "../ThemeButton";
import Logo from "../Logo";
import { ImHome } from "react-icons/im";
import Link from "next/link";
import { ThemeContext } from "../../context/ThemeContext";

const Navigation = () => {
  //states _______________________________________________
  const [showNavbar, setShowNavbar] = useState(false);

  // useContext___________________________________________________________
  const themeFromContext = useContext(ThemeContext);

  //functions ____________________________________________
  const router = useRouter();
  const homeIcon = (
    <a>
      <ImHome size={30} />
    </a>
  );

  const handleCloseNav = () => {
    showNavbar && setShowNavbar(!showNavbar);
  };

  const showNavToggle = showNavbar ? styles.showNav : styles.hideNav;
  const toggleMenuBtnColor = () => {
    if (themeFromContext && themeFromContext.theme === "Light") {
      return "black";
    }
    return "white";
  };

  const itemIsActive = (route: string) => {
    if (route === router.pathname) {
      return styles.activeItem;
    }
  };

  return (
    <>
      <span className={styles.hamburgerBtn}>
        <Hamburger
          toggled={showNavbar}
          toggle={setShowNavbar}
          hideOutline={true}
          color={toggleMenuBtnColor()}
        />
      </span>

      <nav
        className={`${styles.Navigation} ${showNavToggle}`}
        onClick={handleCloseNav}
      >
        <Logo />
        <ul className={`${styles.navList}`}>
          <li className={`${styles.navItems}`}>
            <Link href="/">{homeIcon}</Link>
          </li>
          <li className={`${styles.navItems} ${itemIsActive("/articles")}`}>
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
