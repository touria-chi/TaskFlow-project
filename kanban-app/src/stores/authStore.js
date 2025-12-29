import { defineStore } from 'pinia';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    async register(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        console.log('Inscription réussie:', this.user);
      } catch (err) {
        console.error('Erreur inscription:', err.message);
      }
    },
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        console.log('Connexion réussie:', this.user);
      } catch (err) {
        console.error('Erreur login:', err.message);
      }
    },
    async logout() {
      await signOut(auth);
      this.user = null;
    },
    async loginWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        this.user = result.user;
        console.log('Connexion Google réussie:', this.user);
      } catch (err) {
        console.error('Erreur Google login:', err.message);
      }
    }
  }
});
