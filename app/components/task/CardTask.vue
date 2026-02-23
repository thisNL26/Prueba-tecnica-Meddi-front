<script setup lang="ts">
const { isChecked, setChecked } = useTaskChecked();

import type { Task } from "~/types/task";
import type { Priority } from "~/types/task";

const props = defineProps<{
  task: Task;
}>();

function getColor(state: boolean, priority: Priority) {
  if (props.task.done) state = !state;

  if (state) return "bg-green-500/10 border-green-500/50";
  const priorityClasses: Record<string, string> = {
    Alta: "bg-red-500/10 border-red-500/50",
    Media: "bg-yellow-500/10 border-yellow-500/50",
    Baja: "bg-blue-500/10 border-blue-500/50",
  };

  return priorityClasses[priority] || "bg-slate-500/10 border-slate-500/50";
}
</script>

<template>
  <GCard
    :title="task.title"
    :class="[getColor(isChecked, task.priority), 'transition-all','[&_h3]:text-base [&_h3]:font-extrabold [&_h3]:uppercase [&_h3]:tracking-widest']"
  >
  <div class="flex justify-between items-center">
      <span class="text-sm font-medium " done="false">{{ task.description }}</span>
      <input
        type="checkbox"
        :checked="task.done"
        @change="setChecked"
        class="cursor-pointer h-7 w-7"
      />
    </div>




    <template #footer>
      <div class="mt-2 flex w-full items-center justify-between border-t border-white/5 pt-3">
        <div class="flex items-center gap-3 text-[10px] font-bold uppercase tracking-tight opacity-60">
          <div class="flex items-center gap-1">
            <span class="opacity-70">📅</span> {{ task.dateCreated }}
          </div>
          <div class="flex items-center gap-1">
            <span class="opacity-70">🏁</span> {{ task.dateFinish }}
          </div>
        </div>

        <div class="flex items-center gap-1">
          <button 
            class="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-white/10 active:scale-95"
            title="Editar tarea"
          >
            <span class="text-xs">✏️</span>
          </button>
          <button 
            class="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-red-500/20 active:scale-95"
            title="Eliminar tarea"
          >
            <span class="text-xs">🗑️</span>
          </button>
        </div>
      </div>
    </template>










  </GCard>
</template>