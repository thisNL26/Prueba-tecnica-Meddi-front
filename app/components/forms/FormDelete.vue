<script setup lang="ts">
import { useTasks } from '~/composables/useTask';
import type { Task } from '~/types/task';

const props = defineProps<{
  payload: Task | null
}>();
const emit = defineEmits(['close'] as const);

const { deleteTask } = useTasks();

const handleDelete = async () => {
  if (!props.payload) return;
  await deleteTask(props.payload.idTask);
  emit('close');
};
</script>

<template>
  <h3 class="text-red-600 text-2xl font-bold text-center mb-10" >ELIMINAR TAREA</h3>
  <div class="flex flex-col gap-4 text-center">
    <p>¿Seguro que quieres eliminar "{{ payload?.title }}"?</p>
    <div class="flex justify-center gap-2">
      <button 
        @click="$emit('close')" 
    class="px-4 py-2 text-sm font-semibold text-white/70 bg-black border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all active:scale-95">        Cancelar
      </button>
      <button 
        @click="handleDelete"
        class="px-4 py-2 text-sm font-bold text-white bg-red-600 border border-red-500 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all active:scale-95">
        Eliminar
      </button>
    </div>
  </div>
</template>


