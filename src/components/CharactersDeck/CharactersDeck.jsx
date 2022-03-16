import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Styles from "./CharactersDeck.module.scss";
import { getCharactersAction } from "reduxDucks/charsDuck";
import CharacterCard from "components/CharacterCard/CharacterCard";
import { Loading, Pagination } from "@nextui-org/react";

function CharactersDeck({ chars, fetching, getCharactersAction }) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    getCharactersAction({ page });
  }, [getCharactersAction, page]);

  return (
    <>
      {chars.length ? <div className={Styles.card_deck}>
        {!fetching ? (
          chars.map((char) => {
            return (
              <CharacterCard
                key={char.name}
                name={char.name}
                status={char.status}
                img={char.img}
                nickname={char.nickname}
                id={char.char_id}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </div> : <h1>No results were found</h1>}
      <Pagination
        color={"success"}
        shadow
        total={13}
        initialPage={1}
        onChange={(page) => setPage(page - 1)}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    chars: state.characters.array,
    fetching: state.characters.fetching,
  };
};

export default connect(mapStateToProps, { getCharactersAction })(
  CharactersDeck
);
