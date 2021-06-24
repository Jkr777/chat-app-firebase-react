import { useState, useEffect } from 'react';
import { firebase } from "../firebase/firebase";

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth.onAuthStateChanged(user => {
      if(user) {
        let firestoreUser = {
          displayName: user.displayName,
          photoUrl: user.photoURL,
          uid: user.uid
        };

        setUser(firestoreUser);
        
        firebase.db.collection('users').doc(user.uid).set(firestoreUser, { merge: true });
      } else {
        setUser(null);
      }
    }) 
  }, []);

  return user;
}

export default useAuth;