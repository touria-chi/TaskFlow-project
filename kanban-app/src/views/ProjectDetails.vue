<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../stores/projectStore'
import TaskCard from '@/components/TaskCard.vue'
import TaskModal from '@/components/TaskModal.vue'
import AppNavbar from '@/components/AppNavbar.vue'

const route = useRoute()
const projectId = route.params.id
const projectStore = useProjectStore()

const showModal = ref(false)
const editingTask = ref(null)
const editingColumn = ref(null)

onMounted(() => {
  projectStore.getTasks(projectId)
})

const tasks = computed(() => ({
  todo: (projectStore.tasks[projectId] || []).filter(t => t.status === 'todo'),
  doing: (projectStore.tasks[projectId] || []).filter(t => t.status === 'doing'),
  done: (projectStore.tasks[projectId] || []).filter(t => t.status === 'done')
}))

const stats = computed(() => ({
  total: tasks.value.todo.length + tasks.value.doing.length + tasks.value.done.length,
  todo: tasks.value.todo.length,
  doing: tasks.value.doing.length,
  done: tasks.value.done.length
}))

const openModal = (column, task = null) => {
  editingColumn.value = column
  editingTask.value = task
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingTask.value = null
}

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
</script>

<template>
<div class="project-page">
  <!-- Navbar fixée -->
  <AppNavbar class="fixed-navbar" />

  <!-- Header Statistiques -->
  <div class="stats">
    <div class="stat-card">
      <div class="stat-title">Total Tâches</div>
      <div class="stat-value">{{ stats.total }}</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">À faire</div>
      <div class="stat-value">{{ stats.todo }}</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">En cours</div>
      <div class="stat-value">{{ stats.doing }}</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">Terminé</div>
      <div class="stat-value">{{ stats.done }}</div>
    </div>
  </div>

  <h1 class="project-title">Task Flow - KANBAN</h1>
  <p class="project-desc">Organisez vos tâches, suivez leur avancement et restez productif en un coup d’œil.</p>

  <!-- Kanban -->
  <div class="board">
    <div v-for="col in ['todo','doing','done']" :key="col" class="column">
      <div class="col-header">
        <h2>{{ col==='todo'?'À faire':col==='doing'?'En cours':'Terminé' }}</h2>
        <span class="count">{{ tasks[col].length }}</span>
      </div>

      <TaskCard
        v-for="task in tasks[col]"
        :key="task.id"
        :title="task.title"
        :desc="task.desc"
        :dueDate="task.dueDate"
        @edit="openModal(col,task)"
        @delete="deleteTask(task)"
        @move="moveTask(task,
          col === 'todo' ? 'doing' :
          col === 'doing' ? 'done' : 'todo'
        )"
      />

      <button class="add" @click="openModal(col)">+ Ajouter une tâche</button>
    </div>
  </div>

  <TaskModal :show="showModal" :task="editingTask" @close="closeModal" @save="saveTask"/>
</div>
</template>

<style scoped>
/* Navbar fixée */
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

/* Page */
.project-page {
  min-height: 100vh;
  padding: 120px 40px 40px; /* top pour navbar fixe */
  background: linear-gradient(135deg,#1f0533,#3b0761);
  font-family: 'Poppins', sans-serif;
  color: white;
}

/* Statistiques */
.stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.stat-card {
  background: rgba(139,92,246,0.15);
  border-radius: 24px;
  padding: 28px 36px;
  text-align: center;
  backdrop-filter: blur(16px);
  box-shadow: 0 15px 40px rgba(156,39,176,0.4);
  transition: all 0.3s ease;
  min-width: 150px;
}
.stat-card:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 20px 50px rgba(156,39,176,0.55);
}
.stat-title {
  font-size: 14px;
  font-weight: 600;
  color: #e0c6f5;
  margin-bottom: 10px;
  text-transform: uppercase;
}
.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
}

/* Titres projet */
.project-title {
  font-size: 44px; font-weight: 700;
  text-align: center; margin-bottom: 10px;
  background: linear-gradient(90deg,#8b5cf6,#ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.project-desc {
  text-align: center;
  color: #d1b3e0;
  margin-bottom: 50px;
  font-size: 16px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Kanban Board */
.board {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 28px;
  max-width: 1400px;
  margin: auto;
}

.column {
  background: rgba(139,92,246,0.08);
  border-radius: 28px;
  padding: 28px;
  border: 1px solid rgba(139,92,246,0.3);
  backdrop-filter: blur(18px);
  box-shadow: 0 25px 70px rgba(123,31,162,0.25);
  transition: all 0.3s ease;
}
.column:hover {
  transform: translateY(-3px);
}

/* Col Header */
.col-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.col-header h2 {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.col-header .count {
  background: rgba(255,255,255,0.15);
  padding: 6px 14px;
  border-radius: 14px;
  font-weight: 700;
}

/* Bouton Ajouter */
.add {
  width: 100%;
  padding: 14px;
  border-radius: 20px;
  border: none;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  background: linear-gradient(90deg,#ec4899,#8b5cf6);
  color: white;
  margin-top: 14px;
  transition: all 0.25s ease;
}
.add:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(236,72,153,0.6);
}

/* Responsive */
@media (max-width: 1024px) {
  .board {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 640px) {
  .board {
    grid-template-columns: 1fr;
  }
}
</style>
