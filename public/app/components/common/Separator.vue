<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui';
import Separator from '~/components/ui/separator/Separator.vue';
const props = defineProps<SeparatorProps>();

</script>

<template>
  <div class="flex items-center h-5" v-if="props.orientation === 'vertical'">
    <Separator v-bind="props" />
  </div>
  <Separator v-else v-bind="props" />
</template>
