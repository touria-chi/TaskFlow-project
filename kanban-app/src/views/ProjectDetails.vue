<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../stores/projectStore'
import TaskCard from '@/components/TaskCard.vue'
import TaskModal from '@/components/TaskModal.vue'

const route = useRoute()
const projectId = route.params.id
const projectStore = useProjectStore()

// Modal state
const showModal = ref(false)
const editingTask = ref(null)
const editingColumn = ref(null)

// Charger les tâches Firestore
onMounted(() => {
  projectStore.getTasks(projectId)
})

// 🔥 Tâches par statut (depuis Firestore)
const tasks = computed(() => ({
  todo: (projectStore.tasks[projectId] || []).filter(t => t.status === 'todo'),
  doing: (projectStore.tasks[projectId] || []).filter(t => t.status === 'doing'),
  done: (projectStore.tasks[projectId] || []).filter(t => t.status === 'done')
}))

// 📊 Statistiques
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
    await projectStore.updateTask(
      projectId,
      editingTask.value.id,
      { title, desc, dueDate }
    )
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
  await projectStore.updateTask(projectId, task.id, {
    status: toStatus
  })
}
</script>


<template>
<div class="page">
  <!-- 🔥 Header Statistiques -->
  <div class="stats">
    <div class="stat-card">Total tâches: {{stats.total}}</div>
    <div class="stat-card">À faire: {{stats.todo}}</div>
    <div class="stat-card">En cours: {{stats.doing}}</div>
    <div class="stat-card">Terminé: {{stats.done}}</div>
  </div>

  <h1 class="project-title"> Task flow - KANBAN</h1>
  <p class="project-desc">Organisez vos tâches, suivez leur avancement et restez productif en un coup d’œil.</p>

  <!--  Kanban -->
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
.page {
  min-height:100vh;
  padding:60px;
  background: linear-gradient(135deg,#2e025c,#4a0072);
  font-family:'Poppins',sans-serif;
  color:white;
}

.project-title {
  font-size:36px; font-weight:700;
  text-align:center; margin-bottom:6px;
  background: linear-gradient(90deg,#ff80ab,#ea80fc);
  /* -webkit-background-clip:text; */
  -webkit-text-fill-color:transparent;
}

.project-desc {
  text-align:center; color:#e1bee7; margin-bottom:40px;
}

.stats {
  display:flex; justify-content:center; gap:20px; margin-bottom:40px;
}
.stat-card {
  background: linear-gradient(145deg,#7b1fa2,#9c27b0);
  padding:16px 26px; border-radius:20px;
  font-weight:700; color:white; box-shadow:0 15px 40px rgba(156,39,176,0.55);
  transition: all 0.3s ease;
}
.stat-card:hover { transform:translateY(-3px) scale(1.05); }

.board { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; max-width:1300px; margin:auto; }
.column {
  background: linear-gradient(160deg,rgba(156,39,176,0.1),rgba(123,31,162,0.07));
  border-radius:24px; padding:26px;
  border:1px solid rgba(156,39,176,0.3); backdrop-filter:blur(16px);
  box-shadow:0 25px 70px rgba(123,31,162,0.25);
}
.col-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.col-header h2 { font-size:18px; font-weight:700; }
.col-header .count {
  background: rgba(255,255,255,0.15); padding:4px 10px; border-radius:12px; font-weight:700;
}

.add {
  width:100%; padding:12px; border-radius:16px; border:none;
  font-weight:700; font-size:14px; cursor:pointer;
  background: linear-gradient(90deg,#ea80fc,#ff80ab); color:white; margin-top:12px;
  transition: all 0.25s ease;
}
.add:hover { transform:translateY(-2px); box-shadow:0 15px 35px rgba(234,128,252,0.6); }
</style>
