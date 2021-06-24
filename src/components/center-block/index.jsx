import React, { useState, useEffect, useRef } from "react";
import { firebase } from "../../firebase/firebase";
import MessForm from "../mess-form";
import Message from "../message";

function CenterBlock({ displayName, uid, channelId }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const scroll = useRef(true);

  function handleShowAvatar(previous, message) {
    const isFirst = !previous;
    if(isFirst) return true;

    const differentUser = message.user.id !== previous.user.id;
    if(differentUser) return true;

    const newMess = message.createdAt.seconds - previous.createdAt.seconds  > 600;
    return newMess;
  }

  function handleScroll() {
    const node = scroll.current;
    const { scrollTop, clientHeight, scrollHeight } = node;
    const bottomChat = scrollHeight === clientHeight + scrollTop;
    scroll.current = bottomChat;
  }

  function autoScroll() {
    const refNode = scrollRef.current;
    refNode.scrollTop = refNode.scrollHeight;
  }

  useEffect(() => {
    const unsub = firebase.db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        const docs = [];
        snapshot.forEach(doc => docs.push({...doc.data(), id: doc.id}));
        setMessages(docs);
      });
      return () => unsub();
  }, [channelId]);

  useEffect(() => {
    if(scroll.current) {
      const refNode = scrollRef.current;
      refNode.scrollTop = refNode.scrollHeight;
    }
  });
  
  return (
    <section className="center-block" ref={scrollRef} onScroll={handleScroll} >
    <div className="center-block__info">
      <span className="center-block__info__topic"># {displayName}</span>
      <button className="btn" onClick={() => firebase.logout()}>log out</button>
    </div>
    <div className="center-block__messages">
      <div className="new-mess">
        { messages.map((mess, i) => {
          const prevMess = messages[i - 1];
          const showAvatar = handleShowAvatar(prevMess, mess);
          
          return showAvatar ? (
            <Message key={mess.id} autoScroll={autoScroll} userPath={mess.user.path} text={mess.text} cssClass={mess.user.id === uid ? "new-mess--send": "new-mess--received"} createdAt={mess.createdAt} /> )
            : <p key={mess.id} className={mess.user.id === uid ? "new-mess--send": "new-mess--received"}>{mess.text}</p>
        })}
      </div>
    </div>
    <div className="line"></div>
    <MessForm autoScroll={autoScroll} uid={uid} channelId={channelId} />
  </section>
  )
}

export default CenterBlock;