import { useContext, useEffect, useRef, useState } from "react";
import { imageArticle, firstLetterCase } from "../../utils/functions";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { GetServerSideProps } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { ArticlesTypes } from "../../types/articlesType";
import Image from "next/image";
import { ThemeContext } from "../../context/ThemeContext";
import UseHead from "../../hooks";
import styles from "./[id].module.css";
import { BsFillHeartFill } from "react-icons/bs";


interface iServerSideProps {

}

export default function Article({ article }: ArticlesTypes) {
  const { id, title, intro, content, image, category, date } = article;
  dayjs.locale("fr");
  const [isLike, setIslike] = useState(false);
  // useContext___________________________________________________________
  const themeFromContext = useContext(ThemeContext);
  // functions____________________________________________________________
  const backgroundColor =
    themeFromContext && themeFromContext.theme === "Light" ? "white" : "black";
  const fontColor =
    themeFromContext && themeFromContext.theme === "Light" ? "black" : "white";

  const articleImage = image ? image : imageArticle(category);



  const handleClickHeart = () => {
    if (!isLike) {
      localStorage.setItem(title, title);
      return setIslike(true);
    }
    localStorage.removeItem(title)
    return setIslike(false)
  };

  return (
    <div
      className={styles.newViewContainer}
      style={{ background: `${backgroundColor}`, color: `${fontColor}` }}
    >
      <UseHead title={title} content={intro} />
      <div className={styles.newView}>
        <div className={styles.imageViewContainer}>
          <Image src={articleImage} alt="img_category" layout="fill" priority />
          <h3>{firstLetterCase(title)}</h3>
        </div>

        <p className={styles.newTextIntro}>{intro}</p>
        <p className={styles.newTextContent}>{content}</p>
        <address>
          Ecrit par Jamal, le {dayjs(date).format("DD MMMM YYYY")}
        </address>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context:any) => {

  
  const { params } = context;
  const { id } = params;
  const docSnap = await getDoc(doc(db, "articles", id));
  const article = docSnap.data();

  return {
    props: { article },
  };
};
