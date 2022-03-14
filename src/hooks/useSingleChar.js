import { useEffect, useState } from "react";
import { getSingleCharacterAction } from "reduxDucks/charsDuck";

export default function useSingleChar({ id }) {
  const [char, setChar] = useState({});
  useEffect(() => {
      setChar(getSingleCharacterAction(id))
  },[id])

  return char
}
