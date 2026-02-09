<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'

const data = [
  { name: 'Sem 1', nps: 82 },
  { name: 'Sem 2', nps: 85 },
  { name: 'Sem 3', nps: 88 },
  { name: 'Sem 4', nps: 84 },
]
</script>

<template>
  <GPageContainer>
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold tracking-tight">Bienestar Emocional</h1>
        <p class="text-muted-foreground">Monitoreo de la salud emocional de tu organización.</p>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <GCard title="Índice de Bienestar">
          <div class="flex items-end gap-2">
            <div class="text-4xl font-bold">8.5</div>
            <span class="text-sm text-green-500 mb-1">▲ 0.4</span>
          </div>
          <p class="text-muted-foreground mt-2">Promedio general ponderado</p>
        </GCard>
        <GCard title="Participación">
          <div class="flex items-end gap-2">
            <div class="text-4xl font-bold">92%</div>
            <span class="text-sm text-muted-foreground mb-1">115/125</span>
          </div>
          <p class="text-muted-foreground mt-2">Empleados activos esta semana</p>
        </GCard>
        <GCard title="Alertas de Riesgo">
          <div class="flex items-end gap-2">
            <div class="text-4xl font-bold text-orange-500">3</div>
            <span class="text-sm text-muted-foreground mb-1">Casos</span>
          </div>
          <p class="text-muted-foreground mt-2">Requieren atención inmediata</p>
        </GCard>
      </div>

      <div class="grid gap-4 md:grid-cols-3 h-full">
        <GCard title="Tendencia Mensual" class="md:col-span-2">
          <div class="h-[300px] w-full mt-4">
            <BarChart :data="data" index="name" :categories="['nps']" :colors="['var(--primary)']" :rounded-corners="4" />
          </div>
        </GCard>
        <GCard title="Acciones Recomendadas">
          <div class="flex flex-col gap-4 mt-2">
            <div class="p-3 bg-muted/50 rounded-lg border border-border">
              <div class="font-medium text-sm">Organizar taller de mindfulness</div>
              <div class="text-xs text-muted-foreground mt-1">Sugerido por alta ansiedad de equipo ventas</div>
            </div>
            <div class="p-3 bg-muted/50 rounded-lg border border-border">
              <div class="font-medium text-sm">Revisar cargas de trabajo</div>
              <div class="text-xs text-muted-foreground mt-1">Equipo de desarrollo reporta fatiga</div>
            </div>
          </div>
        </GCard>
      </div>
    </div>
  </GPageContainer>
</template>
