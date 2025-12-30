import { defineStore } from 'pinia'
import { auth } from '../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: true
  }),

  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        this.user = user
        this.loading = false
        console.log('Auth state changed:', user)
      })
    },

    async logout() {
      await signOut(auth)
      this.user = null
    }
  }
})
