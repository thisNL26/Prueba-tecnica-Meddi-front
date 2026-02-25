<script setup lang="ts">
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'

/*
  Llamada a la API 
    Asi se obtienen las tareas
*/

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

/*
  Logica de la barra de busqueda 
    La barrs necesita guardar una variable 
    Ademas el boton de filtros despliega su contenido segun su estado
*/

// Barra de busqueda

const searchQuery = ref('');
watchDebounced( searchQuery, (valorNuevo) => {
    console.log("🔍 Buscando en API:", valorNuevo);
  },
  { debounce: 500, maxWait: 1000 }
)


// Boton: Filtros

const showFilters = ref(false);

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}







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
     
      <section class="barra-de-busqueda m-10">
        <GSearchBar 
        v-model="searchQuery" 
        @click:filter="toggleFilters"
      />
      
        <div v-if="showFilters" class="mt-2 p-4 border rounded-md bg-white/5">
          <p class="text-sm text-gray-400">Opciones de filtrado pendientes...</p>
        </div>
      
      </section>

      <section class="taskApp">
        <GCard title="Tareas" class="[&_h3]:text-2xl [&_h3]:font-bold :[&_h3]mb-4 [&_h3]:mt-4">

          <!-- Aqui van el contenedor de todas las tareas -->
          <div class="all-task-list overflow-y-auto max-h-[60vh] pr-2">
            <div
              v-if="isLoading"
              class="flex flex-col items-center justify-center py-20 opacity-50"
            >
              <div class="animate-spin text-2xl mb-2">⚙️</div>
              <p>Cargando tareas...</p>
            </div>

            <div
              v-else-if="error"
              class="flex flex-col items-center justify-center py-10 text-red-400"
            >
              <div class="text-3xl mb-2">⚠️</div>
              <p class="font-bold mb-1">¡Ups! Algo salió mal</p>
              <p class="text-sm opacity-80 mb-4">{{ error }}</p>
              <button
                @click="fetchTasks"
                class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm transition-colors border border-white/5"
              >
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
        </GCard>

        <div class="metrics-task">
          <h2>Metricas</h2>
        </div>
      </section>
    </main>
    <footer></footer>
  </GPageContainer>
</template>
