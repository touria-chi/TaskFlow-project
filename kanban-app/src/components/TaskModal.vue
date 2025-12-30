<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal">
      <h2 class="modal-title">{{ task ? 'Modifier la tâche' : 'Nouvelle tâche' }}</h2>

      <form @submit.prevent="submitForm" class="modal-form">
        <label>
          Titre
          <input v-model="form.title" type="text" placeholder="Titre de la tâche" required />
        </label>

        <label>
          Description
          <textarea v-model="form.desc" placeholder="Description détaillée de la tâche" rows="4"></textarea>
        </label>

        <label>
          Date limite
          <input v-model="form.dueDate" type="date" />
        </label>

        <div class="modal-actions">
          <button type="button" class="btn cancel" @click="close">Annuler</button>
          <button type="submit" class="btn save">{{ task ? 'Enregistrer' : 'Ajouter' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  task: Object
})
const emits = defineEmits(['close', 'save'])

const form = ref({
  title: '',
  desc: '',
  dueDate: ''
})

watch(() => props.task, (newTask) => {
  if (newTask) {
    form.value = { ...newTask }
  } else {
    form.value = { title: '', desc: '', dueDate: '' }
  }
})

const submitForm = () => {
  emits('save', form.value)
}
const close = () => {
  emits('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 5, 30, 0.75);
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: linear-gradient(145deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1));
  padding: 30px 36px;
  border-radius: 28px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 25px 60px rgba(139,92,246,0.3), 0 12px 40px rgba(236,72,153,0.2);
  animation: popIn 0.3s ease;
}

@keyframes popIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(90deg,#8b5cf6,#ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 20px;
}

.modal-form label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 600;
  color: #e0c6f5;
  margin-bottom: 16px;
}

.modal-form input,
.modal-form textarea {
  margin-top: 6px;
  padding: 10px 14px;
  border-radius: 16px;
  border: 1px solid rgba(139,92,246,0.3);
  background: rgba(139,92,246,0.05);
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: all 0.25s ease;
}
.modal-form input:focus,
.modal-form textarea:focus {
  background: rgba(139,92,246,0.12);
  border-color: #ec4899;
  box-shadow: 0 0 10px rgba(236,72,153,0.4);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  padding: 10px 18px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn.cancel {
  background: rgba(255,255,255,0.1);
  color: #e0c6f5;
}
.btn.cancel:hover {
  background: rgba(236,72,153,0.15);
}

.btn.save {
  background: linear-gradient(90deg,#8b5cf6,#ec4899);
  color: white;
}
.btn.save:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(236,72,153,0.5);
}
</style>
