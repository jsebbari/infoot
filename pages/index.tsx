import type { NextPage } from "next";
import HomePage from "../components/HomePage";
import UseHead from "../hooks/useHead";

const Home: NextPage = () => {
  return (
    <>
      <UseHead title="Accueil" content="Toute l'actualité football du moment" />
      <HomePage />
    </>
  );
};

export default Home;
