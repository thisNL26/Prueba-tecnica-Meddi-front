export type Priority = "Alta" | "Media" | "Baja";

export interface Task {
  idTask: string;
  title: string;
  description?: string;
  priority: Priority;
  dateCreated: string;
  dateFinish: string;
  done: boolean; 
/*    ↑
    Revisando la logica de las tareas, nunca existe tarea con estado "indefinido", TS me lanzaba un error en 
    TaskCard.vue cuando se llama el metodo getColor
    " :getColor(task.done...."

    por ello se elimino el "?" de done
  */
}

