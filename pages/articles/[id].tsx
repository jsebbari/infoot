import { useContext, useEffect } from "react";
import { imageArticle, firstLetterCase } from "../../utils/functions";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { GetServerSideProps } from "next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { ArticlesTypes } from "../../types/articlesType";
import Image from "next/image";
import { ThemeContext } from "../../context/ThemeContext";
import UseHead from "../../hooks";
import styles from "./[id].module.css";

export default function Article({ article }: ArticlesTypes) {
  const { id, title, intro, content, image, category, date, views } = article;

  
  // dates________________________________________________________________
  dayjs.locale("fr");
  // useContext___________________________________________________________
  const themeFromContext = useContext(ThemeContext);
  // variables____________________________________________________________
  const backgroundColor =
    themeFromContext && themeFromContext.theme === "Light" ? "white" : "black";
  const fontColor =
    themeFromContext && themeFromContext.theme === "Light" ? "black" : "white";

  const articleImage = image ? image : imageArticle(category);

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

export const getServerSideProps: GetServerSideProps = async (context: any) => {

  try {
    const { params } = context;
    const { id } = params;
    const docSnap = await getDoc(doc(db, "articles", id));
    const article = docSnap.data();
  
    await setDoc(doc(db, "articles", id),{ views: article?.views +1 }, { merge: true });
    return {
      props: { article },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }


 
};
