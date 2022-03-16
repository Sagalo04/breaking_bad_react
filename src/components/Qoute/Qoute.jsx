import { Icon } from "@iconify/react";
import { Modal, useModal } from "@nextui-org/react";
import Score from "components/Score/Score";
import React, { useEffect, useState } from "react";
import Styles from "./Qoute.module.scss";
import {
  getSingleQuoteAction,
  AddFavoriteQualAction,
  RemoveFavoriteQualAction,
} from "reduxDucks/quoteDuck";
import { connect } from "react-redux";
import useQualification from "hooks/useQualification";

function Qoute({
  qoute = "",
  id,
  getSingleQuoteAction,
  quals,
  user_id,
  AddFavoriteQualAction,
  indexquote,
  favorites,
  RemoveFavoriteQualAction,
} = {}) {
  const { setVisible, bindings } = useModal();

  const [itsFav, setItsFav] = useState("ant-design:heart-outlined");

  const { qualification, qualificationPersonal, qualifications } =
    useQualification({ quals, id, user_id });

  useEffect(() => {
    if (favorites.length > 0) {
      favorites.forEach((favorite) => {
        if (favorite.quote.quote_id === id) {
          setItsFav("ant-design:heart-filled");
        }
      });
    }
  }, [favorites, id]);

  const handle = async () => {
    await getSingleQuoteAction({ id });
    setVisible(true);
  };

  const handleFav = () => {
    if (itsFav === "ant-design:heart-filled") {
      RemoveFavoriteQualAction({ indexquote });
      setItsFav("ant-design:heart-outline");
    } else {
      AddFavoriteQualAction({ indexquote });
    }
  };

  return (
    <>
      <div className={Styles.qoute}>
        <div className={Styles.qoute_content}>
          <span>"{qoute}"</span>
          <Icon onClick={handleFav} icon={itsFav} color="red" height="24" />
        </div>
        <div className={Styles.qoute_qual}>
          <div>
            <h3>Ratings and reviews</h3>
            <div className={Styles.qoute_qual_det}>
              <span>{qualification.toFixed(1)}</span>
              <Icon icon="carbon:star-filled" color="#0fa958" height="36" />
            </div>
          </div>
          <Icon
            className={Styles.clickable}
            onClick={handle}
            id={Styles.icon}
            icon="ep:arrow-right-bold"
            color="#333"
            height="36"
          />
        </div>
      </div>
      <hr />
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Score
          id={id}
          scores={qualifications}
          qualificationPersonal={qualificationPersonal}
        />
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    current: state.quotes.current,
    quals: state.quotes.allquals,
    user_id: state.user.uid,
    favorites: state.quotes.favorites,
  };
};
export default connect(mapStateToProps, {
  getSingleQuoteAction,
  AddFavoriteQualAction,
  RemoveFavoriteQualAction,
})(React.memo(Qoute));
