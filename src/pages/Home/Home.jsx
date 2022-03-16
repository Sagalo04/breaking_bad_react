import CharactersDeck from "components/CharactersDeck/CharactersDeck";
import React from "react";
import Styles from "./Home.module.scss";
import Search from "components/Search/Search";

function Home() {
  return (
    <div className={Styles.home}>
      <img className={Styles.home_banner} src="/banner.jpg" alt="banner" />
      <Search />
      <CharactersDeck />
    </div>
  );
}

export default Home;
