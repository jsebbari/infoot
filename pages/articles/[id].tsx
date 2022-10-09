import { useContext } from "react";
import { imageArticle, firstLetterCase } from "../../utils/functions";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { GetServerSideProps } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { ArticlesTypes } from "../../types/articlesType";
import Image from "next/image";
import style from "./Articles.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import UseHead from "../../hooks";

export default function Article({ article }: ArticlesTypes) {
  const { title, intro, content, image, category, date } = article;
  dayjs.locale("fr");

  // useConetxt___________________________________________________________
  const themeFromContext = useContext(ThemeContext);
  // functions____________________________________________________________
  const backgroundColor =
    themeFromContext && themeFromContext.theme === "Light" ? "white" : "black";
  const fontColor =
    themeFromContext && themeFromContext.theme === "Light" ? "black" : "white";

  const articleImage = image ? image : imageArticle(category);
  return (
    <div
      className={style.newViewContainer}
      style={{ background: `${backgroundColor}`, color: `${fontColor}` }}
    >
      <UseHead title={title} content={intro} />
      <div className={style.newView}>
        <h3>{firstLetterCase(title)}</h3>
        <div className={style.imageViewContainer}>
          <Image src={articleImage} alt="img_category" layout="fill" priority />
        </div>

        <p className={style.newTextIntro}>{intro}</p>
        <p className={style.newTextContent}>{content}</p>
        <address>
          Ecrit par Jamel, le {dayjs(date).format("DD MMMM YYYY")}
        </address>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { params } = context;
  const { id } = params;
  const docSnap = await getDoc(doc(db, "articles", id));

  const article = docSnap.data();
  return {
    props: { article },
  };
};
