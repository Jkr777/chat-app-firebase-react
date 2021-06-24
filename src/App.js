import React, { useState } from 'react';
import useAuth from "./customHooks/useAuth";
import { firebase } from "./firebase/firebase";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Chat from "./pages/chat";

function App() {
  const user = useAuth();
  const [error, setError] = useState(null);

  async function handleSignIn() {
    try {
      await firebase.signIn();
    } catch(err) {
      setError(err);
    }
  }

  return user 
    ? (
      <BrowserRouter>
        <Switch>
          <Route path="/chat/:channelId" render={props => <Chat user={user} {...props} />} exact/>
          <Redirect to="/chat/general" />
        </Switch>
      </BrowserRouter>
      )
    : (
      <div className="no-user">
        <h1>Chat Demo!</h1>
        <button onClick={handleSignIn} className="no-user__btn">Sign in with google</button>
        {error && <h2 className="no-user__error">{error.message}</h2>}
      </div>
    )
}

export default App;
