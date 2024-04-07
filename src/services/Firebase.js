import { initializeApp } from "firebase/app";

export class Firebase {
  constructor() {
    this._app = initializeApp({
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: "irregular-verbs-e64f2.firebaseapp.com",
      projectId: "irregular-verbs-e64f2",
      storageBucket: "irregular-verbs-e64f2.appspot.com",
      messagingSenderId: "747254460509",
      appId: "1:747254460509:web:085a5e50e9d4905fb31db4",
    });
  }

  get app() {
    return this._app;
  }
}

export const firebaseService = new Firebase();
