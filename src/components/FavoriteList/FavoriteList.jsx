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

  return (
    <div>
      {favorites.map((favorite, index) => {
        return (
          <Qoute
            key={favorite.quote.quote_id + "" + favorite.quote.author}
            qoute={favorite.quote.quote}
            id={favorite.quote.quote_id}
            indexquote={index}
          />
        );
      })}
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
