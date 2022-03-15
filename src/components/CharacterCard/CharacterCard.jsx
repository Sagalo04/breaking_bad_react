import React from "react";
import { Link } from "react-router-dom";
import Styles from "./CharacterCard.module.scss";

function CharacterCard({ img, name,nickname,id, status }) {
  return (
    <Link to={`/character/${id}`} className={Styles.card}>
      <img loading="lazy" src={img} alt={name} />
      <div className={Styles.info}>
          <h1>{name}</h1>
          <h2>{nickname}</h2>
          <p>{status}</p>
      </div>
    </Link>
  );
}

export default CharacterCard;
