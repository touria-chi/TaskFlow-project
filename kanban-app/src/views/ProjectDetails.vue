<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '../stores/projectStore'
import TaskCard from '@/components/TaskCard.vue'
import TaskModal from '@/components/TaskModal.vue'
import AppNavbar from '@/components/AppNavbar.vue'

const route = useRoute()
const router = useRouter()
const projectId = route.params.id
const projectStore = useProjectStore()

// Modal tâche
const showModal = ref(false)
const editingTask = ref(null)
const editingColumn = ref(null)

// Charger les tâches
onMounted(() => {
  projectStore.getTasks(projectId)
})

// Tâches par statut
const tasks = computed(() => ({
  todo: (projectStore.tasks[projectId] || []).filter(t => t.status === 'todo'),
  doing: (projectStore.tasks[projectId] || []).filter(t => t.status === 'doing'),
  done: (projectStore.tasks[projectId] || []).filter(t => t.status === 'done')
}))

// Statistiques
const stats = computed(() => ({
  total: tasks.value.todo.length + tasks.value.doing.length + tasks.value.done.length,
  todo: tasks.value.todo.length,
  doing: tasks.value.doing.length,
  done: tasks.value.done.length
}))

// Modal controls
const openModal = (column, task = null) => {
  editingColumn.value = column
  editingTask.value = task
  showModal.value = true
}
const closeModal = () => {
  showModal.value = false
  editingTask.value = null
}

// CRUD tâches
const saveTask = async ({ title, desc, dueDate }) => {
  if (editingTask.value) {
    await projectStore.updateTask(projectId, editingTask.value.id, { title, desc, dueDate })
  } else {
    await projectStore.addTask(projectId, {
      title,
      desc,
      dueDate,
      status: editingColumn.value,
      createdAt: new Date()
    })
  }
  closeModal()
}

const deleteTask = async (task) => {
  await projectStore.deleteTask(projectId, task.id)
}

const moveTask = async (task, toStatus) => {
  await projectStore.updateTask(projectId, task.id, { status: toStatus })
}

// Bouton retour
const goBack = () => {
  router.back()
}
</script>

<template>
<div class="project-page">
  <!-- Navbar fixée -->
  <AppNavbar class="fixed-navbar" />

  <div class="container">
    <!-- Bouton Retour -->
    <button class="back-btn" @click="goBack">
      <i class="fa-solid fa-arrow-left"></i>
      Retour
    </button>

    <!-- Header avec titre et stats -->
    <div class="page-header">
      <div class="header-left">
        <div class="icon-wrapper">
          <i class="fa-solid fa-list-check"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">TaskFlow</h1>
          <p class="page-subtitle">Planifiez, avancez et réussissez — une tâche à la fois</p>
        </div>
      </div>
      <div class="header-right">
        <div class="stat-pill">
          <span class="stat-label">Total tâches</span>
          <span class="stat-number">{{ stats.total }}</span>
        </div>
        <div class="stat-pill">
          <span class="stat-label">Terminées</span>
          <span class="stat-number">{{ stats.done }}</span>
        </div>
      </div>
    </div>

    <!-- Kanban Board -->
    <div class="board">
      <!-- Colonne À faire -->
      <div class="column">
        <div class="col-header todo-header">
          <div class="col-title">
            <i class="fa-solid fa-clipboard-list"></i>
            <span>À faire</span>
          </div>
          <span class="col-count">{{ stats.todo }}</span>
        </div>

        <button class="add-task-btn" @click="openModal('todo')">
          <i class="fa-solid fa-plus"></i>
          Ajouter une tâche
        </button>

        <div class="tasks-container">
          <TaskCard
            v-for="task in tasks.todo"
            :key="task.id"
            :title="task.title"
            :desc="task.desc"
            :dueDate="task.dueDate"
            :status="task.status"
            @edit="openModal('todo', task)"
            @delete="deleteTask(task)"
            @move="moveTask(task, 'doing')"
          />
          <div v-if="tasks.todo.length === 0" class="empty-state">
            Aucune tâche
          </div>
        </div>
      </div>

      <!-- Colonne En cours -->
      <div class="column">
        <div class="col-header doing-header">
          <div class="col-title">
            <i class="fa-solid fa-bolt"></i>
            <span>En cours</span>
          </div>
          <span class="col-count">{{ stats.doing }}</span>
        </div>

        <button class="add-task-btn" @click="openModal('doing')">
          <i class="fa-solid fa-plus"></i>
          Ajouter une tâche
        </button>

        <div class="tasks-container">
          <TaskCard
            v-for="task in tasks.doing"
            :key="task.id"
            :title="task.title"
            :desc="task.desc"
            :dueDate="task.dueDate"
            :status="task.status"
            @edit="openModal('doing', task)"
            @delete="deleteTask(task)"
            @move="moveTask(task, 'done')"
          />
          <div v-if="tasks.doing.length === 0" class="empty-state">
            Aucune tâche
          </div>
        </div>
      </div>

      <!-- Colonne Terminé -->
      <div class="column">
        <div class="col-header done-header">
          <div class="col-title">
            <i class="fa-solid fa-circle-check"></i>
            <span>Terminé</span>
          </div>
          <span class="col-count">{{ stats.done }}</span>
        </div>

        <button class="add-task-btn" @click="openModal('done')">
          <i class="fa-solid fa-plus"></i>
          Ajouter une tâche
        </button>

        <div class="tasks-container">
          <TaskCard
            v-for="task in tasks.done"
            :key="task.id"
            :title="task.title"
            :desc="task.desc"
            :dueDate="task.dueDate"
            :status="task.status"
            @edit="openModal('done', task)"
            @delete="deleteTask(task)"
            @move="moveTask(task, 'todo')"
          />
          <div v-if="tasks.done.length === 0" class="empty-state">
            Aucune tâche
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Tâche -->
  <TaskModal :show="showModal" :task="editingTask" @close="closeModal" @save="saveTask"/>
