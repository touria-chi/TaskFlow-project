<script setup>
import { ref, watch } from 'vue'
const props = defineProps({ show:Boolean, task:Object })
const emits = defineEmits(['close','save'])

const title = ref('')
const desc = ref('')
const dueDate = ref('')

watch(() => props.task, (t)=>{
  if(t){
    title.value = t.title
    desc.value = t.desc
    dueDate.value = t.dueDate
  } else {
    title.value = ''
    desc.value = ''
    dueDate.value = ''
  }
})

const save = () => {
  emits('save', {title:title.value,desc:desc.value,dueDate:dueDate.value})
}
</script>

<template>
<div v-if="show" class="modal-overlay">
  <div class="modal">
    <h2>{{ task?'Modifier la tâche':'Ajouter une tâche' }}</h2>
    <input v-model="title" placeholder="Titre de la tâche"/>
    <textarea v-model="desc" placeholder="Description"></textarea>
    <input type="date" v-model="dueDate"/>
    <div class="buttons">
      <button @click="save">{{ task?'Modifier':'Ajouter' }}</button>
      <button class="cancel" @click="$emit('close')">Annuler</button>
    </div>
  </div>
</div>
</template>

<style scoped>
.modal-overlay {
  position: fixed; inset:0;
  background: rgba(0,0,0,0.65);
  display:flex; justify-content:center; align-items:center;
  z-index:1000;
}
.modal {
  background: linear-gradient(145deg,#4a0072,#7b1fa2);
  padding:28px; border-radius:24px;
  width:100%; max-width:400px; box-shadow:0 25px 60px rgba(123,31,162,0.55);
  color:white; display:flex; flex-direction:column; gap:12px;
}
.modal h2 { font-size:20px; margin-bottom:12px; background: linear-gradient(90deg,#ff80ab,#ea80fc); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.modal input, .modal textarea {
  width:100%; padding:12px; border-radius:12px; border:none;
  outline:none; font-size:14px; background: rgba(255,255,255,0.12); color:white;
}
.modal textarea { resize:none; min-height:60px; }
.buttons { display:flex; justify-content:flex-end; gap:12px; margin-top:8px; }
.buttons button {
  padding:10px 18px; border-radius:12px; border:none; font-weight:700; cursor:pointer;
  background: linear-gradient(90deg,#ea80fc,#ff80ab); color:white; transition: all 0.2s ease;
}
.buttons button.cancel { background:rgba(255,255,255,0.15); color:#e1bee7; }
.buttons button:hover { transform: translateY(-2px); box-shadow:0 12px 30px rgba(234,128,252,0.5); }
</style>
