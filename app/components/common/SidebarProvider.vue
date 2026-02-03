<script setup lang="ts">
import SidebarProvider from '~/components/ui/sidebar/SidebarProvider.vue';


</script>

<template>
  <SidebarProvider :default-open="true">
    <slot name="sidebar" />
    <main class="w-full relative">
      <header class="flex flex-col sticky top-0 z-10 bg-background">
        <div class="flex items-center gap-2 p-2">
          <SidebarTrigger />
          <GSeparator orientation="vertical" />
          <slot name="header" />
        </div>
        <GSeparator orientation="horizontal" />
      </header>

      <slot />
    </main>
  </SidebarProvider>
</template>
