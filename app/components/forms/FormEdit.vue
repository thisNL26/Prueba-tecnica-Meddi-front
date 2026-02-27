<script setup lang="ts">
import { ref, watch } from "vue";
import { useTasks } from "~/composables/useTask";
import type { Task } from "~/types/task";

const props = defineProps<{
  payload: Task | null;
}>();
const emit = defineEmits(["close"] as const);

const { updateTask } = useTasks();

const title = ref("");
const description = ref("");
const priority = ref<"Alta" | "Media" | "Baja">("Alta");
const dateFinish = ref("");

watch(
  () => props.payload,
  (task) => {
    if (task) {
      title.value = task.title;
      description.value = task.description || "";
      priority.value = task.priority;
      dateFinish.value = task.dateFinish || "";
    }
  },
  { immediate: true },
);

const handleSubmit = async () => {
  if (!props.payload) return;

  const updatedTask: Task = {
    ...props.payload,
    title: title.value,
    description: description.value,
    priority: priority.value,
    dateFinish: dateFinish.value
  };

  await updateTask(updatedTask);
  emit("close");
};
</script>

<template>
  <h3 class="text-3xl font-bold mb-10">Editar tarea</h3>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <label for="edit-title-task">Título</label>
    <input
      id="edit-title-task"
      v-model="title"
      type="text"
      required
      class="input"
    />

    <label for="edit-description-task">Descripcion</label>
    <textarea id="edit-description-task" v-model="description" class="input" />

    <label for="edit-priority-task text-black">Prioridad</label>
    <select id="edit-priority-task" v-model="priority" class="input">
      <option value="Alta">Alta</option>
      <option value="Media">Media</option>
      <option value="Baja">Baja</option>
    </select>

    <label for="edit-date-task">Fecha Límite</label>
    <input
      id="edit-date-task"
      v-model="dateFinish"
      type="date"
      required
      class="input"
    />
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
        Guardar Tarea
      </button>
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
