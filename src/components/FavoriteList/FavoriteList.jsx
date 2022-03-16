import { Loading } from "@nextui-org/react";
import Qoute from "components/Qoute/Qoute";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { retreiveAllFavs2, retreiveAllQuals } from "reduxDucks/quoteDuck";

function FavoriteList({
  retreiveAllFavs2,
  favorites,
  fetching,
  retreiveAllQuals,
}) {
  useEffect(() => {
    retreiveAllFavs2();
    retreiveAllQuals();
  }, [retreiveAllFavs2, retreiveAllQuals]);

  if (fetching) return <Loading />;
  return (
    <div>
      {favorites.length
        ? favorites.map((favorite, index) => {
            return (
              <Qoute
                key={favorite.quote.quote_id + "" + favorite.quote.author}
                qoute={favorite.quote.quote}
                id={favorite.quote.quote_id}
                indexquote={index}
              />
            );
          })
        : <h1>No tienes phrases favoritas</h1>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favorites: state.quotes.favorites,
    fetching: state.quotes.fetching,
  };
};

export default connect(mapStateToProps, { retreiveAllFavs2, retreiveAllQuals })(
  FavoriteList
);
