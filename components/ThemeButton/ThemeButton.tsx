import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";

const ThemeButton = () => {
  //useContext___________________________________________________________
  const themeFromContext = useContext(ThemeContext);
  //functions____________________________________________________________
  const changeThemeHandler = () => {
    if (themeFromContext) {
      themeFromContext.setTheme(
        themeFromContext.theme === "Dark" ? "Light" : "Dark"
      );
    }
  };

  const lightIcon = <BsSun size={20} />;
  const darkIcon = <BsMoon size={20} />;
  const currentTheme = themeFromContext && themeFromContext.theme;
  const iconTheme = currentTheme === "Dark" ? lightIcon : darkIcon;
  const backgroundColor =
    themeFromContext && themeFromContext.theme === "Light" ? "black" : "white";
  const fontColor =
    themeFromContext && themeFromContext.theme === "Light" ? "white" : "black";
  return (
    <button
      onClick={changeThemeHandler}
      style={{
        background: `${backgroundColor}`,
        color: `${fontColor}`,
        display: "flex",
        alignItems: "center",
        padding: ".5rem",
        gap: "5px",
        borderRadius: "20px",
        cursor: "pointer",
      }}
    >
      {iconTheme}
    </button>
  );
};

export default ThemeButton;