</div>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Navbar fixée */
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

/* Page principale */
.project-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%);
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: white;
  padding-top: 80px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Bouton Retour */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(168, 85, 247, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 12px;
  color: #d1b3e0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.back-btn:hover {
  background: linear-gradient(90deg, #a855f7 0%, #ec4899 100%);
  color: #fff;
  transform: translateX(-4px);
  box-shadow: 0 4px 16px rgba(168, 85, 247, 0.4);
}

.back-btn i {
  font-size: 14px;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  background: rgba(88, 28, 135, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 20px;
  padding: 28px 32px;
  backdrop-filter: blur(10px);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.4);
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 14px;
  color: #d1b3e0;
  margin: 0;
}

.header-right {
  display: flex;
  gap: 16px;
}

.stat-pill {
  background: rgba(168, 85, 247, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 12px;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-label {
  font-size: 12px;
  color: #d1b3e0;
  text-transform: capitalize;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

/* Kanban Board */
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.column {
  background: rgba(88, 28, 135, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Column Header */
.col-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(168, 85, 247, 0.1);
}

.todo-header {
  background: rgba(251, 191, 36, 0.15);
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.doing-header {
  background: rgba(236, 72, 153, 0.15);
  border: 1px solid rgba(236, 72, 153, 0.3);
}

.done-header {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.col-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
}

.col-count {
  background: rgba(255, 255, 255, 0.15);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

/* Add Task Button */
.add-task-btn {
  width: 100%;
  padding: 12px;
  border: 2px dashed rgba(168, 85, 247, 0.3);
  border-radius: 12px;
  background: transparent;
  color: #d1b3e0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.add-task-btn:hover {
  background: rgba(168, 85, 247, 0.1);
  border-color: rgba(168, 85, 247, 0.5);
  color: #fff;
}

/* Tasks Container */
.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 200px;
}

.empty-state {
  text-align: center;
  color: #9ca3af;
  padding: 40px 20px;
  font-size: 14px;
}

/* Responsive */
@media (max-width: 1024px) {
  .board {
    grid-template-columns: 1fr;
  }
  
  .page-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .header-left {
    flex-direction: column;
  }
  
  .header-right {
    justify-content: center;
  }
}
</style>