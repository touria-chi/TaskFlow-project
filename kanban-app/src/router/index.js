// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

// Import des vues
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import DashboardView from '../views/DashboardView.vue';
import ProjectDetails from '../views/ProjectDetails.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/project/:id',
    name: 'project-details',
    component: ProjectDetails,
    meta: { requiresAuth: true }
  },
  // Page 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation Guard
router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   const user = authStore.user;

//   if (to.meta.requiresAuth && !user) {
//     next({ name: 'auth' }); // redirige vers la page login
//   } else if ((to.name === 'auth') && user) {
//     next({ name: 'dashboard' }); // si déjà connecté, pas besoin de login
//   } else {
    next(); // autorise la navigation
//   }
});

export default router;
