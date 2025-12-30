<template>
  <AppNavbar />
  <div class="dashboard-container">
    
    <!-- Header Section -->
    <div class="dashboard-header">
      <div>
        <h1 class="dashboard-title">Mes Projets</h1>
        <p class="dashboard-subtitle">Gérez vos projets avec style et efficacité</p>
      </div>
      <button @click="openCreateModal" class="btn-new-project">
        <span class="icon-plus">+</span>
        Nouveau Projet
      </button>
    </div>

    <!-- Statistics Cards -->
    <div v-if="!isLoading" class="stats-grid">
      <div class="stat-card stat-card-blue">
        <div class="stat-content">
          <div>
            <p class="stat-label">Total Projets</p>
            <p class="stat-value">{{ projects.length }}</p>
          </div>
          <div class="stat-icon stat-icon-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="stat-card stat-card-purple">
        <div class="stat-content">
          <div>
            <p class="stat-label">Tâches en cours</p>
            <p class="stat-value">{{ tasksInProgress }}</p>
          </div>
          <div class="stat-icon stat-icon-purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="stat-card stat-card-pink">
        <div class="stat-content">
          <div>
            <p class="stat-label">Tâches terminées</p>
            <p class="stat-value">{{ tasksCompleted }}</p>
          </div>
          <div class="stat-icon stat-icon-pink">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Projects Grid -->
    <LoadingSpinner v-if="isLoading" :message="loadingMessage" />
    
    <div v-else class="projects-grid">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="project-card"
        :style="{ borderTopColor: project.color || '#8b5cf6' }"
        @click="goToProject(project.id)"
      >
        <div class="project-header">
          <div class="project-icon" :style="{ color: project.color || '#8b5cf6' }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div class="project-actions">
            <button @click.stop="openEditModal(project)" class="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button @click.stop="deleteProject(project.id)" class="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>

        <h3 class="project-name">{{ project.name }}</h3>
        <p class="project-description">{{ project.description }}</p>

        <div class="project-progress">
          <div class="progress-header">
            <span class="progress-label">Progression</span>
            <span class="progress-percentage">{{ calculateProgress(project) }}%</span>
          </div>
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ 
                width: calculateProgress(project) + '%',
                backgroundColor: project.color || '#8b5cf6'
              }"
            ></div>
          </div>
        </div>

        <div class="project-stats">
          <span class="project-stat">
            <span class="stat-dot stat-dot-yellow"></span>
            {{ project.tasksTodo || 0 }} tâches
          </span>
          <span class="project-stat">
            <span class="stat-dot stat-dot-green"></span>
            {{ project.tasksDone || 0 }} terminées
          </span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!isLoading && projects.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <h3 class="empty-title">Aucun projet pour le moment</h3>
      <p class="empty-text">Créez votre premier projet pour commencer à organiser vos tâches</p>
      <button @click="openCreateModal" class="btn-create-first">
        Créer mon premier projet
      </button>
    </div>

    <!-- Project Modal Component -->
    <ProjectModal
      :show="showProjectModal"
      :project="editingProject"
      @close="closeModal"
      @save="handleSave"
    />

  </div>
</template>

<script setup>
import AppNavbar from '../components/AppNavbar.vue'
import ProjectModal from '../components/ProjectModal.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '../stores/projectStore'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const projectStore = useProjectStore()
const authStore = useAuthStore()

const showProjectModal = ref(false)
const editingProject = ref(null)
const isLoading = ref(true)
const loadingMessage = ref('Chargement de vos projets...')

const projects = computed(() => projectStore.projects)
const tasksInProgress = computed(() => projectStore.getTotalTasksByStatus('doing'))
const tasksCompleted = computed(() => projectStore.getTotalTasksByStatus('done'))

onMounted(async () => {
  isLoading.value = true
  loadingMessage.value = 'Vérification de l\'authentification...'
  
  // Vérifier si l'utilisateur est authentifié
  if (!authStore.user) {
    console.error('Utilisateur non authentifié')
    router.push('/login')
    return
  }
  
  try {
    loadingMessage.value = 'Chargement de vos projets...'
    await projectStore.getProjects(authStore.user.uid)
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error)
  } finally {
    isLoading.value = false
  }
})

const calculateProgress = (project) => {
  const projectTasks = projectStore.tasks[project.id] || []
  const total = projectTasks.length
  const done = projectTasks.filter(t => t.status === 'done').length

  return total === 0 ? 0 : Math.round((done / total) * 100)
}

const goToProject = (projectId) => {
  router.push(`/project/${projectId}`)
}

const openCreateModal = () => {
  editingProject.value = null
  showProjectModal.value = true
}

const openEditModal = (project) => {
  editingProject.value = project
  showProjectModal.value = true
}

const handleSave = async (projectData) => {
  if (!authStore.user) {
    console.error('Utilisateur non authentifié')
    return
  }
  
  try {
    if (editingProject.value) {
      // Mise à jour d'un projet existant
      await projectStore.updateProject(editingProject.value.id, projectData)
    } else {
      // Création d'un nouveau projet
      await projectStore.addProject({
        ...projectData,
        ownerId: authStore.user.uid
      })
    }
    closeModal()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du projet:', error)
  }
}

const deleteProject = async (projectId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
    await projectStore.deleteProject(projectId)
  }
}

const closeModal = () => {
  showProjectModal.value = false
  editingProject.value = null
}
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 100%);
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #60efff 0%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.dashboard-subtitle {
  color: #a78bfa;
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
}

.btn-new-project {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
}

.btn-new-project:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
}

.icon-plus {
  font-size: 1.25rem;
  font-weight: 700;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border-top: 3px solid;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.08);
}

.stat-card-blue {
  border-top-color: #3b82f6;
}

.stat-card-purple {
  border-top-color: #8b5cf6;
}

.stat-card-pink {
  border-top-color: #ec4899;
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  color: #a78bfa;
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
}

.stat-value {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-blue {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.stat-icon-purple {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
}

.stat-icon-pink {
  background: rgba(236, 72, 153, 0.2);
  color: #ec4899;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border-top: 4px solid;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.2);
}

.project-name {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.project-description {
  color: #a78bfa;
  font-size: 0.875rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.project-progress {
  margin-bottom: 1rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.progress-label {
  color: #a78bfa;
  font-size: 0.875rem;
}

.progress-percentage {
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.project-stats {
  display: flex;
  gap: 1rem;
}

.project-stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a78bfa;
  font-size: 0.875rem;
}

.stat-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.stat-dot-yellow {
  background-color: #fbbf24;
}

.stat-dot-green {
  background-color: #10b981;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  color: #8b5cf6;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-title {
  color: white;
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.empty-text {
  color: #a78bfa;
  margin: 0 0 2rem 0;
}

.btn-create-first {
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-create-first:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .dashboard-title {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>