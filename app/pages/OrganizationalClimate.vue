<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'

const data = [
  { category: 'Claridad', score: 8.5 },
  { category: 'Reto', score: 7.2 },
  { category: 'Autonomía', score: 9.0 },
  { category: 'Recompensa', score: 6.8 },
  { category: 'Cohesión', score: 8.8 },
]
</script>

<template>
  <GPageContainer>
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold tracking-tight">Clima Organizacional</h1>
        <p class="text-muted-foreground">Percepción compartida sobre el ambiente de trabajo.</p>
      </div>

      <div class="grid gap-4 md:grid-cols-4">
        <GCard title="Satisfacción General" class="md:col-span-2">
          <div class="text-5xl font-bold text-primary mt-2">82/100</div>
          <p class="text-muted-foreground mt-2">Considerado como un clima "Muy Saludable"</p>
        </GCard>
         <GCard title="Sentido de Pertenencia">
          <div class="text-4xl font-bold">88%</div>
          <p class="text-muted-foreground mt-2">Alta retención</p>
        </GCard>
         <GCard title="Innovación">
          <div class="text-4xl font-bold">76%</div>
          <p class="text-muted-foreground mt-2">Espacio de mejora</p>
        </GCard>
      </div>

      <GCard title="Dimensiones del Clima">
        <div class="h-[350px] w-full mt-4">
           <BarChart :data="data" index="category" :categories="['score']" :colors="['var(--chart-2)']" />
        </div>
      </GCard>
    </div>
  </GPageContainer>
</template>
