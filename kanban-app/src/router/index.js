import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { watch } from 'vue';

// Import des vues
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import DashboardView from '../views/DashboardView.vue';
import ProjectDetails from '../views/ProjectDetails.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/auth', name: 'auth', component: AuthView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/project/:id', name: 'project-details', component: ProjectDetails, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Si on attend encore Firebase
  if (authStore.loading) {
    const stop = watch(
      () => authStore.loading,
      (loading) => {
        if (!loading) {
          stop(); // stop le watcher
          checkAuth();
        }
      }
    );
  } else {
    checkAuth();
  }

  function checkAuth() {
    const user = authStore.user;
    if (to.meta.requiresAuth && !user) {
      next({ name: 'auth' });
    } else if (to.name === 'auth' && user) {
      next({ name: 'dashboard' });
    } else {
      next();
    }
  }
});

export default router;