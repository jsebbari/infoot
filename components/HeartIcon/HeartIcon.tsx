import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { ThemeContext } from "../../context/ThemeContext";

const HeartIcon = () => {

// useContext___________________________________________________________
  const themeFromContext = useContext(ThemeContext);
  const router = useRouter();
  const articleId = router.query.id;

  const [articleInFavorites, setArticleInFavorites] = useState(false);
  useEffect(() => {
    const articlesFav = JSON.parse(
      localStorage.getItem("articlesLiked") || "[]"
    );
    if (articlesFav.includes(articleId)) {
      return setArticleInFavorites(true);
    }
  }, []);
  const fontColor =
    themeFromContext && themeFromContext.theme === "Light" ? "black" : "white";
  const heartColor = articleInFavorites ? "red" : fontColor;
  const handleToggleSaveInStorage = () => {
    if (localStorage.getItem("articlesLiked") === null) {
      setArticleInFavorites(true);
      const addArticleID = [articleId];
      return localStorage.setItem(
        "articlesLiked",
        JSON.stringify(addArticleID)
      );
    }

    let oldArray = JSON.parse(localStorage.getItem("articlesLiked") || "[]");
    if (oldArray.includes(articleId)) {
      setArticleInFavorites(false);
      const arrayWithoutArticleID = oldArray.filter((element: string) => {
        return element !== articleId;
      });
      return localStorage.setItem(
        "articlesLiked",
        JSON.stringify(arrayWithoutArticleID)
      );
    }
    oldArray.push(articleId);
    setArticleInFavorites(true);
    return localStorage.setItem("articlesLiked", JSON.stringify(oldArray));
  };

  return (
    <BsFillHeartFill
      size={25}
      onClick={handleToggleSaveInStorage}
      color={heartColor}
    />
  );
};

export default HeartIcon;
