<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'

const data = [
  { type: 'Pares', score: 92 },
  { type: 'Líder', score: 84 },
  { type: 'Organización', score: 78 },
]
</script>

<template>
  <GPageContainer>
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold tracking-tight">Apoyo Social</h1>
        <p class="text-muted-foreground">Redes de soporte y colaboración interna.</p>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <GCard title="Índice de Colaboración">
          <div class="text-4xl font-bold">88/100</div>
          <p class="text-muted-foreground mt-2">Fuerte cohesión grupal</p>
        </GCard>
        <GCard title="Disponibilidad de Líderes">
          <div class="text-4xl font-bold">8.4</div>
          <p class="text-muted-foreground mt-2">Accesibilidad percibida</p>
        </GCard>
        <GCard title="Conflictos">
          <div class="text-4xl font-bold text-green-600">Bajo</div>
          <p class="text-muted-foreground mt-2">0 reportes graves este mes</p>
        </GCard>
      </div>

      <GCard title="Fuentes de Apoyo">
        <div class="h-[300px] w-full mt-4">
           <BarChart :data="data" index="type" :categories="['score']" :colors="['var(--chart-4)']" />
        </div>
      </GCard>
    </div>
  </GPageContainer>
</template>
