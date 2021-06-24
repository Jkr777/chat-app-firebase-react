import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/firebase";

function RightBlock({ channelId, uid }) {
  const [members, setMembers] = useState([]);
  useEffect(() => {
     return firebase.db.collection("users").where(`channels.${channelId}`, "==", true).onSnapshot(snapshot => {
      const docs = [];
      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id
        });
      })
      setMembers(docs);
    }); 
  }, [channelId]);

  return (
    <section className="right-block">
      {members.map(member => <span key={member.id} className={member.uid === uid ? "right-block__name right-block__name--active" : "right-block__name"}>{member.displayName}</span>)}
    </section>
  )
}

export default RightBlock;