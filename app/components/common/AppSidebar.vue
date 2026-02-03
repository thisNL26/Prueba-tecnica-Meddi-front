<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export interface Item {
  title: string
  group?: string
  url: string
  icon: Component
}

const {items = []} = defineProps<{
  items: Item[]
}>()

const ungroupedItems = computed(() => items.filter((item) => !item.group))
const groupedItems = computed(() => items.filter((item) => item.group).reduce((acc, item) => {
  acc[item.group as string] = [...(acc[item.group as string] || []), item]
  return acc
}, {} as Record<string, Item[]>))

</script>

<template>
  <Sidebar>
    <SidebarHeader>
    <!-- logo -->
    </SidebarHeader>
    <SidebarContent>
     <!-- menu items -->
      <!-- items out of a group -->
      <SidebarMenu>
        <SidebarMenuItem v-for="item in ungroupedItems" :key="item.title" class="px-2">
          <SidebarMenuButton asChild :class="{ 'bg-sidebar-primary! text-sidebar-primary-foreground!': item.url === $route.path }">
            <NuxtLink :to="item.url">
              <component :is="item.icon" />
              <span>{{item.title}}</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      <!-- items in a group -->
      <SidebarGroup v-for="[group, items] in Object.entries(groupedItems)" :key="group">
        <SidebarGroupLabel>{{ group }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <NuxtLink :to="item.url">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                    </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

    </SidebarContent>

    <SidebarFooter>
    <!-- logout -->
    </SidebarFooter>
  </Sidebar>
</template>
