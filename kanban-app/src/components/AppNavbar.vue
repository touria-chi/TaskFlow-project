<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo et nom de l'app -->
      <div class="navbar-brand">
        <div class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
        </div>
        <span class="app-name">TaskFlow</span>
      </div>

      <!-- Barre de recherche -->
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input 
          type="text" 
          placeholder="Rechercher un projet ou une tâche..."
          v-model="searchQuery"
        />
      </div>

      <!-- Section utilisateur -->
      <div class="user-section">
        <div class="user-menu" @click="toggleDropdown" ref="userMenuRef">
          <div class="user-avatar">
            {{ userInitial }}
          </div>
          <span class="user-name">{{ userName }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="['chevron', { 'chevron-open': dropdownOpen }]">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>

          <!-- Dropdown menu -->
          <transition name="dropdown">
            <div v-if="dropdownOpen" class="dropdown-menu">
              <button @click="handleLogout" class="dropdown-item logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Se déconnecter
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const searchQuery = ref('')
const dropdownOpen = ref(false)
const userMenuRef = ref(null)

// Récupérer le nom de l'utilisateur depuis le store
const userName = computed(() => {
  if (authStore.user) {
    // Si l'utilisateur a un displayName (Google), l'utiliser
    if (authStore.user.displayName) {
      return authStore.user.displayName
    }
    // Sinon, extraire le nom de l'email
    const email = authStore.user.email || ''
    return email.split('@')[0] || 'Utilisateur'
  }
  return 'Utilisateur'
})

// Récupérer l'initiale pour l'avatar
const userInitial = computed(() => {
  return userName.value.charAt(0).toUpperCase()
})

// Toggle dropdown
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

// Fermer le dropdown si on clique ailleurs
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

// Gérer la déconnexion
const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/auth')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.navbar {
  background: rgba(26, 11, 46, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  padding: 0 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 2rem;
}

/* Logo et brand */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.app-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
}

/* Barre de recherche */
.search-bar {
  flex: 1;
  max-width: 500px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: #6b7280;
  pointer-events: none;
}

.search-bar input {
  width: 100%;
  padding: 0.625rem 1rem 0.625rem 2.75rem;
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-radius: 12px;
  background: rgba(139, 92, 246, 0.08);
  color: #e5e7eb;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-bar input::placeholder {
  color: #6b7280;
}

.search-bar input:focus {
  background: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

/* Section utilisateur */
.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.375rem 0.875rem 0.375rem 0.375rem;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-menu:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.user-name {
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}

.chevron {
  color: white;
  transition: transform 0.3s ease;
}

.chevron-open {
  transform: rotate(180deg);
}

/* Dropdown menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: rgba(26, 11, 46, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  min-width: 200px;
  overflow: hidden;
  z-index: 1000;
}

.dropdown-item {
  width: 100%;
  padding: 0.875rem 1.25rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #e5e7eb;
  font-weight: 500;
}

.dropdown-item:hover {
  background: rgba(139, 92, 246, 0.1);
}

.dropdown-item.logout {
  color: #f87171;
}

.dropdown-item.logout:hover {
  background: rgba(248, 113, 113, 0.1);
}

/* Animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 0 1rem;
  }

  .navbar-container {
    gap: 1rem;
  }

  .search-bar {
    max-width: 300px;
  }

  .user-name {
    display: none;
  }

  .app-name {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .search-bar {
    display: none;
  }
}
</style>