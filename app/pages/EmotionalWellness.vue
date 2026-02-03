<script setup lang="ts">
import { Navigation, PenTool, Type, Grid2x2 } from "lucide-vue-next"

const options = [
  {
    icon: Navigation,
    text: 'Move tool',
    callback: () => {
      console.log('Move tool')
    }
  },
  {
    icon: PenTool,
    text: 'Edit tool',
    callback: () => {
      console.log('Edit tool')
    }
  },
  {
    icon: Type,
    text: 'Text tool',
    callback: () => {
      console.log('Text tool')
    }
  },
  {
    icon: Navigation,
    text: 'Move tool',
    callback: () => {
      console.log('Move tool')
    }
  },
  {
    icon: PenTool,
    text: 'Edit tool',
    callback: () => {
      console.log('Edit tool')
    }
  },
  {
    icon: Grid2x2,
    text: 'Actions',
    callback: () => {
      console.log('Actions')
    }
  }
]
</script>

<template>
  <GPageContainer>
    <h1>Emotional Wellness</h1>
    <section class="flex justify-center items-center h-[calc(100vh-100px)]">
      <GRadialMenu :options="options" :radius="150" button-size="w-16 h-16" />
    </section>
  </GPageContainer>
</template>
