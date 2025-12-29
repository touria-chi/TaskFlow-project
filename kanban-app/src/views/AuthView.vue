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
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1 class="title">TaskFlow</h1>
      <p class="subtitle">
        {{ isLogin ? 'Connexion à votre compte' : 'Créer un nouveau compte' }}
      </p>

      <p v-if="error" class="error">{{ error }}</p>

      <form @submit.prevent="submit" class="form">
        <input
          v-if="!isLogin"
          v-model="name"
          type="text"
          placeholder="Nom complet"
        />

        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Mot de passe" />

        <button class="primary" type="submit" :disabled="loading">
          {{ loading ? 'Chargement…' : isLogin ? 'Se connecter' : "S'inscrire" }}
        </button>
      </form>

      <div class="divider"><span>OU</span></div>

      <!-- Google Button -->
      <button class="google-btn" @click="loginWithGoogle">
        <span class="google-icon">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
        </span>
        <span class="google-text">Continuer avec Google</span>
      </button>

      <p class="switch">
        {{ isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?' }}
        <span @click="toggleMode">
          {{ isLogin ? "S'inscrire" : 'Se connecter' }}
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>

.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2e025c, #4a0072);
  font-family: 'Poppins', system-ui, sans-serif;
}


.card {
  width: 100%;
  max-width: 420px;
  padding: 42px 38px;
  border-radius: 28px;
  background: linear-gradient(
    145deg,
    rgba(147, 51, 234, 0.35),
    rgba(236, 72, 153, 0.25)
  );
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
}


.title {
  text-align: center;
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(90deg, #ff80ab, #ea80fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.subtitle {
  text-align: center;
  color: #e1bee7;
  margin-bottom: 28px;
}


.error {
  text-align: center;
  color: #ff9aa2;
  margin-bottom: 18px;
}


.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}


input {
  width: 100%;
  max-width: 320px;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: white;
  font-size: 15px;
  text-align: center;
  outline: none;
  transition: 0.25s ease;
}

input::placeholder {
  color: #f3e8ff;
}

input:focus {
  border-color: #f472b6;
  box-shadow: 0 0 0 3px rgba(244, 114, 182, 0.4);
}


.primary {
  width: 100%;
  max-width: 320px;
  padding: 14px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  color: white;
  background: linear-gradient(90deg, #ea80fc, #ff80ab);
  transition: all 0.25s ease;
}

.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgba(234, 128, 252, 0.6);
}


.divider {
  margin: 28px 0;
  display: flex;
  align-items: center;
  gap: 16px;
  color: #f3e8ff;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}


.google-btn {
  width: 100%;
  max-width: 320px;
  margin: 0 auto 20px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 16px;
  background: white;
  color: #374151;
  font-weight: 700;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.google-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.google-icon img {
  width: 20px;
  height: 20px;
}

.google-text {
  line-height: 1;
}

.google-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.25);
}


.switch {
  text-align: center;
  color: #e9d5ff;
  font-size: 14px;
}

.switch span {
  color: #ff80ab;
  font-weight: 700;
  cursor: pointer;
}

.switch span:hover {
  text-decoration: underline;
}
</style>
