import { useEffect, useState, useRef, useContext } from "react";
import { categories } from "../../assets/categories";
import { v4 as uuidv4 } from "uuid";
import { ArticleTypes } from "../../types/articlesType";
import style from "./FilterArticles.module.css";
import { firstLetterCase } from "../../utils/functions";
import { ThemeContext } from "../../context/ThemeContext";

interface Props {
  categoriesToDisplay: string[];
  setCategoriesToDisplay: (val: string[]) => void;
  setArticleFiltered: (val: ArticleTypes[]) => void;
  articleFiltered: ArticleTypes[];
  articles: ArticleTypes[];
}

export default function FilterArticles({
  categoriesToDisplay,
  setCategoriesToDisplay,
  setArticleFiltered,
  articleFiltered,
  articles,
}: Props) {
  const themeFromContext = useContext(ThemeContext);
  const categorieToDisplay = categories.map((category) => {
    const handleClick = () => {
      if (!categoriesToDisplay.includes(category)) {
        setCategoriesToDisplay([...categoriesToDisplay, category]);
        const filterArticles = articles.filter(
          (article) => article.category === category
        );
        setArticleFiltered([...filterArticles, ...articleFiltered]);
      } else {
        const categoriesDisplayFilter = categoriesToDisplay.filter(
          (element) => element !== category
        );
        setCategoriesToDisplay(categoriesDisplayFilter);
        const removeArticlesInFiltered = articleFiltered.filter(
          (article) => article.category !== category
        );
        return setArticleFiltered(removeArticlesInFiltered);
      }
    };

   

    const fontColor =
      themeFromContext && themeFromContext.theme === "Light"
        ? "black"
        : "white";

    const colorBtn = categoriesToDisplay.includes(category)
      ? style.btnFilterActive
      : style.btnFilterDisabled;
    return (
      <li key={uuidv4()}>
        <button
          onClick={handleClick}
          className={`${style.btnFilterDefault} ${colorBtn}`}
          style={{
            color: `${fontColor}`,
          }}
        >
          {firstLetterCase(category)}
        </button>
      </li>
    );
  });

  return <ul className={style.filterNav}>{categorieToDisplay}</ul>;
}
