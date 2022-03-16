import { Input } from "@nextui-org/react";
import CharactersDeck from "components/CharactersDeck/CharactersDeck";
import React from "react";
import Styles from "./Home.module.scss";
import { Icon } from "@iconify/react";

function Home() {
  return (
    <div className={Styles.home}>
      <img className={Styles.home_banner} src="/banner.jpg" alt="banner" />
      <Input
        bordered
        placeholder="Search a character"
        className={Styles.search}
        type="search"
        contentLeft={<Icon icon="akar-icons:search" color="#333" height="24" />}
        width={'90%'}
        aria-label="search"
      />
      <CharactersDeck />
    </div>
  );
}

export default Home;
