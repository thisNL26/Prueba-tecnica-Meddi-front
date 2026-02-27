import type { Task } from "~/types/task";

export const useDataChartTask = (tasks: Ref<Task[]>) => {
  const priorityData = computed(() => {
    const counts = { Alta: 0, Media: 0, Baja: 0 };
    tasks.value.forEach((t) => counts[t.priority]++);
    return counts;
  });

  const statusData = computed(() => {
    const completed = tasks.value.filter((t) => t.done).length;
    return {
      completadas: completed,
      pendientes: tasks.value.length - completed,
    };
  });

  const topCreatedDays = computed(() => {
    const dayCounts: Record<string, number> = {};

    //Rango de la semana
    const now = new Date();
    const startOfWeek = new Date(now);

    const dayDiff = now.getDay() === 0 ? 6 : now.getDay() - 1;
    startOfWeek.setDate(now.getDate() - dayDiff);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    console.log("Inicio de la semana en: ", startOfWeek);
    console.log("Fin de la semana en: ", endOfWeek);

    tasks.value.forEach((t) => {
      const dateVal = t.dateCreated;
      if (!dateVal) return;

      //TO DO: Arreglar bug de formato en la linea 41, el filtro de la linea 47 rebota las fechas 
      const [year, month, day] = (dateVal as string).split("/");
      const date = new Date(`20${year}-${month}-${day}`);
      
      console.log(date);
      // FIltramos solo los dias que esten en esa semana

      if (!isNaN(date.getTime()) && date >= startOfWeek && date <= endOfWeek) {
        const dayName = new Intl.DateTimeFormat("es-MX", {
          weekday: "long",
        }).format(date);

        const formattedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        dayCounts[formattedDay] = (dayCounts[formattedDay] || 0) + 1;
      }
    });
    // Temporalmente Undefined
    return undefined;
  });

  return {
    priorityData,
    statusData,
    topCreatedDays,
  };
};
