import React, { useEffect } from "react";
import style from "./Logo.module.css";
import { GiSoccerKick, GiSoccerBall } from "react-icons/gi";
import { v4 as uuidv4 } from "uuid";

import Link from "next/link";
import AOS from "aos";

interface IProps {
  displayInLargeScreen?: boolean;
}
const Logo = (props: IProps) => {
  const { displayInLargeScreen } = props;
  
  const aosAnime = () => {
    AOS.init();
    AOS.refresh();
  };
  useEffect(() => {
    return aosAnime();
  }, []);

  const logoClassName = displayInLargeScreen
    ? style.logoNameInHome
    : style.logoName;

  const soccerIcon = (
    <GiSoccerKick size={50} color={"rgba(29, 151, 181, 0.941)"} />
  );
  const firstBallIcon = (
    <GiSoccerBall
      color={"rgba(181, 102, 29, 0.941)"}
      className={style.ballIcon}
    />
  );
  const secondBallIcon = (
    <GiSoccerBall
      color={"rgba(29, 151, 181, 0.941)"}
      className={style.ballIcon}
    />
  );

  const sloganItems = ["Actualités", "Transferts", "Scores "];

  const displaySloganItems = sloganItems.map((item: string) => {
    return <li key={uuidv4()}>{item}</li>;
  });

  if (!displayInLargeScreen) {
    const firstBallIcon = (
      <GiSoccerBall size={25} color={"rgba(181, 102, 29, 0.941)"} />
    );
    const secondBallIcon = (
      <GiSoccerBall size={25} color={"rgba(29, 151, 181, 0.941)"} />
    );
    return (
      <Link href="/">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "black",
          }}
        >
          {soccerIcon}
          <h2 className={logoClassName}>
            Inf{firstBallIcon}
            {secondBallIcon}t
          </h2>
        </div>
      </Link>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      <h2 className={logoClassName} data-aos="zoom-in" data-aos-duration="800">
        Inf{firstBallIcon}
        {secondBallIcon}t
      </h2>
      <ul className={style.slogan}>{displaySloganItems}</ul>
    </div>
  );
};

export default Logo;
