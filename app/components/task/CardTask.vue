<script setup lang="ts">
import type { Task, Priority } from "~/types/task";

const { updateTask } = useTasks();

const props = defineProps<{
  task: Task;
}>();



//Asignación de color
function getColor(done: boolean, priority: Priority) {
  if (done) {
    return "bg-green-500/10 border-green-500/50";
  }

  const priorityClasses: Record<Priority, string> = {
    Alta: "bg-red-500/10 border-red-500/50",
    Media: "bg-yellow-500/10 border-yellow-500/50",
    Baja: "bg-blue-500/10 border-blue-500/50",
  };

  return priorityClasses[priority];
}

// Actualización de tarjetas Check/NoCheck

const updateState = async () => {
  const updatedTask: Task = {
    ...props.task,
    done: !props.task.done
  };

  await updateTask(updatedTask);
};

// Eliminar tarea
const { state: popUpState, open: openPopUp, close: closePopUp } = usePopUp();


</script>

<template>
  <GCard
  :title="task.title"
  :class="[
    getColor(task.done, task.priority), 'transition-all', '[&_h3]:text-base [&_h3]:font-extrabold [&_h3]:uppercase [&_h3]:tracking-widest'
  ]"
>
  <div class="flex justify-between items-center gap-5">
      <span class="text-sm font-medium flex-1" done="false">{{ task.description }}</span>
      <input
        type="checkbox"
        :checked="task.done"
        @change="updateState"
        class="cursor-pointer h-7 w-7 active:scale-80 transition-all"
      />
  </div>




    <template #footer>

      <GPopUp :state="popUpState" :close="closePopUp" />
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
            @click="openPopUp('edit', task)"
            title="Editar tarea"
            >
            <span class="text-xs">✏️</span>
          </button>
          <button 
          class="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-red-500/20 active:scale-95"
          @click="openPopUp('delete', task)"
          title="Eliminar tarea"
          >
            <span class="text-xs">🗑️</span>
          </button>
        </div>
      </div>
    </template>

  </GCard>
</template>