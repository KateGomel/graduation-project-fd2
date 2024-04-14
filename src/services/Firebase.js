import { initializeApp } from "firebase/app";

export class Firebase {
  constructor() {
    this._app = initializeApp({
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: "irregular-verbs-progect.firebaseapp.com",
      projectId: "irregular-verbs-progect",
      storageBucket: "irregular-verbs-progect.appspot.com",
      messagingSenderId: "619700866677",
      appId: "1:619700866677:web:b797ccf0e90b56ddb7723c",
    });
  }

  get app() {
    return this._app;
  }
}

export const firebaseService = new Firebase();
