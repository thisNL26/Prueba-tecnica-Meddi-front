import { mapApiToTask, mapTaskToApi, type ApiTaskResponse } from '~/utils/taskMapper';
import type { Task } from '~/types/task';

export const useTasks = () => {

  // Matriz de datos
  const tasks = useState<Task[]>('tasks-list', () => []);
  const isLoading = useState<boolean>('tasks-loading', () => true);
  const error = useState<string | null>('tasks-error', () => null);

  // Variavbles
  const config = useRuntimeConfig();
  const apiBase = config.public.api.taskManager;

  const tasksAlta = computed(() => tasks.value.filter(t => t.priority === 'Alta' && !t.done));
  const tasksMedia = computed(() => tasks.value.filter(t => t.priority === 'Media' && !t.done));
  const tasksBaja = computed(() => tasks.value.filter(t => t.priority === 'Baja' && !t.done));
  const tasksCompleted = computed(() => tasks.value.filter(t => t.done));

  // READ

  const fetchTasks = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await $fetch<ApiTaskResponse[]>(`${apiBase}/all`);
      tasks.value = response.map(mapApiToTask);
    } catch (e) {
      console.error("Error cargando tareas:", e);
      error.value = "Error al cargar tareas.";
    } finally {
      isLoading.value = false;
    }
  };


  // CREATE

  const addTask = async (newTaskData: Partial<Task>): Promise<boolean> => {
    try {
      const payload = mapTaskToApi(newTaskData); 
      const response = await $fetch<ApiTaskResponse>(`${apiBase}/`, {
        method: 'POST',
        body: payload 
      });
      const newTaskMapped = mapApiToTask(response);
      tasks.value.push(newTaskMapped); 
      
      return true;
    } catch (e) {
      console.error("Error creando tarea:", e);
      error.value = "No se pudo crear la tarea.";
      return false;
    }
  };

  //UPDATE
  const updateTask = async (task: Task) => {
    const previousTasks = [...tasks.value]; 
    const index = tasks.value.findIndex(t => t.idTask === task.idTask);
    
    if (index !== -1) {
      tasks.value[index] = { ...task };
    }

    try {
      const payload = mapTaskToApi(task);

      await $fetch(`${apiBase}/${task.idTask}`, {
        method: 'PUT',
        body: payload 
      });

    } catch (e) {
      console.error("Error actualizando:", e);
      tasks.value = previousTasks;
      alert("Hubo un error al guardar los cambios");
    }
  };


  // DELETE
  const deleteTask = async (idTask: string) => {
    const previousTasks = [...tasks.value];
    tasks.value = tasks.value.filter(t => t.idTask !== idTask);

    try {
      await $fetch(`${apiBase}/${idTask}`, { method: 'DELETE' });
    } catch (e) {
      tasks.value = previousTasks;
      console.error("Error eliminando:", e);
    }
  };

  return {
    tasks,
    tasksAlta,
    tasksMedia,
    tasksBaja,
    tasksCompleted,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
  };

};

