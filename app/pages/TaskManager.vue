<script setup lang="ts">
import { ref } from "vue";
import { watchDebounced } from "@vueuse/core";
import { useTasks } from "~/composables/useTask";
import { usePopUp } from "~/composables/usePopUp";

//Llamada a la API & Data

const { tasks, isLoading, error, fetchTasks } = useTasks();

const filters = useTaskFilters(tasks);

const {
  searchQuery,
  order,
  sortBy,
  tasksAlta,
  tasksMedia,
  tasksBaja,
  tasksCompleted,
  processedTasks,
  isGroupedView,
} = filters;

const { 
  priorityData, 
  statusData, 
  topCreatedDays 
} = useDataChartTask(tasks);


// Prueba de extraccion de datos para charts, se coloca un pequeño retraso para que la respuesta llegue
setTimeout(() => {
  console.log("Tareas por prioridad");
  console.log("Alta: ", priorityData.value.Alta);
  console.log("Media: ", priorityData.value.Media);
  console.log("Baja: ", priorityData.value.Baja);
  
  console.log("Tareas por status");
  console.log("Faltantes: ", statusData.value.pendientes);
  console.log("Completadas: ", statusData.value.completadas);
  
  console.log("////////////////////////EL CALCULO DE LA SEMANA ESTA INICIANDO EN DIA LUNES////////////////////////");
  console.log("Top 3 dias de la semana con mas tareas creadas");
  console.log(topCreatedDays.value);



}, 500);

onMounted(() => {
  fetchTasks();
});

//popUps

const { state: popUpState, open: openPopUp, close: closePopUp } = usePopUp();

// Barra de busqueda

watchDebounced(
  searchQuery,
  (valorNuevo) => {
    console.log("🔍 Buscando en API:", valorNuevo);
  },
  { debounce: 500, maxWait: 1000 },
);

//Filtros

const showFilters = ref(false);

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};
</script>

<template>
  <div class="task-manager-page">
    <!-- Como iniciativa quise añadir etiquetas semanticas para una mejor UX mas accesible :D -->
    <GPageContainer>
      <header>
        <h1 class="text-3xl font-bold tracking-tight">
          Administrador de tareas
        </h1>
        <p class="text-muted-foreground">
          Manejo de las tareas de tu organización.
        </p>
      </header>

      <main>
        <GPopUp :state="popUpState" :close="closePopUp" />

        <section class="barra-de-busqueda m-10">
          <GSearchBar v-model="searchQuery" @click:filter="toggleFilters" />

          <div v-if="showFilters" class="mt-2 p-4 border rounded-md bg-white/5">
            <h3 class="mb-10">Herramientas de busqueda</h3>
            <div
              class="allfilters flex flex-col md:flex-row items-end gap-4 mb-8 p-4 rounded-2xl border border-zinc-800"
            >
              <div class="pirorityFilter">
                <input
                  class="m-2"
                  type="checkbox"
                  id="group-by-priority"
                  v-model="isGroupedView"
                />
                <label for="group-by-priority">Agrupar</label>
              </div>

              <div class="order-by">
                <label for="select-order-by">Ordenar por:</label>
                <select
                  v-model="sortBy"
                  name="Ordenar por"
                  id="select-order-by"
                >
                  <option value="title">Título</option>
                  <option value="createdAt">Fecha de creación</option>
                  <option value="dateFinish">Fecha de finalización</option>
                </select>
              </div>

              <div class="order-direction">
                <label for="select-order-direction">Orden</label>
                <select
                  v-model="order"
                  name="Direccion"
                  id="select-order-direction"
                >
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section class="taskApp m-5 grid gap-4 md:grid-cols-[75%_25%]">
          <GCard
            title="Tareas"
            class="[&_h3]:text-2xl [&_h3]:font-bold :[&_h3]mb-4 [&_h3]:mt-4"
          >
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

              <div v-else class="flex flex-col gap-4 tareas">
                <div v-if="isGroupedView" class="vista-agrupada">
                  <TaskGroup title="Alta" :tasks="tasksAlta" />
                  <TaskGroup title="Media" :tasks="tasksMedia" />
                  <TaskGroup title="Baja" :tasks="tasksBaja" />
                  <TaskGroup title="Completadas" :tasks="tasksCompleted" />
                </div>
                <div v-else class="vista-suelta">
                  <TaskGroup title="Todas las tareas" :tasks="processedTasks" />
                </div>
              </div>
            </div>

            <button
              @click="openPopUp('create')"
              class="px-4 py-2 mt-10 text-sm font-bold text-white border-none rounded-lg bg-[#1a91da] hover:bg-[#08588a] transition-all active:scale-95"
            >
              Añadir tarea
            </button>
          </GCard>

          <div class="metrics-task">
            <h2>Metricas</h2>
          </div>
        </section>
      </main>
      <footer></footer>
    </GPageContainer>
  </div>
</template>
