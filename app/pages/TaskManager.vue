<script setup lang="ts"></script>

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
              <details open class="group">
                <summary class="flex items-center cursor-pointer list-none">
                  <h3 class="text-lg font-bold">Alta</h3>
                  <span class="ml-2 transition-transform group-open:rotate-180"
                    >v</span
                  >
                </summary>
                <ul class="flex flex-col gap-2 mt-2">
                  <li class="task-item">1</li>
                  <li class="task-item">2</li>
                  <li class="task-item">3</li>
                  <li class="task-item">4</li>
                </ul>
              </details>
              <details open class="group">
                <summary class="flex items-center cursor-pointer list-none">
                  <h3 class="text-lg font-bold">Media</h3>
                  <span class="ml-2 transition-transform group-open:rotate-180"
                    >v</span
                  >
                </summary>
                <ul class="flex flex-col gap-2 mt-2">
                  <li class="task-item">1</li>
                  <li class="task-item">2</li>
                  <li class="task-item">3</li>
                  <li class="task-item">4</li>
                </ul>
              </details>
              <details open class="group">
                <summary class="flex items-center cursor-pointer list-none">
                  <h3 class="text-lg font-bold">Baja</h3>
                  <span class="ml-2 transition-transform group-open:rotate-180"
                    >v</span
                  >
                </summary>
                <ul class="flex flex-col gap-2 mt-2">
                  <li class="task-item">1</li>
                  <li class="task-item">2</li>
                  <li class="task-item">3</li>
                  <li class="task-item">4</li>
                </ul>
              </details>
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
