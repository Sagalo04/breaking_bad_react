import { Icon } from "@iconify/react";
import { Loading } from "@nextui-org/react";
import QuoteList from "components/QuotesList/QuoteList";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleCharacterAction } from "reduxDucks/charsDuck";
import Styles from "./Details.module.scss";

function Details({ char, fetching, getSingleCharacterAction }) {
  const { id } = useParams();
  useEffect(() => {
    getSingleCharacterAction({ id });
  }, [id, getSingleCharacterAction]);

  if (fetching) {
    return <Loading type="points" />;
  }

  return (
    <div className={Styles.detail_container}>
      <Link to={`/`}>
        <Icon icon="ep:arrow-left-bold" color="#333" height="28" />
      </Link>
      <div className={Styles.detail}>
        <div className={Styles.detail_char}>
          <h1>{char.name}</h1>
          <img src={char.img} alt={char.name} />
          <p>{char.nickname}</p>
          <p>{char.birthday}</p>
          <p>{char.status}</p>
          <p>{char.appearance}</p>
          <p>{char.portrayed}</p>
        </div>
        {char.name ? (
          <QuoteList author={char.name.replace(/\s+/g, "+")} />
        ) : (
          <Loading type="spinner" />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    char: state.characters.current,
    fetching: state.characters.fetching,
  };
};

export default connect(mapStateToProps, { getSingleCharacterAction })(
  React.memo(Details)
);
