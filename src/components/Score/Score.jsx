import { Icon } from "@iconify/react";
import { Modal, Text } from "@nextui-org/react";
import Calificar from "components/Calificar/Calificar";
import React from "react";
import { connect } from "react-redux";
import { AddQualQouteAction } from "reduxDucks/quoteDuck";
import Styles from "./Score.module.scss";
import { doGoogleLoginAction } from "reduxDucks/userDuck";

function Score({
  scores,
  user,
  AddQualQouteAction,
  qualificationPersonal,
  doGoogleLoginAction,
}) {
  const AddQual = ({ qual, opinion }) => {
    if (user) {
      AddQualQouteAction({ qual, opinion });
    } else {
      doGoogleLoginAction();
    }
  };
  return (
    <>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Ratings and reviews
          {Storage.user}
        </Text>
      </Modal.Header>
      {qualificationPersonal.qual ? (
        <>
          <h3 className={Styles.title}>My review</h3>
          <div className={Styles.qoute_qual_det}>
            <span>{qualificationPersonal.qual.toFixed(1)}</span>
            <Icon icon="carbon:star-filled" color="#0fa958" height="36" />
            <span className={Styles.opinion}>
              "{qualificationPersonal.opinion}"
            </span>
          </div>
        </>
      ) : (
        <Calificar AddQual={AddQual} />
      )}

      <Modal.Body>
        {scores.length ? (
          <div className={Styles.opinions}>
            {scores.map((qual, index) => {
              return (
                <div key={index} className={Styles.qoute_qual_det_others}>
                  <span>{qual.qual.toFixed(1)}</span>
                  <Icon icon="carbon:star-filled" color="#0fa958" height="36" />
                  <span className={Styles.opinion}>"{qual.opinion}"</span>
                  <Text id="modal-description"></Text>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={Styles.opinions}>
            <h2>No ratings to display</h2>
          </div>
        )}
      </Modal.Body>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    quals: state.quotes.allquals,
    user: state.user.uid,
  };
};

export default connect(mapStateToProps, {
  AddQualQouteAction,
  doGoogleLoginAction,
})(Score);
