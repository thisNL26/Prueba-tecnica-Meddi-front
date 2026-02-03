<script setup lang="ts">
import { Ellipsis } from 'lucide-vue-next';
const { options, radius = 56, buttonSize = 'w-12 h-12' } = defineProps<{
  options: Array<{
    icon: Component,
    text?: string
    callback: (...args: any[]) => void | Promise<void>
  }>
  radius?: number
  buttonSize?: string
}>()
const radialMenu = ref(false)
const radialMenuRef = ref(null)

onClickOutside(radialMenuRef, () => radialMenu.value = false)


const getButtonPosition = (index: number) => {
  const totalOptions = options.length
  const angle = (index * (360 / totalOptions) - 90) * (Math.PI / 180)
  return {
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`
  }
}

const hoveredIndex = ref<number | null>(null)

const conePath = computed(() => {
  if (hoveredIndex.value === null) return ''

  const totalOptions = options.length
  // Calculate the angle of the hovered item
  const angleDeg = (hoveredIndex.value * (360 / totalOptions)) - 90
  const angleRad = angleDeg * (Math.PI / 180)

  // Define the cone spread (how wide the cone is at the outer edge)
  const spreadDeg = 360 / totalOptions // degrees
  const spreadRad = spreadDeg * (Math.PI / 180) / 2

  // Center point
  const cx = 0
  const cy = 0

  // Calculate two points on the outer radius
  const x1 = Math.cos(angleRad - spreadRad) * radius
  const y1 = Math.sin(angleRad - spreadRad) * radius

  const x2 = Math.cos(angleRad + spreadRad) * radius
  const y2 = Math.sin(angleRad + spreadRad) * radius

  return `M ${cx} ${cy} L ${x1} ${y1} L ${x2} ${y2} Z`
})

const ringPath = computed(() => {
  if (hoveredIndex.value === null) return "conic-gradient(from 0deg,var(--border))"

  const totalOptions = options.length

  const angleDeg = (hoveredIndex.value * (360 / totalOptions)) - 90
  const spreadDeg = 360 / totalOptions // degrees

  return `conic-gradient(from ${angleDeg + spreadDeg}deg,var(--ring) 0deg ${spreadDeg}deg, var(--border) ${spreadDeg}deg)`

})

onMounted(() => {
  if (options.length > 6) {
    console.warn('RadialMenu has more than 6 options, which may not display properly')
  }
})
</script>

<template>
  <div ref="radialMenuRef" class="relative w-fit" @keydown.escape="radialMenu = false">
    <button @click="radialMenu = !radialMenu" :class="[radialMenu ? 'border-ring!' : '', buttonSize]" class="border-4 border-border rounded-full bg-background hover:bg-accent/80 
      transition-colors cursor-pointer hover:border-ring/80 z-20 relative flex items-center justify-center">
      <slot name="default">
        <Ellipsis />
      </slot>
    </button>

    <Transition name="ring">
      <div v-if="radialMenu" @click="radialMenu = !radialMenu"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10 duration-200 overflow-hidden bg-border transition-colors"
        :style="{ width: `${radius * 2}px`, height: `${radius * 2}px`, background: ringPath }">

        <!-- tap circle -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full -z-1 duration-200 overflow-hidden bg-background"
          :style="{ width: `${radius * 2 - 10}px`, height: `${radius * 2 - 10}px` }"></div>

        <!-- Cone Effect SVG -->
        <Transition name="cone">
          <svg v-if="hoveredIndex !== null"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible z-5"
            :style="{ width: `${radius * 2 * 1.5}px`, height: `${radius * 2 * 1.5}px` }"
            :viewBox="`-${radius} -${radius} ${radius * 2} ${radius * 2}`">
            <path :d="conePath" class="fill-primary/10 " />
          </svg>
        </Transition>

      </div>
    </Transition>



    <TransitionGroup name="fade">
      <Button v-if="radialMenu" variant="outline" v-for="(option, index) in options" :key="option.text" size="sm"
        @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = null" :style="getButtonPosition(index)"
        class="z-12 absolute text-xs cursor-pointer" @click="option.callback">
        <span v-if="option.text" class="text-xs">{{ option.text }}</span>
        <component :is="option.icon" class="w-4 h-4!" />
      </Button>
    </TransitionGroup>

  </div>
</template>

<style scoped>
.ring-enter-active {
  animation: ring-animation 200ms ease-in-out;
}

.ring-leave-active {
  animation: ring-animation 200ms ease-in-out reverse;
}

@keyframes ring-animation {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.fade-enter-active {
  transition: opacity 150ms ease-in-out 200ms;
}

.fade-leave-active {
  transition: opacity 150ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.cone-enter-active,
.cone-leave-active {
  transition: opacity 100ms ease-in;
}

.cone-enter-from,
.cone-leave-to {
  opacity: 0;
}
</style>
