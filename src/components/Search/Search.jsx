import { Icon } from "@iconify/react";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { connect } from "react-redux";
import Styles from "./Search.module.scss";
import {
  getSearchCharacterAction,
  getCharactersAction,
} from "reduxDucks/charsDuck";

function Search({ getSearchCharacterAction, getCharactersAction }) {
  const [search, setSearch] = useState("");

  const handle = () => {
    getSearchCharacterAction({ search });
  };

  return (
    <div className={Styles.search_container}>
      <Input
        bordered
        placeholder="Search a character"
        className={Styles.search}
        type="search"
        contentLeft={<Icon icon="akar-icons:search" color="#333" height="24" />}
        width={"80%"}
        aria-label="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          console.log(e.target.value)
          if (e.target.value === "") getCharactersAction();
        }}
      />
      <Button onClick={handle}>Search</Button>
    </div>
  );
}

export default connect(null, { getSearchCharacterAction, getCharactersAction })(
  Search
);
