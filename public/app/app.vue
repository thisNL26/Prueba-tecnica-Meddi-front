<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})



</script>

<template>
  <VitePwaManifest />
  <NuxtLayout name="dashboard">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  color-scheme: dark;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.4s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-5px);
}
</style>
