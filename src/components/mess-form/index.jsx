import React, { useState } from "react";
import { firebase } from "../../firebase/firebase";

function MessForm({ autoScroll, uid, channelId }) {
  const [val, setVal] = useState("");

  function handleInputVal(e) {
    setVal(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!val.trim()) return;
    firebase.db.collection("channels").doc(channelId).collection("messages").add({
      user: firebase.db.collection("users").doc(uid),
      text: val,
      createdAt: new Date()
    });
    autoScroll();
    setVal("");
  }

  return (
    <form onSubmit={handleSubmit} className="mess-form"> 
      <textarea 
        onChange={handleInputVal} 
        value={val} 
        className="mess-form__input"
        placeholder="new message"
      />
      {/* <input onChange={handleInputVal} value={val} className="mess-form__input" type="text" placeholder="new message" maxlenght="255" /> */}
      <button className="mess-form__btn">trimite mess</button>
    </form>
  )
}

export default MessForm;