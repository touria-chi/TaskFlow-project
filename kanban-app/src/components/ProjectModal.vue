<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  project: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const title = ref('')
const description = ref('')
const selectedColor = ref('#f59e0b')

const colors = [
  '#ff7aa2', '#4dd0c8', '#f59e0b', '#9c27b0', '#66bb6a', '#ef5350',
  '#42a5f5', '#fdd835', '#26c6da', '#ab47bc', '#ec407a', '#5c6bc0'
]

watch(
  () => props.project,
  (p) => {
    if (p) {
      title.value = p.name
      description.value = p.description
      selectedColor.value = p.color
    } else {
      title.value = ''
      description.value = ''
      selectedColor.value = '#f59e0b'
    }
  },
  { immediate: true }
)

const submit = () => {
  emit('save', {
    name: title.value,
    description: description.value,
    color: selectedColor.value
  })
}
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="overlay" @click.self="$emit('close')">
      <div class="modal">

       
        <div class="header">
          <h2>Modifier le projet</h2>
          <button class="close" @click="$emit('close')">×</button>
        </div>

        
        <div class="content">
          <label>Titre du projet</label>
          <input v-model="title" type="text" />

          <label>Description</label>
          <textarea v-model="description"></textarea>

          <label>Couleur du projet</label>
          <div class="colors">
            <div
              v-for="c in colors"
              :key="c"
              class="color"
              :style="{ background: c }"
              @click="selectedColor = c"
            >
              <span v-if="selectedColor === c">✓</span>
            </div>
          </div>

          
          <label>Aperçu</label>
          <div class="preview" :style="{ borderColor: selectedColor }">
            <h4>{{ title || 'Titre du projet' }}</h4>
            <p>{{ description || 'Description du projet' }}</p>
          </div>
        </div>

       
        <div class="actions">
          <button class="cancel" @click="$emit('close')">Annuler</button>
          <button class="save" @click="submit">Modifier</button>
        </div>

      </div>
    </div>
  </transition>
</template>

<style scoped>

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 0, 25, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}


.modal {
  width: 100%;
  max-width: 420px;
  background: linear-gradient(160deg, #3a145f, #2a0b45);
  border-radius: 22px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.7);
  color: white;
  overflow: hidden;
}


.header {
  padding: 18px 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.header h2 {
  font-size: 18px;
  font-weight: 700;
}

.close {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  font-size: 18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}


.content {
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

label {
  font-size: 13px;
  color: #d8b4fe;
}


input,
textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  outline: none;
}

textarea {
  resize: none;
  min-height: 80px;
}


.colors {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-top: 6px;
}

.color {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: white;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.color span {
  background: rgba(255, 255, 255, 0.25);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.preview {
  padding: 14px;
  border-radius: 14px;
  border: 2px solid;
  background: rgba(255, 255, 255, 0.1);
}

.preview h4 {
  font-size: 15px;
  font-weight: 700;
}

.preview p {
  font-size: 13px;
  color: #e9d5ff;
}


.actions {
  padding: 18px 22px;
  display: flex;
  gap: 14px;
}

.cancel {
  flex: 1;
  padding: 12px;
  border-radius: 14px;
  border: none;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.save {
  flex: 1;
  padding: 12px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(90deg, #5eead4, #ec4899);
  color: white;
  font-weight: 700;
  cursor: pointer;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
