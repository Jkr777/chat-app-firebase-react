import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/firebase";
import LeftBlock from "../../components/left-block";
import CenterBlock from "../../components/center-block";
import RightBlock from "../../components/right-block";

function Chat({ user, match }) {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    return firebase.db.collection("channels").onSnapshot(snapshot => {
      const docs = [];
      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id
        });
      })
      setChannels(docs);
    }); 
  }, []);

  useEffect(() => {
    firebase.db.doc(`users/${user.uid}`).update({
      [`channels.${match.params.channelId}`]: true
    });
  }, [user.uid, match.params.channelId]);

  return (
    <div className="container">
      {/* <LeftBlock
        displayName={user.displayName}
        avatar={user.photoUrl}
        channelId={match.params.channelId}  
        channels={channels}
      /> */}
      <CenterBlock 
        displayName={user.displayName}
        channelId={match.params.channelId}
        uid={user.uid}
      />
      {/* <RightBlock 
        channelId={match.params.channelId}
        uid={user.uid}
      /> */}
    </div>
  )
}

export default Chat;