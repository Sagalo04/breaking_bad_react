import { Loading } from "@nextui-org/react";
import QuoteList from "components/QuotesList/QuoteList";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleCharacterAction } from "reduxDucks/charsDuck";
import Styles from "./Details.module.scss";

function Details({ char, fetching, getSingleCharacterAction }) {
  const { id } = useParams();
  // const [name,setName] = useState("")
  useEffect(() => {
    getSingleCharacterAction({ id });
  }, [id, getSingleCharacterAction]);

  // useEffect(() => {
  //     console.log(char.name)
  //     if(!fetching){
  //         setName(char.name)
  //     }
  // },[fetching,char])

  if (fetching) {
    return <Loading type="points" />;
  }

  console.log(char.name);
  return (
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
        <QuoteList author={char.name.replace(/\s+/g,'+')}/>
      ) : (
        <Loading type="spinner"/>
      )}
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
