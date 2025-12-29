<template>
  <div class="loading-container">
    <div class="spinner-wrapper">
      <!-- Spinner animé -->
      <div class="spinner">
        <div class="spinner-circle"></div>
        <div class="spinner-circle"></div>
        <div class="spinner-circle"></div>
      </div>
      
      <!-- Texte optionnel -->
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Chargement en cours...'
  }
})
</script>

<style scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
}

.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

/* Spinner avec 3 cercles animés */
.spinner {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.spinner-circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  animation: bounce 1.4s ease-in-out infinite;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
}

.spinner-circle:nth-child(1) {
  animation-delay: -0.32s;
}

.spinner-circle:nth-child(2) {
  animation-delay: -0.16s;
}

.spinner-circle:nth-child(3) {
  animation-delay: 0s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.8) translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2) translateY(-20px);
    opacity: 1;
  }
}

.loading-message {
  color: #a78bfa;
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0;
  text-align: center;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* Variante pour utilisation en overlay (fullscreen) */
.loading-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 11, 46, 0.9);
  backdrop-filter: blur(10px);
  z-index: 9999;
  min-height: 100vh;
}
</style>