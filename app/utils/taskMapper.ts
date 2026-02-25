import type { Task, Priority } from '~/types/task';


/*
Este es un traductor para que se pueda comunicar mejor el front con la API:

    BACKEND (API)                   FRONTEND
    _id                 vs            idTask
    titulo              vs             title
    descripcion         vs       description
    prioridad           vs          priority
    estado              vs               done ←(Aqui cuando diseñe la BD, coloque a estado como string, no como boobleano)
    fechaVencimiento    vs         dateFinish
    createdAt           vs        dateCreated

*/

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