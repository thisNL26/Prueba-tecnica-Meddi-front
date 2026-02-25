<script setup lang="ts">
const {
  tasksAlta,
  tasksMedia,
  tasksBaja,
  tasksCompleted,
  isLoading,
  fetchTasks,
  error,
} = useTasks();

onMounted(() => {
  fetchTasks();
});

watch(tasksAlta, (nuevasTareas) => {
  console.log("¡Llegaron tareas altas!", nuevasTareas);
});

watch(tasksMedia, (nuevasTareas) => {
  console.log("¡Llegaron tareas Medias!", nuevasTareas);
});

watch(tasksBaja, (nuevasTareas) => {
  console.log("¡Llegaron tareas Bajas!", nuevasTareas);
});

watch(tasksCompleted, (nuevasTareas) => {
  console.log("¡Llegaron tareas completadas!", nuevasTareas);
});


</script>

<template>
  <!-- Como iniciativa quise añadir etiquetas semanticas para una mejor UX mas accesible :D -->
  <GPageContainer>
    <header>
      <h1 class="text-3xl font-bold tracking-tight">Administrador de tareas</h1>
      <p class="text-muted-foreground">
        Manejo de las tareas de tu organización.
      </p>
    </header>

    <main>
      <section class="barra-de-busqueda">
        <input type="text" placeholder="Buscar tarea por titulo..." />
        <button>📄</button>
      </section>
      <section class="taskApp">
        <div class="tasklist-container">
          <h2 class="text-2xl font-bold mb-4 mt-4">Tareas</h2>
          <div class="all-task-list overflow-y-auto max-h-[70vh] pr-2">
            <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 opacity-50" >
              <div class="animate-spin text-2xl mb-2">⚙️</div>
              <p>Cargando tareas...</p>
            </div>

            <div v-else-if="error" class="flex flex-col items-center justify-center py-10 text-red-400">
              <div class="text-3xl mb-2">⚠️</div>
              <p class="font-bold mb-1">¡Ups! Algo salió mal</p>
              <p class="text-sm opacity-80 mb-4">{{ error }}</p>
              <button @click="fetchTasks" class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm transition-colors border border-white/5">
                Intentar de nuevo ↻
              </button>
            </div>

            <div v-else class="flex flex-col gap-4">
              <TaskGroup title="Alta" :tasks="tasksAlta" />
              <TaskGroup title="Media" :tasks="tasksMedia" />
              <TaskGroup title="Baja" :tasks="tasksBaja" />
              <TaskGroup title="Completadas" :tasks="tasksCompleted" />
            </div>


          </div>
          <button>Añadir tarea</button>
        </div>
        <div class="metrics-task">
          <h2>Metricas</h2>
        </div>
      </section>
    </main>
    <footer></footer>
  </GPageContainer>
</template>
