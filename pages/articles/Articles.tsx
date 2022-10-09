import { useContext, useState } from "react";
import style from "./Articles.module.css";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { GetServerSideProps } from "next";
import { db } from "../../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { ArticlesTypes, ArticleTypes } from "../../types/articlesType";
import dayjs from "dayjs";

import {
  imageArticle,
  firstLetterCase,
  splitText,
} from "../../utils/functions";
import FilterArticles from "../../components/FilterArticles";
import Link from "next/link";
import { ThemeContext } from "../../context/ThemeContext";
import UseHead from "../../hooks";

export default function ServerSideProps(props: ArticlesTypes) {
  const { articles } = props;
  // useState____________________________________________________________
  const [categoriesToDisplay, setCategoriesToDisplay] = useState<string[]>([]);
  const [articleFiltered, setArticleFiltered] = useState<ArticleTypes[]>([]);

  // useConetxt___________________________________________________________
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
    const { title, intro, category, image, id, date } = article;
    const articleImage = image ? image : imageArticle(category);

    return (
      <Link href={`articles/${id}`} key={uuidv4()}>
        <div
          className={style.cardNew}
          style={{ background: `${backgroundColor}`, color: `${fontColor}` }}
        >
          <UseHead title="Actualités" content="L'actualité football" />
          <div className={style.imageCategoryContainer}>
            <Image src={articleImage} alt="img_category" layout="fill" />
            <span className={style.category}>{firstLetterCase(category)}</span>
            <span className={style.date}>
              {dayjs(date).format("DD/MM/YYYY")}
            </span>
          </div>
          <div className={style.presentationCard}>
            <h4>{firstLetterCase(title)}</h4>
            <p>{splitText(intro, 19)}...</p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div
      className={style.staticProps}
      style={{ background: `${backgroundColor}`, color: `${fontColor}` }}
    >
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
  const querySnapshot = await getDocs(collection(db, "articles"));
  const articles = querySnapshot.docs.map((doc) => {
    const articleToString = JSON.stringify(doc.data());
    const parseArticle = JSON.parse(articleToString);
    return { ...parseArticle, id: doc.id };
  });

  return {
    props: { articles },
  };
};
