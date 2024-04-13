import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseService } from "./Firebase";

export class AuthService {
  constructor() {
    this._auth = getAuth(firebaseService.app);
  }

  authorizeUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this._auth, resolve, reject);
    });
  }

  singIn(email, password) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  singUp(email, password) {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  logOut() {
    return signOut(this._auth);
  }
}

export const authService = new AuthService();
