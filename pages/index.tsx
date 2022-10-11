import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import FormSendData from "../components/FormSendData";
import HomePage from "../components/HomePage";
import UseHead from "../hooks/useHead";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <UseHead title="Accueil" content="Toute l'actualité football du moment" />
      <HomePage />
      {/* <main className={styles.main}>
        <FormSendData/>
      </main> */}
    </div>
  );
};

export default Home;
