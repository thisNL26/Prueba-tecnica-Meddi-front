export type Priority = "Alta" | "Media" | "Baja";

export interface Task {
  idTask: string;
  title: string;
  description?: string;
  priority: Priority;
  dateCreated: string;
  dateFinish: string;
  done: boolean; 
}