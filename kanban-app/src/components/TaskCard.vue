<template>
  <div class="task-card">
    <!-- Header avec titre et actions -->
    <div class="task-header">
      <h3 class="task-title">{{ title }}</h3>
      <div class="task-actions">
        <button class="action-btn edit" @click="$emit('edit')" title="Modifier">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="action-btn delete" @click="$emit('delete')" title="Supprimer">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>

    <!-- Description -->
    <p class="task-desc">{{ desc }}</p>

    <!-- Footer avec date et statut -->
    <div class="task-footer">
      <span class="due-date"><i class="fa-regular fa-calendar"></i> {{ formattedDueDate }}</span>
      <span class="status-badge" :class="statusClass">{{ statusLabel }}</span>
    </div>

    <!-- Bouton déplacer -->
    <button class="move-btn" @click="$emit('move')" title="Déplacer la tâche">
      <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  desc: String,
  dueDate: String,
  status: { type: String, default: 'todo' }
})

const formattedDueDate = computed(() => {
  if (!props.dueDate) return 'Aucune date'
  const d = new Date(props.dueDate)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
})

const statusLabel = computed(() => {
  if (props.status === 'todo') return 'À faire'
  if (props.status === 'doing') return 'En cours'
  return 'Terminé'
})

const statusClass = computed(() => {
  return {
    todo: props.status === 'todo',
    doing: props.status === 'doing',
    done: props.status === 'done'
  }
})
</script>

<style scoped>
/* Police awesome icons - assure-toi de l'avoir inclus dans ton projet */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.task-card {
  background: linear-gradient(145deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1));
  border-radius: 22px;
  padding: 20px 24px;
  backdrop-filter: blur(18px);
  box-shadow: 0 15px 35px rgba(139,92,246,0.25), 0 8px 25px rgba(236,72,153,0.2);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.task-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 25px 60px rgba(139,92,246,0.45), 0 12px 40px rgba(236,72,153,0.35);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  word-break: break-word;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 10px;
  padding: 6px 8px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  transition: all 0.2s ease;
}
.action-btn:hover {
  background: rgba(236,72,153,0.25);
  transform: scale(1.1);
}

.task-desc {
  font-size: 14px;
  color: #e0c6f5;
  line-height: 1.5;
  min-height: 40px;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.due-date {
  color: #d1b3e0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  color: #fff;
}
.status-badge.todo {
  background: linear-gradient(90deg,#7c3aed,#9333ea);
}
.status-badge.doing {
  background: linear-gradient(90deg,#ec4899,#f472b6);
}
.status-badge.done {
  background: linear-gradient(90deg,#22c55e,#16a34a);
}

.move-btn {
  margin-top: 10px;
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(90deg,#8b5cf6,#ec4899);
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  transition: all 0.25s ease;
}
.move-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(236,72,153,0.5);
}
</style>
