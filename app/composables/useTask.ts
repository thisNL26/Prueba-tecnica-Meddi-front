export const useTasks = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.api.taskManager;
  const getAllTasks = async () => {
    try {
      const response = await $fetch(`${apiBase}/all`);
      return response;
    } catch (error) {
      console.error('Error en el agente de tareas:', error);
      throw error;
    }
  };

  return {
    getAllTasks
  };
};