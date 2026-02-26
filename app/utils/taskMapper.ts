import type { Task, Priority } from '~/types/task';


/*


________________________________________________________________________________________________________________________________________
Este es un traductor para que se pueda comunicar mejor el front con la API:

    BACKEND (API)                   FRONTEND
    _id                 vs            idTask
    titulo              vs             title
    descripcion         vs       description
    prioridad           vs          priority
    estado              vs               done ←(Aqui cuando diseñe la BD, coloque a estado como string, no como boobleano)
    fechaVencimiento    vs         dateFinish
    createdAt           vs        dateCreated
________________________________________________________________________________________________________________________________________


*/



// "Back Language" → "Front Language "

export interface ApiTaskResponse {
  _id: string;          
  titulo: string;       
  descripcion?: string;
  prioridad: Priority;
  estado: 'Pendiente' | 'Completada';
  fechaVencimiento: string;
  createdAt: string;
}

const formatDate = (isoString: string): string => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('es-MX', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  });
};

export const mapApiToTask = (apiData: ApiTaskResponse): Task => {
  return {
    idTask: apiData._id,
    title: apiData.titulo,
    description: apiData.descripcion || '',
    priority: apiData.prioridad,
    done: apiData.estado === 'Completada',
    dateCreated: formatDate(apiData.createdAt),
    dateFinish: formatDate(apiData.fechaVencimiento)
  };
};


// "Front Language" → "Back Language"

const unformatDate = (displayDate: string): string => {
  if (!displayDate) return '';
  if (displayDate.includes('/')) {
    const [day, month, year] = displayDate.split('/');
    return `20${year}-${month}-${day}`; 
  }
  return displayDate;
};

export const mapTaskToApi = (task: Partial<Task>): any => {
  return {
    ...(task.idTask && { _id: task.idTask }), //Si el ID no existe (Como al crear una Tarea) se omite este valor. Si no (Como al editar una tarea) se traduce
    titulo: task.title,
    descripcion: task.description,
    prioridad: task.priority,
    estado: task.done ? 'Completada' : 'Pendiente',
    fechaVencimiento: unformatDate(task.dateFinish || ''), 
  };
};