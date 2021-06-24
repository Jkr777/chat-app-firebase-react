import React from "react";
import { firebase } from "../../firebase/firebase";
import { NavLink } from "react-router-dom";

function LeftBLock({ displayName, avatar, channels, channelId }) {
  return (
    <section className="left-block">
      <div className="left-block__user">
        <img className="left-block__img" src={avatar} alt="imagine" />
      <div className="left-block__top">
        <span className="left-block__name">{displayName}</span>
        <button className="btn" onClick={() => firebase.logout()}>log out</button>
      </div>
    </div>
    <div className="left-block__bottom">
      {channels.map(e => <NavLink key={e.id} to={e.id} className={channelId === e.id ?"left-block__bottom__link left-block__bottom__link--active": "left-block__bottom__link"}># {e.id}</NavLink>)}
    </div>
  </section>
  )
}

export default LeftBLock;