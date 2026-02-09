<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'

const data = [
  { team: 'Ventas', safety: 7.5 },
  { team: 'Producto', safety: 9.2 },
  { team: 'Ingeniería', safety: 8.8 },
  { team: 'Marketing', safety: 8.0 },
  { team: 'RRHH', safety: 9.5 },
]
</script>

<template>
  <GPageContainer>
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold tracking-tight">Seguridad Psicológica</h1>
        <p class="text-muted-foreground">Confianza para tomar riesgos interpersonales.</p>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <GCard title="Confianza del Equipo">
          <div class="text-4xl font-bold text-blue-600">Alta</div>
          <p class="text-muted-foreground mt-2">Los equipos se sienten seguros al expresar opiniones.</p>
        </GCard>
        <GCard title="Toma de Riesgos">
          <div class="text-4xl font-bold">72%</div>
          <p class="text-muted-foreground mt-2">Dispuestos a proponer ideas disruptivas.</p>
        </GCard>
        <GCard title="Apertura al Error">
          <div class="text-4xl font-bold">8.1/10</div>
          <p class="text-muted-foreground mt-2">Los errores se ven como aprendizaje.</p>
        </GCard>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <GCard title="Seguridad por Departamento">
          <div class="h-[300px] w-full mt-4">
             <BarChart :data="data" index="team" :categories="['safety']" :colors="['var(--chart-3)']" />
          </div>
        </GCard>
        <div class="grid gap-4">
           <GCard title="Focus Area">
             <div class="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
               <h3 class="font-bold text-blue-700 dark:text-blue-300">Equipo de Ventas</h3>
               <p class="text-sm mt-2">Se detectó una disminución en la participación durante las reuniones mensuales. Se sugiere fomentar dinámicas de feedback anónimo.</p>
             </div>
           </GCard>
           <GCard title="Iniciativas Activas">
             <ul class="list-disc list-inside space-y-2 text-sm">
               <li>Programa "Fail Forward"</li>
               <li>Sesiones de AMA (Ask Me Anything) con líderes</li>
               <li>Retrospectivas sin culpa</li>
             </ul>
           </GCard>
        </div>
      </div>
    </div>
  </GPageContainer>
</template>
