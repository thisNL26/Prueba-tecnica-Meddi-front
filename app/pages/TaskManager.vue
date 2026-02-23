<script setup lang="ts">
import type { Task } from '~/types/task'


const grupoTareasEjemploAlta = ref<Task[]>([
  {
    idTask: "1",
    title: "Hacer reporte",
    description: "Enviar antes de las 6pm",
    priority: "Alta",
    dateCreated: "23/02/26",
    dateFinish: "27/02/26",
    done: false,
  },
  {
    idTask: "3",
    title: "TAREA 2",
    description: "Enviar antes de las 4:30pm",
    priority: "Alta",
    dateCreated: "23/02/26",
    dateFinish: "27/02/26",
    done: false,
  }
])
const grupoTareasEjemploMedia = ref<Task[]>([
  {
    idTask: "1",
    title: "Hacer reporte",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit semper, non vehicula fermentum lacinia sociis sed imperdiet molestie nullam, vestibulum enim fringilla sollicitudin nibh lectus ultricies. Viverra vitae hendrerit consequat morbi turpis egestas tempus quis parturient id, in ultrices tempor maecenas dignissim cras feugiat nulla hac, felis laoreet suscipit mattis sagittis a ante fermentum venenatis. Scelerisque pellentesque lobortis nisl posuere justo sodales et rutrum pretium, sed blandit nam risus hac felis eleifend euismod ut, in enim orci cubilia facilisis etiam class pulvinar.",
    //Easter egg :D, Prueba de como reacciona el elemento con textos largos.

    priority: "Media",
    dateCreated: "23/02/26",
    dateFinish: "27/02/26",
    done: false,
  },
  {
    idTask: "3",
    title: "TAREA 2",
    description: "Enviar antes de las 4:30pm",
    priority: "Media",
    dateCreated: "23/02/26",
    dateFinish: "27/02/26",
    done: false,
  }
])
const grupoTareasEjemploBaja = ref<Task[]>([
  {
    idTask: "1",
    title: "Hacer reporte",
    description: "Enviar antes de las 6pm",
    priority: "Baja",
    dateCreated: "23/02/26",
    dateFinish: "27/02/26",
    done: false,
  },
  {
    idTask: "3",
    title: "TAREA 2",
    description: "Enviar antes de las 4:30pm",
    priority: "Baja",
    dateCreated: "23/02/26",
    dateFinish: "27/02/26",
    done: false,
  }
])

const grupoTareasEjemploTerminada = ref<Task[]>([
  {
    idTask: "1",
    title: "Hacer reporte",
    description: "Enviar antes de las 6pm",
    priority: "Alta",
    dateCreated: "23/02/26",
    dateFinish: "27/02/26",
    done: true,
  },
  {
    idTask: "3",
    title: "TAREA 2",
    description: "Enviar antes de las 4:30pm",
    priority: "Alta",
    dateCreated: "23/02/26",
    dateFinish: "27/02/26",
    done: true,
  }
])




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
        <button>⚙️</button>
      </section>
      <section class="taskApp">
        <div class="tasklist-container">
          <h2>Tareas</h2>
          <div class="all-task-list">
            <div class="all-task-list flex flex-col gap-4">
              <TaskGroup title="Alta" :tasks="grupoTareasEjemploAlta" />
              <TaskGroup title="Media" :tasks="grupoTareasEjemploMedia" />
              <TaskGroup title="Baja" :tasks="grupoTareasEjemploBaja" />
              <TaskGroup title="Completadas" :tasks="grupoTareasEjemploTerminada" />
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
