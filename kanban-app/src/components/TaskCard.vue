<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  title: String,
  desc: String,
  dueDate: String
})
const emits = defineEmits(['edit','delete','move'])
</script>

<template>
<div class="task-card">
  <div class="task-header">
    <h3>{{ title }}</h3>
    <div class="icons">
      <button @click="$emit('move')">➡️</button>
      <button @click="$emit('edit')">✏️</button>
      <button @click="$emit('delete')">🗑️</button>
    </div>
  </div>
  <p>{{ desc }}</p>
  <span class="due">📅 {{ dueDate }}</span>
</div>
</template>

<style scoped>
.task-card {
  background: linear-gradient(135deg, rgba(123,31,162,0.15), rgba(156,39,176,0.1));
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 14px;
  box-shadow: 0 10px 25px rgba(123,31,162,0.25);
  transition: transform 0.25s ease;
}
.task-card:hover { transform: translateY(-2px) scale(1.02); }
.task-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.task-header h3 { font-size:16px; font-weight:700; color:#ea80fc; }
.icons button {
  background:none; border:none; cursor:pointer;
  margin-left:6px; font-size:16px; color:#ff80ab;
  transition: transform 0.2s ease;
}
.icons button:hover { transform: scale(1.2); }
.task-card p { font-size:14px; color:#e1bee7; margin-bottom:6px; }
.due { font-size:12px; color:#ffccbc; font-weight:600; }
</style>
