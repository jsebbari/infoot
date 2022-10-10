import { useState, useContext, useEffect } from "react";
import style from "./Navigation.module.css";
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
  const [showNavbar, setShowNavbar] = useState(false);

  // useContext___________________________________________________________
  const themeFromContext = useContext(ThemeContext);

  //functions ____________________________________________
  const router = useRouter();
  const homeIcon = <ImHome size={30} />;

  const handleShowNav = () => {
    setShowNavbar(!showNavbar);
  };

  const showNavToggle = !showNavbar ? style.hideNav : style.showNav;
  const toggleMenuBtnColor = () => {
    if (themeFromContext && themeFromContext.theme === "Light" && !showNavbar && router.pathname!== "/") {
      return "black";
    }
    return "white"
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        showNavbar && setShowNavbar(false);
      }}
    >
      <nav className={style.Navigation}>
        <div style={{ zIndex: 2000 }}>
          <Hamburger
            toggled={showNavbar}
            toggle={setShowNavbar}
            hideOutline={true}
            color={toggleMenuBtnColor()}
          />
        </div>
        <ul className={`${showNavToggle} ${style.nav}`} onClick={handleShowNav}>
          <li className={style.navItems}>
            <Link href="/">{homeIcon}</Link>
          </li>
          <li className={style.navItems}>
            <Link href="/articles">Actualités</Link>
          </li>
          <li className={style.navItems}>
            <Link href="/">About</Link>
          </li>
          <li className={style.navItems}>
            <ThemeButton />
          </li>
        </ul>
      </nav>
    </OutsideClickHandler>
  );
};

export default Navigation;
