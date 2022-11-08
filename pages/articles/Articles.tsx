import { useContext, useState } from "react";
import style from "./Articles.module.css";
import { v4 as uuidv4 } from "uuid";
import { GetServerSideProps } from "next";
import { db } from "../../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { ArticlesTypes, ArticleTypes } from "../../types/articlesType";
import { categories } from "../../assets/categories";
import ArticleCard from "../../components/ArticleCard";
import FilterArticles from "../../components/FilterArticles";
import { ThemeContext } from "../../context/ThemeContext";
import UseHead from "../../hooks";

export default function Articles(props: ArticlesTypes) {
  const { articles } = props;

  // useState____________________________________________________________
  const [categoriesToDisplay, setCategoriesToDisplay] = useState<string[]>([]);
  const [articleFiltered, setArticleFiltered] = useState<ArticleTypes[]>([]);

  // useContext___________________________________________________________
  const themeFromContext = useContext(ThemeContext);

  // functions____________________________________________________________
  const backgroundColor =
    themeFromContext && themeFromContext.theme === "Light" ? "white" : "black";
  const fontColor =
    themeFromContext && themeFromContext.theme === "Light" ? "black" : "white";
  const articlesToDisplay =
    articleFiltered.length !== 0 ? articleFiltered : articles;

  const allArticles = articlesToDisplay.map((obj) => {
    return { ...obj, date: new Date(obj.date) };
  });

  const sortedDesc = allArticles.sort(
    (objA, objB) => Number(objB.date) - Number(objA.date)
  );

  const displayArticles = sortedDesc.map((article) => {
    const { title, intro, category, image, id, date, views } = article;
    !categories.includes(category) && categories.push(category);
    return (
      <ArticleCard
        key={uuidv4()}
        id={id}
        category={category}
        date={date}
        title={title}
        intro={intro}
        image={image}
        views={views}
      />
    );
  });

  return (
    <div
      className={style.Articles}
      style={{ background: `${backgroundColor}`, color: `${fontColor}` }}
    >
      <UseHead title="Actualités" content="L'actualité football" />
      <h1>Actualités</h1>
      <FilterArticles
        categoriesToDisplay={categoriesToDisplay}
        setCategoriesToDisplay={setCategoriesToDisplay}
        articleFiltered={articleFiltered}
        setArticleFiltered={setArticleFiltered}
        articles={articles}
      />
      <div className={style.newsContainer}>{displayArticles}</div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const articles = querySnapshot.docs.map((doc) => {
      const articleToString = JSON.stringify(doc.data());
      const parseArticle = JSON.parse(articleToString);
      return { ...parseArticle, id: doc.id };
    });

    return {
      props: { articles },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
