import app from "firebase/app";
import "firebase/firestore"; 
import "firebase/auth"; 
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth(); 
    this.db = app.firestore();  
    this.provider = new app.auth.GoogleAuthProvider();
  }

  async signIn() {
    return await this.auth.signInWithPopup(this.provider);
  }

  async logout() {
    await this.auth.signOut();
  }

}

export const firebase = new Firebase();