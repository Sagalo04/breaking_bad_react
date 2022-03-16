import { useEffect, useState } from "react";

export default function useQualification({quals,id,user_id}) {
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

    return {qualification,qualificationPersonal,qualifications}
}