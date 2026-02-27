import { reactive } from 'vue'
import type { PopUpState, PopUpMode } from '~/types/popup'

export function usePopUp<T>() {
  const state = reactive({
    isOpen: false,
    mode: null as PopUpMode | null,
    payload: null as T | null
  }) as PopUpState<T>

  function open(newMode: PopUpMode, data?: T) {
    state.isOpen = true
    state.mode = newMode
    state.payload = data ?? null
  }

  function close() {
    state.isOpen = false
    state.mode = null 
    state.payload = null
  }

  return {
    state, 
    open,
    close
  }
}