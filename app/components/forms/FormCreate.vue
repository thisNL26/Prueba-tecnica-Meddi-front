<script setup lang="ts">
import { ref } from 'vue';
import { useTasks } from '~/composables/useTask';
import type { Task } from '~/types/task';

const emit = defineEmits(['close'] as const);

const { addTask } = useTasks();

const title = ref('');
const description = ref('');
const priority = ref<'Alta' | 'Media' | 'Baja'>('Alta');
const dateFinish = ref(new Date().toISOString().split('T')[0])

const handleSubmit = async () => {
  const newTask: Partial<Task> = {
    title: title.value,
    description: description.value,
    priority: priority.value,
    dateCreated: new Date().toISOString().split('T')[0],
    dateFinish: dateFinish.value,
    done: false
  };

  const success = await addTask(newTask);
  if (success) emit('close');
};
</script>

<template>
  <h3 class="text-2xl font-bold mb-10">Añadir tarea</h3>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <label for="create-title-task">Titulo</label>
    <input
    id="create-title-task"
    v-model="title"
    type="text"
    placeholder="Título de la tarea"
    required
    class="input"
    />
    <label for="create-description-task">Descripcion</label>
    <textarea
    id="create-description-task"
    v-model="description"
    placeholder="Descripción (opcional)"
    class="input"
    />

    <label for="create-priority-task">Prioridad</label>
    <select id="create-priority-task" v-model="priority" class="input">
      <option class="text-black" value="Alta">Alta</option>
      <option class="text-black" value="Media">Media</option>
      <option class="text-black" value="Baja">Baja</option>
    </select>
    
    <label for="create-date-task">Fecha limite</label>
        <input
        id="create-date-task"
      v-model="dateFinish"
      type="date"
      required
      class="input"
    />

    <div class="flex justify-end gap-2">
<div class="flex justify-end gap-3 mt-6">
  <button 
    type="button" 
    @click="$emit('close')" 
    class="px-4 py-2 text-sm font-semibold text-white/70 bg-black border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all active:scale-95">
    Cancelar
  </button>

  <button 
    type="submit" 
    class="px-4 py-2 text-sm font-bold text-white border-none rounded-lg bg-[#1a91da] hover:bg-[#08588a] transition-all active:scale-95">
    Crear Tarea
  </button>
</div>
    </div>
  </form>
</template>

<style scoped>
input,
textarea,
select {
  border: rgb(114, 114, 114) 1px solid;
}
</style>
