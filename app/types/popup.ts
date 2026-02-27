export type PopUpMode = 'create' | 'edit' | 'delete'

export interface PopUpState<T> {
  isOpen: boolean
  mode: PopUpMode | null
  payload: T | null
}
