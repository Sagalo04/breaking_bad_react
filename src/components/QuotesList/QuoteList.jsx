import { Icon } from "@iconify/react";
import { Loading } from "@nextui-org/react";
import Qoute from "components/Qoute/Qoute";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getQuotesAction,
  AddQualQouteAction,
  retreiveAllQuals,
  retreiveAllFavs,
} from "reduxDucks/quoteDuck";
import Styles from "./QuoteList.module.scss";

function QuoteList({
  author,
  quotes,
  fetching,
  getQuotesAction,
  retreiveAllQuals,
  retreiveAllFavs,
}) {
  useEffect(() => {
    getQuotesAction({ author });
    retreiveAllQuals();
    retreiveAllFavs();
  }, [author, getQuotesAction, retreiveAllFavs, retreiveAllQuals]);

  if (fetching) return <Loading />;
  return (
    <>
      {quotes.length ? (
        <div className={Styles.qoutelist}>
          <h1>Phrases</h1>
          {quotes.map((quote, index) => {
            return (
              <Qoute
                key={quote.quote_id + "" + quote.author}
                qoute={quote.quote}
                id={quote.quote_id}
                indexquote={index}
              />
            );
          })}
        </div>
      ) : (
        <div className={Styles.no_content}>
          <Icon
            icon="emojione:sad-but-relieved-face"
            color="#333"
            height="100"
          />
          <div></div>
          <h1>There are no phrases for this character</h1>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    quotes: state.quotes.array,
    fetching: state.quotes.fetching,
    quals: state.quotes.allquals,
  };
};

export default connect(mapStateToProps, {
  getQuotesAction,
  AddQualQouteAction,
  retreiveAllQuals,
  retreiveAllFavs,
})(QuoteList);
