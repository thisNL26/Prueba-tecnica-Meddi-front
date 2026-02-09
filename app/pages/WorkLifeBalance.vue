<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'

const data = [
  { range: '0-40h', employees: 45 },
  { range: '41-45h', employees: 30 },
  { range: '46-50h', employees: 15 },
  { range: '+50h', employees: 5 },
]
</script>

<template>
  <GPageContainer>
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold tracking-tight">Balance Vida-Trabajo</h1>
        <p class="text-muted-foreground">Equilibrio entre responsabilidades laborales y tiempo personal.</p>
      </div>

      <div class="grid gap-4 md:grid-cols-4">
        <GCard title="Burnout Risk">
          <div class="text-4xl font-bold text-green-500">8%</div>
          <p class="text-muted-foreground mt-2">Bajo riesgo global</p>
        </GCard>
        <GCard title="Vacaciones">
          <div class="text-4xl font-bold">75%</div>
          <p class="text-muted-foreground mt-2">Tasa de uso anual</p>
        </GCard>
        <GCard title="Horas Extra">
          <div class="text-4xl font-bold text-yellow-500">Avg 3h</div>
          <p class="text-muted-foreground mt-2">Por semana/empleado</p>
        </GCard>
         <GCard title="Flexibilidad">
          <div class="text-4xl font-bold">4.6/5</div>
          <p class="text-muted-foreground mt-2">Satisfacción con horario</p>
        </GCard>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <GCard title="Distribución de Carga Horaria">
          <div class="h-[300px] w-full mt-4">
             <BarChart :data="data" index="range" :categories="['employees']" :colors="['var(--chart-5)']" />
          </div>
        </GCard>
        <GCard title="Políticas de Desconexión">
           <div class="flex flex-col gap-4 mt-2">
             <div class="flex items-start gap-4 p-4 border rounded-lg">
               <div class="bg-primary/10 p-2 rounded-full">🌙</div>
               <div>
                 <h4 class="font-bold">Horario Protegido</h4>
                 <p class="text-sm text-muted-foreground">No se esperan respuestas a correos después de las 7:00 PM.</p>
               </div>
             </div>
              <div class="flex items-start gap-4 p-4 border rounded-lg">
               <div class="bg-primary/10 p-2 rounded-full">🏝️</div>
               <div>
                 <h4 class="font-bold">Viernes Cortos</h4>
                 <p class="text-sm text-muted-foreground">Salida a las 2:00 PM el último viernes de cada mes.</p>
               </div>
             </div>
           </div>
        </GCard>
      </div>
    </div>
  </GPageContainer>
</template>
