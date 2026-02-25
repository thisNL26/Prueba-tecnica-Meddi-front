<script setup lang="ts">

import type { Task } from '~/types/task'


const props = defineProps<{
  title: string;
  tasks: Task[];
}>();

</script>

<template>
  <details open class="group p-2">
    <summary class="flex items-center cursor-pointer list-none select-none">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <span
        class="ml-2 text-xs transition-transform group-open:rotate-180 opacity-50"
      >
        ▼
      </span>
      <span class="ml-auto text-m">{{ tasks.length }} tareas</span>
    </summary>

    <ul class="flex flex-col gap-2 mt-3">
      <li v-for="tarea in tasks" :key="tarea.idTask" class="task-item">
        <CardTask :task="tarea" />
      </li>

      <p v-if="tasks.length === 0" class="text-xs text-center opacity-30 py-4">
        No hay tareas pendientes aquí.
      </p>
    </ul>
  </details>
</template>
