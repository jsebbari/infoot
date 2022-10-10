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
      data-aos={displayIn && "fade-left"}
      size={displayIn ? 200 : 50}
      color={"rgba(29, 151, 181, 0.941)"}
    />
  );

  if (!displayIn) {
    return (
      <Link href="/">
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          {soccerIcon}
          <h2 className={logoClassName}>
            Info<span style={{ color: "rgba(181, 102, 29, 0.941)" }}>o</span>t
          </h2>
        </div>
      </Link>
    );
  } else {
    const firstBallIcon = (
      <GiSoccerBall size={100} color={"rgba(181, 102, 29, 0.941)"} />
    );
    const secondBallIcon = (
      <GiSoccerBall size={100} color={"rgba(29, 151, 181, 0.941)"} />
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 className={logoClassName} data-aos="fade-right">
          Inf{firstBallIcon}
          {secondBallIcon}t
        </h2>
        <p> {"L'info complétement foot"}</p>
      </div>
    );
  }
};

export default Logo;
