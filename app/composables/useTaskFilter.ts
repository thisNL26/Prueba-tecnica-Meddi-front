import type { Task } from "~/types/task";

export const useTaskFilters = (rawTasks: Ref<Task[]>) => {
  // Filtros
  const searchQuery = ref("");
  const sortBy = ref<"title" | "createdAt" | "dateFinish">("createdAt");
  const order = ref<"asc" | "desc">("desc");
  const isGroupedView = ref(false);

  //Filtrado por titulo
  const filteredTasks = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) return rawTasks.value;
    return rawTasks.value.filter((t) => t.title.toLowerCase().includes(query));
  });

  // Ordenamiento
  const processedTasks = computed(() => {
    const list = [...filteredTasks.value];
    return list.sort((a, b) => {
      const field = sortBy.value;

      const valA = a[field as keyof Task] ?? "";
      const valB = b[field as keyof Task] ?? "";

      if (valA < valB) return order.value === "asc" ? -1 : 1;
      if (valA > valB) return order.value === "asc" ? 1 : -1;
      return 0;
    });
  });

  // Filtrado por grupos
  const tasksAlta = computed(() => processedTasks.value.filter(t => t.priority === 'Alta' && !t.done));
  const tasksMedia = computed(() => processedTasks.value.filter(t => t.priority === 'Media' && !t.done));
  const tasksBaja = computed(() => processedTasks.value.filter(t => t.priority === 'Baja' && !t.done));
  const tasksCompleted = computed(() => processedTasks.value.filter(t => t.done));


  return {
    searchQuery,
    sortBy,
    order,
    isGroupedView,
    processedTasks,
    tasksAlta,
    tasksMedia,
    tasksBaja,
    tasksCompleted,
  };
};
