<template>
  <div class="task-card" :class="`status-${status}`">
    <!-- Header -->
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
    <p class="task-desc">{{ desc || 'Aucune description' }}</p>

    <!-- Footer -->
    <div class="task-footer">
      <div class="due-date">
        <i class="fa-regular fa-calendar"></i>
        <span :class="{ 'overdue': isOverdue }">{{ formattedDueDate }}</span>
      </div>
      <button class="move-btn" @click="$emit('move')" title="Déplacer">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>

    <!-- Status Indicator -->
    <div class="status-indicator" :class="`status-${status}`"></div>
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
  if (!props.dueDate) return 'Pas de date'
  const d = new Date(props.dueDate)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
})

const isOverdue = computed(() => {
  if (!props.dueDate) return false
  const today = new Date()
  const due = new Date(props.dueDate)
  return due < today && props.status !== 'done'
})
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.task-card {
  background: rgba(88, 28, 135, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.task-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.3);
  border-color: rgba(168, 85, 247, 0.5);
}

/* Status Indicator */
.status-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  border-radius: 16px 0 0 16px;
}

.status-indicator.status-todo {
  background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%);
}

.status-indicator.status-doing {
  background: linear-gradient(180deg, #ec4899 0%, #db2777 100%);
}

.status-indicator.status-done {
  background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
}

/* Header */
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.task-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0;
  flex: 1;
  line-height: 1.4;
}

.task-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.action-btn {
  background: rgba(168, 85, 247, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
  color: #d1b3e0;
  font-size: 13px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: rgba(168, 85, 247, 0.25);
  color: #fff;
  transform: scale(1.05);
}

.action-btn.delete:hover {
  background: rgba(239, 68, 68, 0.25);
  border-color: rgba(239, 68, 68, 0.5);
  color: #fca5a5;
}

/* Description */
.task-desc {
  font-size: 14px;
  color: #d1b3e0;
  line-height: 1.5;
  margin: 0;
  min-height: 42px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Footer */
.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.due-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #d1b3e0;
}

.due-date i {
  font-size: 12px;
}

.due-date .overdue {
  color: #fca5a5;
  font-weight: 600;
}

.move-btn {
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  color: #d1b3e0;
  font-size: 13px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.move-btn:hover {
  background: linear-gradient(90deg, #a855f7 0%, #ec4899 100%);
  color: #fff;
  transform: translateX(2px);
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
}

/* Status variations */
.task-card.status-todo {
  background: rgba(251, 191, 36, 0.05);
}

.task-card.status-doing {
  background: rgba(236, 72, 153, 0.05);
}

.task-card.status-done {
  background: rgba(34, 197, 94, 0.05);
  opacity: 0.85;
}

.task-card.status-done .task-title {
  text-decoration: line-through;
  opacity: 0.8;
}
</style>