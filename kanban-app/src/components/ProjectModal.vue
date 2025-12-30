<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  project: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close','save'])

const title = ref('')
const description = ref('')
const selectedColor = ref('#ec4899')

const colors = [
  '#ec4899', '#14b8a6', '#f59e0b', '#a855f7', '#22c55e', '#f87171',
  '#3b82f6', '#eab308', '#06b6d4', '#8b5cf6', '#fb7185', '#6366f1'
]

// On initialise le formulaire selon le project passé
watch(() => props.project, (p) => {
  if(p){
    title.value = p.name
    description.value = p.description
    selectedColor.value = p.color
  } else {
    title.value = ''
    description.value = ''
    selectedColor.value = '#ec4899'
  }
}, { immediate:true })

const submit = () => {
  emit('save', { name:title.value, description:description.value, color:selectedColor.value })
}
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="overlay" @click.self="$emit('close')">
      <div class="modal">
        <!-- Header -->
        <div class="modal-header">
          <h2>{{ project ? 'Modifier le projet' : 'Nouveau projet' }}</h2>
          <button class="close-btn" @click="$emit('close')">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Content -->
        <div class="modal-content">
          <div class="form-group">
            <label>Titre du projet</label>
            <input v-model="title" type="text" placeholder="Refonte Site Web"/>
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea v-model="description" placeholder="Moderniser l'interface utilisateur du site corporate"></textarea>
          </div>

          <div class="form-group">
            <label>Couleur du projet</label>
            <div class="color-grid">
              <div
                v-for="c in colors"
                :key="c"
                class="color-option"
                :style="{ background: c }"
                :class="{ active: selectedColor === c }"
                @click="selectedColor = c"
              >
                <i v-if="selectedColor === c" class="fa-solid fa-check"></i>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Aperçu</label>
            <div class="preview-card" :style="{ borderColor: selectedColor }">
              <h4>{{ title || 'Refonte Site Web' }}</h4>
              <p>{{ description || 'Moderniser l\'interface utilisateur du site corporate' }}</p>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="modal-footer">
          <button class="btn-cancel" @click="$emit('close')">Annuler</button>
          <button class="btn-save" @click="submit">
            {{ project ? 'Modifier' : 'Ajouter' }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 11, 46, 0.9);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

/* Modal */
.modal {
  width: 100%;
  max-width: 440px;
  background: linear-gradient(145deg, #2d1b4e 0%, #1a0b2e 100%);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 24px;
  box-shadow: 0 25px 70px rgba(123, 31, 162, 0.5);
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(168, 85, 247, 0.2);
}

.modal-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.close-btn {
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 24px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(168, 85, 247, 0.15);
  color: #fff;
}

/* Content */
.modal-content {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-height: 70vh;
  overflow-y: auto;
}

/* Scrollbar styling */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(168, 85, 247, 0.1);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: rgba(168, 85, 247, 0.3);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: rgba(168, 85, 247, 0.5);
}

/* Form Group */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #d1b3e0;
  margin-bottom: 0;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(88, 28, 135, 0.3);
  border: 1px solid rgba(168, 85, 247, 0.4);
  color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  font-family: inherit;
  box-sizing: border-box;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #9ca3af;
}

.form-group input:focus,
.form-group textarea:focus {
  background: rgba(88, 28, 135, 0.3);
  border-color: rgba(168, 85, 247, 0.6);
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
}

.form-group textarea {
  min-height: 90px;
  resize: vertical;
  line-height: 1.5;
}

/* Color Grid */
.color-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}

.color-option {
  aspect-ratio: 1;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.color-option:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.color-option.active {
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.color-option i {
  color: white;
  font-size: 16px;
  font-weight: 900;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* Preview Card */
.preview-card {
  padding: 18px;
  border-radius: 16px;
  border: 2px solid;
  background: rgba(88, 28, 135, 0.2);
  backdrop-filter: blur(10px);
}

.preview-card h4 {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px 0;
}

.preview-card p {
  font-size: 14px;
  color: #d1b3e0;
  margin: 0;
  line-height: 1.5;
}

/* Footer */
.modal-footer {
  padding: 18px 24px;
  border-top: 1px solid rgba(168, 85, 247, 0.2);
  display: flex;
  gap: 12px;
}

.btn-cancel,
.btn-save {
  flex: 1;
  padding: 14px 24px;
  border-radius: 12px;
  border: none;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: rgba(168, 85, 247, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.3);
  color: #d1b3e0;
}

.btn-cancel:hover {
  background: rgba(168, 85, 247, 0.25);
  color: #fff;
}

.btn-save {
  background: linear-gradient(90deg, #06b6d4 0%, #ec4899 100%);
  color: white;
  box-shadow: 0 4px 16px rgba(236, 72, 153, 0.3);
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.5);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .modal,
.fade-leave-active .modal {
  transition: transform 0.3s ease;
}

.fade-enter-from .modal,
.fade-leave-to .modal {
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 640px) {
  .modal {
    max-width: 95%;
  }

  .color-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
  }
}
</style>