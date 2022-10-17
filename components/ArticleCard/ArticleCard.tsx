import { useContext } from "react";
import styles from "./ArticleCard.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { ArticleTypes } from "../../types/articlesType";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import {
  firstLetterCase,
  imageArticle,
  splitText,
} from "../../utils/functions";

const ArticleCard = ({
  id,
  category,
  date,
  image,
  title,
  intro,
}: ArticleTypes) => {
  // useContext___________________________________________________________
  const themeFromContext = useContext(ThemeContext);

  // functions____________________________________________________________
  const articleImage = image ? image : imageArticle(category);

  const backgroundColor =
    themeFromContext && themeFromContext.theme === "Light" ? "white" : "black";

  const fontColor =
    themeFromContext && themeFromContext.theme === "Light" ? "black" : "white";

  

  return (
    <Link href={`articles/${id}`}>
      <div
        className={styles.cardNew}
        style={{ background: `${backgroundColor}`, color: `${fontColor}` }}
      >
        <div className={styles.imageCategoryContainer}>
          <Image src={articleImage} alt="img_category" layout="fill" priority/>
          
          <span className={styles.category}>{firstLetterCase(category)}</span>
          <span className={styles.date}>
            {dayjs(date).format("DD/MM/YYYY")}
          </span>
        </div>
        <div className={styles.presentationCard}>
          <h4>{firstLetterCase(title)}</h4>
          <p
            style={{ background: `${backgroundColor}`, color: `${fontColor}` }}
          >
            {splitText(intro, 19)}...
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
