<template>
  <div class="auth-container">
    <!-- Background Decorations -->
    <div class="bg-decoration decoration-1"></div>
    <div class="bg-decoration decoration-2"></div>
    <div class="bg-decoration decoration-3"></div>

    <div class="auth-card">
      <!-- Logo & Header -->
      <div class="auth-header">
        <div class="logo">
          <div class="logosvg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
          </div>
          <span class="logo-text">TaskFlow</span>
        </div>
        <h1 class="auth-title">
          {{ isLogin ? 'Bon retour !' : 'Bienvenue' }}
        </h1>
        <p class="auth-subtitle">
          {{ isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte gratuitement' }}
        </p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="error-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>{{ error }}</span>
      </div>

      <!-- Auth Form -->
      <form @submit.prevent="submit" class="auth-form">
        <div v-if="!isLogin" class="form-group">
          <label class="form-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Nom complet
          </label>
          <input
            v-model="name"
            type="text"
            class="form-input"
            placeholder="John Doe"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Email
          </label>
          <input
            v-model="email"
            type="email"
            class="form-input"
            placeholder="vous@exemple.com"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Mot de passe
          </label>
          <input
            v-model="password"
            type="password"
            class="form-input"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="btn-submit" :disabled="loading">
          <span v-if="loading" class="loader"></span>
          <span v-else>{{ isLogin ? 'Se connecter' : 'Créer mon compte' }}</span>
          <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </form>

      <!-- Divider -->
      <div class="divider">
        <span class="divider-line"></span>
        <span class="divider-text">OU</span>
        <span class="divider-line"></span>
      </div>

      <!-- Google Sign In -->
      <button @click="loginWithGoogle" class="btn-google">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span>Continuer avec Google</span>
      </button>

      <!-- Toggle Mode -->
      <div class="auth-toggle">
        <p class="toggle-text">
          {{ isLogin ? "Vous n'avez pas de compte ?" : 'Vous avez déjà un compte ?' }}
          <button @click="toggleMode" class="toggle-btn">
            {{ isLogin ? "S'inscrire" : 'Se connecter' }}
          </button>
        </p>
      </div>
    </div>

    <!-- Back to Home -->
    <button @click="$router.push('/')" class="btn-back">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="19" y1="12" x2="5" y2="12"/>
        <polyline points="12 19 5 12 12 5"/>
      </svg>
      Retour à l'accueil
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth, provider } from '@/firebase/config'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLogin = ref(true)
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  name.value = ''
  email.value = ''
  password.value = ''
}

const submit = async () => {
  error.value = ''
  loading.value = true
  try {
    if (isLogin.value) {
      await signInWithEmailAndPassword(auth, email.value, password.value)
    } else {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      )
      await updateProfile(cred.user, { displayName: name.value })
    }
    router.push('/dashboard')
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      error.value = 'Cet email est déjà utilisé'
    } else if (err.code === 'auth/weak-password') {
      error.value = 'Le mot de passe doit contenir au moins 6 caractères'
    } else if (err.code === 'auth/invalid-email') {
      error.value = 'Email invalide'
    } else if (err.code === 'auth/user-not-found') {
      error.value = 'Aucun utilisateur trouvé avec cet email'
    } else if (err.code === 'auth/wrong-password') {
      error.value = 'Mot de passe incorrect'
    } else {
      error.value = 'Une erreur est survenue. Veuillez réessayer.'
    }
  } finally {
    loading.value = false
  }
}

const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Erreur lors de la connexion avec Google'
  }
}
</script>

<style scoped>

.logosvg {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.auth-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0626 0%, #1a0b2e 50%, #2d1b4e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

/* Background Decorations */
.bg-decoration {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(60px);
}

.decoration-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  top: -200px;
  right: -200px;
  animation: float 8s ease-in-out infinite;
}

.decoration-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  bottom: -150px;
  left: -150px;
  animation: float 10s ease-in-out infinite;
  animation-delay: 2s;
}

.decoration-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  top: 50%;
  right: 10%;
  animation: float 12s ease-in-out infinite;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-30px) scale(1.05); }
}

/* Auth Card */
.auth-card {
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 1;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header */
.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.logo-icon {
  font-size: 2rem;
  color: #8b5cf6;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
}

.auth-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
}

.auth-subtitle {
  color: #a78bfa;
  font-size: 1rem;
  margin: 0;
}

/* Error Message */
.error-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  padding: 1rem;
  color: #fca5a5;
  margin-bottom: 1.5rem;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.error-message svg {
  flex-shrink: 0;
}

/* Form */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a78bfa;
  font-size: 0.875rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input::placeholder {
  color: rgba(167, 139, 250, 0.5);
}

.form-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
}

/* Submit Button */
.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(167, 139, 250, 0.3);
}

.divider-text {
  color: #a78bfa;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Google Button */
.btn-google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  background: white;
  color: #374151;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.875rem 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-google:hover {
  background: #f9fafb;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Toggle */
.auth-toggle {
  margin-top: 1.5rem;
  text-align: center;
}

.toggle-text {
  color: #a78bfa;
  font-size: 0.875rem;
  margin: 0;
}

.toggle-btn {
  background: none;
  border: none;
  color: #ec4899;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;
  transition: color 0.2s ease;
  margin-left: 0.25rem;
}

.toggle-btn:hover {
  color: #8b5cf6;
  text-decoration: underline;
}

/* Back Button */
.btn-back {
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.btn-back:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-4px);
}

/* Responsive */
@media (max-width: 768px) {
  .auth-container {
    padding: 1rem;
  }

  .auth-card {
    padding: 2rem 1.5rem;
  }

  .auth-title {
    font-size: 1.75rem;
  }

  .btn-back {
    top: 1rem;
    left: 1rem;
    padding: 0.625rem 1rem;
  }

  .decoration-1,
  .decoration-2,
  .decoration-3 {
    display: none;
  }
}
</style>