import { Icon } from "@iconify/react";
import { Button, Input } from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import Styles from "./Calificar.module.scss";

const ICONS = [
  "carbon:star",
  "carbon:star",
  "carbon:star",
  "carbon:star",
  "carbon:star",
];
function Calificar({ AddQual }) {
  const [ico, setIco] = useState(ICONS);
  const [qual, setQual] = useState(0);
  const [opinion, setOpinion] = useState("");

  const handlerAddQual = () => {
    AddQual({ qual, opinion });
  };
  const handleClick = useCallback((star) => {
    let stars = [
      "carbon:star",
      "carbon:star",
      "carbon:star",
      "carbon:star",
      "carbon:star",
    ];
    for (let i = 0; i < star; i++) {
      stars[i] = "carbon:star-filled";
    }
    setIco(stars);
    setQual(star);
  }, []);

  return (
    <div className={Styles.reviews}>
      <div className={Styles.iconcontent}>
        <Icon
          className={Styles.clickable}
          onClick={() => handleClick(1)}
          icon={ico[0]}
          color="#0fa958"
          height="36"
        />
        <Icon
          className={Styles.clickable}
          onClick={() => handleClick(2)}
          icon={ico[1]}
          color="#0fa958"
          height="36"
        />
        <Icon
          className={Styles.clickable}
          onClick={() => handleClick(3)}
          icon={ico[2]}
          color="#0fa958"
          height="36"
        />
        <Icon
          className={Styles.clickable}
          onClick={() => handleClick(4)}
          icon={ico[3]}
          color="#0fa958"
          height="36"
        />
        <Icon
          className={Styles.clickable}
          onClick={() => handleClick(5)}
          icon={ico[4]}
          color="#0fa958"
          height="36"
        />
      </div>

      <Input
        bordered
        placeholder="Write a review..."
        value={opinion}
        onChange={(e) => {
          setOpinion(e.target.value);
        }}
        aria-label="write opinion"
      />

      <Button
        type="submit"
        onClick={handlerAddQual}
        size="xs"
        style={{ margin: "1rem" }}
      >
        Send
      </Button>
    </div>
  );
}

export default Calificar;
