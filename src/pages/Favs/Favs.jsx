import { Icon } from "@iconify/react";
import FavoriteList from "components/FavoriteList/FavoriteList";
import React from "react";
import { Link } from "react-router-dom";
import Styles from "./Favs.module.scss";
function Favs(props) {
  return (
    <div className={Styles.favs_container}>
      <Link to={`/`}>
        <Icon icon="ep:arrow-left-bold" color="#333" height="28" />
      </Link>
      <div className={Styles.favs}>
        <h1>My favorite phrases</h1>
        <FavoriteList />
      </div>
    </div>
  );
}

export default Favs;
