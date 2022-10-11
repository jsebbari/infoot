import React, { useEffect } from "react";
import style from "./Logo.module.css";
import { GiSoccerKick, GiSoccerBall } from "react-icons/gi";

import Link from "next/link";
import AOS from "aos";

interface IProps {
  displayIn?: string;
}
const Logo = (props: IProps) => {
  const aosAnime = () => {
    AOS.init({ duration: 2000 });
    AOS.refresh();
  };
  useEffect(() => {
    return aosAnime();
  }, []);

  const { displayIn } = props;
  const logoClassName =
    displayIn === "home" ? style.logoNameInHome : style.logoName;

  const soccerIcon = (
    <GiSoccerKick
      size={50}
      color={"rgba(29, 151, 181, 0.941)"}
    />
  );

  const firstBallIcon = (
    <GiSoccerBall size={ displayIn ? 80:20} color={"rgba(181, 102, 29, 0.941)"} className={style.ballIcon} />
  );
  const secondBallIcon = (
    <GiSoccerBall size={ displayIn ? 80:20} color={"rgba(29, 151, 181, 0.941)"} className={style.ballIcon} />
  );

  if (!displayIn) {
    return (
      <Link href="/">
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer", color:'black'}}
        >
          {soccerIcon}
          <h2 className={logoClassName}>
             Inf{firstBallIcon}{secondBallIcon}t
          </h2>
        </div>
      </Link>
    );
  } else {


    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom:"1rem",
        }}
      >
        <h2 className={logoClassName} data-aos="fade-right">
          Inf{firstBallIcon}
          {secondBallIcon}t
        </h2>
        <p className={style.slogan}> {"L'info complétement foot"}</p>
      </div>
    );
  }
};

export default Logo;
