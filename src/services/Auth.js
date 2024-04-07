import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase";
import { firebaseService } from "./Firebase";

export class AuthService {
  constructor() {
    this._auth = getAuth(firebaseService.app);
  }

  signIn(email, password) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  signUp(email, password) {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  logOut() {
    return signOut(this._auth);
  }
}

export const authService = new AuthService();
