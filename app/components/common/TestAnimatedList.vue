<script setup lang="ts">
import { Cake } from 'lucide-vue-next';

const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

const itemsToShow = computed(() => {
  if (!activeItem.value) return items.value
  return items.value.filter((item) => item === activeItem.value)
})

const show = ref(true)
const activeItem = ref()
</script>

<template>
  <div class="relative">
    <transition-group name="slide" class="flex flex-col gap-2 bg-background" tag="ul">
      <li v-for="item in itemsToShow" :key="item"
        class="p-2 bg-background rounded flex gap-2 cursor-pointer border border-border transition-all duration-500 ease-in-out h-15 relative"
        :class="{ 'z-10 h-56': activeItem === item }"
        @click="activeItem === item ? activeItem = null : activeItem = item">
        <div
          class="bg-primary p-2 rounded-xl transition-all duration-500 ease-in-out relative scale-100 top-0 left-0 w-10 h-10 flex items-center justify-center"
          :class="{ 'rounded-sm! scale-150 top-4 left-4': activeItem === item }">
          <Cake class="text-background" />
        </div>
        <div class="flex flex-col gap-1 top-0 right-0 relative transition-all duration-500 ease-in-out"
          :class="{ 'text-primary top-20 right-10': activeItem === item }">
          <span>{{ `item ${item}` }}</span>
          <span class="text-xs text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            doloribus</span>
          <transition name="fade">
            <p class="text-xs font-italic text-muted-foreground" v-if="activeItem === item">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus hic odit repellat neque odio dolor et
              rerum consequuntur esse harum, totam optio fugiat a doloribus dicta, quaerat voluptates ullam facilis?
            </p>
          </transition>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<style scoped>
.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  border-color: transparent;
  transform: translateX(-100%);
}

.slide-leave-active {
  position: absolute;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
