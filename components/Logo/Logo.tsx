import React, { useEffect } from "react";
import style from "./Logo.module.css";
import { GiSoccerKick } from "react-icons/gi";
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
    data-aos= {displayIn &&"fade-left"}
      size={displayIn ? 300 : 50}
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
    return (
   
      <div style={{ display: "flex",alignItems: "center"}}>
        {soccerIcon}
        <h2 className={logoClassName} data-aos="fade-right">
          Info<span style={{ color: "rgba(181, 102, 29, 0.941)" }}>o</span>t
        </h2>
      </div>
       
    );
  }
};

export default Logo;
