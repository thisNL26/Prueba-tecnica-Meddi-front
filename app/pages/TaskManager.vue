<script setup lang="ts">
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import type { Task } from '~/types/task';

//Llamada a la API

const {
  //Filtrados
  tasksAlta,
  tasksMedia,
  tasksBaja,
  tasksCompleted,
  
  //Estados
  isLoading,
  error,
  
  //Acciones
  fetchTasks,
  addTask 
} = useTasks();

onMounted(() => {
  fetchTasks();
});



//Probar crear una tareas


const testCrearTarea = async () => {
  
  const nuevaTareaFake: Partial<Task> = {
    title: "Tarea de prueba comopletadas",
    description: "Esta tarea fue creada desde el botón",
    priority: "Baja", 
    dateFinish: "25/07/2026",
    done: false
  };
  
  const exito = await addTask(nuevaTareaFake);
  
  if (exito) {
    console.log("La tarea debería estar en la lista.");
    alert("Tarea creada con éxito (Revisa la consola y la lista)");
  } else {
    console.error("Algo falló en el camino.");
  }
};

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

            <!-- Boton crear tarea de prueba -->
          <button 
              @click="testCrearTarea"
              class="bg-blue-500"
            >Crear Tarea de Pueba
          </button>          

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

            <!-- Opcional, para pulir el codigo se puede crear un componente "LoadingTask" y "AlertError", por lo pronto se maneja rapodp con un div-->
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
