import { Icon } from "@iconify/react";
import { Button, Loading } from "@nextui-org/react";
import Qoute from "components/Qoute/Qoute";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getQuotesAction, AddQualQouteAction,retreiveAllQuals } from "reduxDucks/quoteDuck";
import Styles from "./QuoteList.module.scss";

function QuoteList({ author, quotes, fetching, getQuotesAction,AddQualQouteAction,retreiveAllQuals,quals }) {
  useEffect(() => {
    getQuotesAction({ author });
    retreiveAllQuals()
  }, [author, getQuotesAction,retreiveAllQuals]);
  //   console.log(quote)

  const AddQual = (num) =>{
    const qual = 4
    const id = num
    const opinion = "yes"
    AddQualQouteAction({qual,opinion,id})
  }

  if (fetching) return <Loading />;
  return (
    <>
      {quotes.length ? (
        <div className={Styles.qoutelist}>
          {quotes.map((quote,index) => {
            return (
                <Qoute key={quote.quote_id+""+quote.author} qoute={quote.quote} id={quote.quote_id}/> 
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
                {/* <Button onClick={() =>{AddQual(index)} }>ActionExample</Button> */}

const mapStateToProps = (state) => {
  return {
    quotes: state.quotes.array,
    fetching: state.quotes.fetching,
    quals: state.quotes.allquals,
  };
};

export default connect(mapStateToProps, {
  getQuotesAction,
  AddQualQouteAction,retreiveAllQuals
})(QuoteList);
