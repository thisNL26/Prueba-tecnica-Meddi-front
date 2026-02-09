<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'

const data = [
  { name: 'Q1', value: 45 },
  { name: 'Q2', value: 52 },
  { name: 'Q3', value: 48 },
  { name: 'Q4', value: 60 },
]
</script>

<template>
  <GPageContainer>
    <div class="flex flex-col gap-6">
       <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold tracking-tight">eNPS (Employee NPS)</h1>
        <p class="text-muted-foreground">Probabilidad de recomendación de tus colaboradores.</p>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <GCard title="eNPS Score">
          <div class="flex items-end gap-2">
            <div class="text-4xl font-bold">+52</div>
            <span class="text-sm text-green-500 mb-1">Excelencia</span>
          </div>
          <p class="text-muted-foreground mt-2">Promedio de la industria: +30</p>
        </GCard>
        <GCard title="Promotores">
          <div class="flex items-end gap-2">
            <div class="text-4xl font-bold text-green-600">65%</div>
          </div>
          <p class="text-muted-foreground mt-2">Calificación 9-10</p>
        </GCard>
        <GCard title="Detractores">
          <div class="flex items-end gap-2">
            <div class="text-4xl font-bold text-red-500">12%</div>
            <span class="text-sm text-red-400 mb-1">▼ 2%</span>
          </div>
          <p class="text-muted-foreground mt-2">Calificación 0-6</p>
        </GCard>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <GCard title="Histórico eNPS">
          <div class="h-[300px] w-full mt-4">
             <BarChart :data="data" index="name" :categories="['value']" :colors="['var(--chart-1)']" />
          </div>
        </GCard>
        <GCard title="Feedback Reciente">
           <div class="space-y-4 mt-2">
             <div class="border-l-4 border-green-500 pl-4 py-1">
               <p class="text-sm font-medium">"Me encanta la cultura de flexibilidad que tenemos."</p>
               <p class="text-xs text-muted-foreground mt-1">Hace 2 días • Promotor</p>
             </div>
             <div class="border-l-4 border-yellow-500 pl-4 py-1">
               <p class="text-sm font-medium">"Buenos beneficios, pero procesos lentos."</p>
               <p class="text-xs text-muted-foreground mt-1">Hace 5 días • Neutro</p>
             </div>
              <div class="border-l-4 border-red-500 pl-4 py-1">
               <p class="text-sm font-medium">"Necesitamos mejores herramientas de trabajo."</p>
               <p class="text-xs text-muted-foreground mt-1">Hace 1 semana • Detractor</p>
             </div>
           </div>
        </GCard>
      </div>
    </div>
  </GPageContainer>
</template>
