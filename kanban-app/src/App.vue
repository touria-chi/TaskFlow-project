<template>
  <router-view></router-view>
</template>
<script setup>
import { watch } from 'vue'
import { useAuthStore } from './stores/authStore'
import { useProjectStore } from './stores/projectStore'

const authStore = useAuthStore()
const projectStore = useProjectStore()

watch(
  () => authStore.user,
  (user) => {
    if (user) {
      projectStore.getProjects(user.uid)
    }
  },
  { immediate: true }
)
</script>
