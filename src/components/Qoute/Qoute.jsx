import { Icon } from "@iconify/react";
import { Modal, useModal } from "@nextui-org/react";
import Score from "components/Score/Score";
import React, { useEffect, useState } from "react";
import Styles from "./Qoute.module.scss";
import { getSingleQuoteAction } from "reduxDucks/quoteDuck";
import { connect } from "react-redux";

function Qoute({ qoute = "", id, getSingleQuoteAction, quals, user_id } = {}) {
  const { setVisible, bindings } = useModal();

  const [qualification, setQualification] = useState(0);
  const [qualificationPersonal, setQualificationPersonal] = useState({});
  const [qualifications, setQualications] = useState([]);

  useEffect(() => {
    if (quals.length > 0) {
      let aux = 0;
      let cont = 0;
      let qualss = [];
      let Pqual = {};
      quals.forEach((qual) => {
        if (qual.current.quote_id === id) {
          cont++;
          aux += qual.qual;
          if (user_id !== qual.uid) {
            qualss.push({
              qual: qual.qual,
              opinion: qual.opinion,
              uid: qual.uid,
            });
          } else {
            Pqual = { qual: qual.qual, opinion: qual.opinion, uid: qual.uid };
          }
        }
      });
      let cuant = aux / cont;
      if (isNaN(cuant)) {
        cuant = 0;
      }
      setQualificationPersonal(Pqual);
      setQualification(cuant);
      setQualications(qualss);
    }
  }, [id, quals, user_id]);

  const handle = async () => {
    await getSingleQuoteAction({ id });
    setVisible(true);
  };

  return (
    <>
      <div className={Styles.qoute}>
        <p>"{qoute}"</p>
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
  };
};
export default connect(mapStateToProps, { getSingleQuoteAction })(
  React.memo(Qoute)
);
