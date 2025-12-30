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
const selectedColor = ref('#8b5cf6')

const colors = [
  '#8b5cf6', '#ec4899', '#4dd0c8', '#7b1fa2', '#66bb6a', '#ef5350',
  '#42a5f5', '#fdd835', '#26c6da', '#ab47bc', '#ec407a', '#5c6bc0'
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
    selectedColor.value = '#8b5cf6'
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
        <div class="header">
          <h2>{{ project ? 'Modifier le projet' : 'Ajouter un projet' }}</h2>
          <button class="close" @click="$emit('close')">×</button>
        </div>

        <!-- Content -->
        <div class="content">
          <label>Titre du projet</label>
          <input v-model="title" type="text" placeholder="Nom du projet"/>

          <label>Description</label>
          <textarea v-model="description" placeholder="Description du projet"></textarea>

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

        <!-- Actions -->
        <div class="actions">
          <button class="cancel" @click="$emit('close')">Annuler</button>
          <button class="save" @click="submit">{{ project ? 'Modifier' : 'Ajouter' }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.overlay {
  position: fixed; inset:0;
  background: rgba(26,11,46,0.85);
  backdrop-filter: blur(16px);
  display:flex; justify-content:center; align-items:center;
  z-index:1000;
}

.modal {
  width:100%; max-width:450px;
  background: linear-gradient(145deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1));
  border-radius:28px;
  box-shadow:0 25px 60px rgba(123,31,162,0.35),0 12px 40px rgba(236,72,153,0.25);
  color:white; overflow:hidden; display:flex; flex-direction:column;
}

.header {
  padding:18px 22px; display:flex; justify-content:space-between; align-items:center;
  border-bottom:1px solid rgba(255,255,255,0.15);
}
.header h2 {
  font-size:18px; font-weight:700;
  background: linear-gradient(90deg,#8b5cf6,#ec4899);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
}
.close {
  background: rgba(255,255,255,0.15); border:none; color:white;
  font-size:18px; width:32px; height:32px; border-radius:50%; cursor:pointer;
}

.content {
  padding:22px; display:flex; flex-direction:column; gap:14px;
}
label { font-size:13px; color:#d8b4fe; }
input, textarea {
  width:100%; padding:12px 14px; border-radius:14px;
  background: rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25);
  color:white; outline:none; transition: all 0.25s ease;
}
input:focus, textarea:focus {
  background: rgba(139,92,246,0.12);
  box-shadow:0 0 12px rgba(236,72,153,0.5);
}
textarea { min-height:80px; resize:none; }

.colors {
  display:grid; grid-template-columns: repeat(6,1fr); gap:12px; margin-top:6px;
}
.color {
  width:100%; aspect-ratio:1; border-radius:10px; cursor:pointer;
  display:flex; align-items:center; justify-content:center; font-weight:900;
  color:white; box-shadow:0 6px 18px rgba(0,0,0,0.4);
}
.color span { background: rgba(255,255,255,0.25); width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; }

.preview {
  padding:14px; border-radius:14px; border:2px solid; background: rgba(255,255,255,0.1);
}
.preview h4 { font-size:15px; font-weight:700; }
.preview p { font-size:13px; color:#e9d5ff; }

.actions {
  padding:18px 22px; display:flex; gap:14px;
}
.cancel {
  flex:1; padding:12px; border-radius:14px; border:none;
  background: rgba(255,255,255,0.25); color:white; font-weight:700; cursor:pointer;
}
.save {
  flex:1; padding:12px; border-radius:14px; border:none;
  background: linear-gradient(90deg,#5eead4,#ec4899); color:white; font-weight:700; cursor:pointer;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity:0; }
</style>
