import { mapApiToTask, type ApiTaskResponse } from '~/utils/taskMapper';
import type { Task } from '~/types/task';

export const useTasks = () => {

  const tasks = useState<Task[]>('tasks-list', () => []);
  const isLoading = useState<boolean>('tasks-loading', () => true);

  const error = useState<string | null>('tasks-error', () => null);

  const config = useRuntimeConfig();
  const apiBase = config.public.api.taskManager;

  const tasksAlta = computed(() => tasks.value.filter(t => t.priority === 'Alta' && !t.done));
  const tasksMedia = computed(() => tasks.value.filter(t => t.priority === 'Media' && !t.done));
  const tasksBaja = computed(() => tasks.value.filter(t => t.priority === 'Baja' && !t.done));
  const tasksCompleted = computed(() => tasks.value.filter(t => t.done));

  const getRawTasksFromApi = async (): Promise<ApiTaskResponse[]> => {
    try {
      const response = await $fetch<ApiTaskResponse[]>(`${apiBase}/all`);
      return response;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  };


  const fetchTasks = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const rawData = await getRawTasksFromApi();
      tasks.value = rawData.map((item) => mapApiToTask(item));
      
    } catch (e) {
      console.error("No se pudieron cargar las tareas");
      error.value = "Hubo un problema al conectar con el servidor.";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    tasks,
    tasksAlta,
    tasksMedia,
    tasksBaja,
    tasksCompleted,
    fetchTasks,
    isLoading,
    error
  };
};