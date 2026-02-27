<script setup lang="ts">
import type { PopUpState } from '~/types/popup'

// Importamos los formularios
import FormCreate from '~/components/forms/FormCreate.vue'
import FormEdit from '~/components/forms/FormEdit.vue'
import FormDelete from '~/components/forms/FormDelete.vue'

const props = defineProps<{
  state: PopUpState<any>
  close: () => void
}>()

// Función que devuelve el formulario correspondiente según el modo
function getFormComponent() {
  switch (props.state.mode) {
    case 'create':
      return FormCreate
    case 'edit':
      return FormEdit
    case 'delete':
      return FormDelete
    default:
      return null
  }
}
</script>


<template>


  <div>
    <GCard title="" v-if="state.isOpen" class="pop-up-card">
      <component
        :is="getFormComponent()"
        :payload="state.payload"
        @close="close"
    />
  </GCard>
  </div>
  
</template>

<style scoped>
.pop-up-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  min-width: 300px;
  max-width: 500px;
  padding: 1.5rem;
}
</style>