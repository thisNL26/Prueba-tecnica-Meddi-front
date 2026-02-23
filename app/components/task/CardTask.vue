<script setup lang="ts">
const { isChecked, setChecked } = useTaskChecked();

const props = defineProps<{
  title: string;
  description?: string;
  priority: "Alta" | "Media" | "Baja";
  dateCreated: string;
  dateFinish: string;
  done?: boolean;
}>();

function getColor(state: boolean, priority: string) {
  if(props.done) state = !state;
  
  if (state) return "bg-green-500/10 border-green-500/50";
  const priorityClasses: Record<string, string> = {
    Alta: "bg-red-500/10 border-red-500/50",
    Media: "bg-yellow-500/10 border-yellow-500/50",
    Baja: "bg-blue-500/10 border-blue-500/50",
  };

  return priorityClasses[priority] || "bg-slate-500/10 border-slate-500/50";
}
</script>

<template>
  <GCard
    :title="title"
    :class="[getColor(isChecked, priority), 'transition-all']"
  >
    <div class="flex justify-between items-center">
      <span class="text-sm font-medium" done="false">{{ description }}</span>

      <input
        type="checkbox"
        :checked="done"
        @change="setChecked"
        class="cursor-pointer h-7 w-7"
      />
    </div>

    <template #footer>
      <div
        class="flex gap-2 text-[10px] opacity-50 uppercase font-bold tracking-wider"
      >
        <span>📅 {{ dateCreated }}</span>
        <span>🏁 {{ dateFinish }}</span>
      </div>
    </template>
  </GCard>
</template>
