import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/firebase";
import { formatRelative, subDays } from "date-fns";

function Message({ autoScroll, text, userPath, cssClass, createdAt }) {
  const [author, setAuthor] = useState();

  useEffect(() => {
    let stillMount = true;
    firebase.db.doc(userPath).get().then(doc => {
      if(stillMount) {
        autoScroll();
        setAuthor({
          ...doc.data(),
          id: doc.id
        });
      }
    });
    return () => {
      stillMount = false;
    }
  }, [userPath]);
  
  return (
    <>
      <div className="new-mess__top">
        {/* <img className="new-mess__top__img" src={author && author.photoUrl} alt="author" /> */}
        <span className="new-mess__top__name">{author && author.displayName}</span>
        <span className="new-mess__top__date">{formatRelative(subDays(new Date(createdAt.seconds * 1000), 3), new Date())}</span>
      </div>
      <p className={cssClass}>{text}</p>
    </>
  );
}

export default Message;