import { Icon } from "@iconify/react";
import { Modal, useModal } from "@nextui-org/react";
import Score from "components/Score/Score";
import React, { useEffect, useState } from "react";
import Styles from "./Qoute.module.scss";
import { getSingleQuoteAction } from "reduxDucks/quoteDuck";
import { connect } from "react-redux";

function Qoute({
  qoute = "",
  id,
  getSingleQuoteAction,
  quals,
  current,
  get,
} = {}) {
  const { setVisible, bindings } = useModal();

  const [qualification, setQualification] = useState(0);

  useEffect(() => {
    // console.log(quals);
    if (quals.length > 0) {
      let aux = 0;
      let cont = 0;
      quals.forEach((qual) => {
        if (qual.current.quote_id === id) {
          cont++;
          aux += qual.qual;
        }
      });
      let cuant = aux / cont;
      if(isNaN(cuant)){
        cuant = 0
      }
      setQualification(cuant)
      // console.log(cuant)
    }
  }, [id, quals]);

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
            <h3>Calificaciones y opiniones</h3>
            <div className={Styles.qoute_qual_det}>
              <span>{qualification}</span>
              <Icon icon="carbon:star-filled" color="#0fa958" height="36" />
            </div>
          </div>
          <Icon
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
        <Score id={id} />
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    current: state.quotes.current,
    quals: state.quotes.allquals,
    //   fetching: state.quotes.fetching,
  };
};
export default connect(mapStateToProps, { getSingleQuoteAction })(
  React.memo(Qoute)
);
// export default (Qoute);
