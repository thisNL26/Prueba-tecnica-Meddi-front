<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
</script>

<template>
  <Carousel
    class="relative w-full max-w-xl"
    :opts="{
      align: 'start',
    }"
    v-slot="{ canScrollNext, canScrollPrev}"
  >
    <CarouselContent>
      <CarouselItem v-for="(_, index) in 5" :key="index" class="md:basis-1/2 lg:basis-1/3">
        <div class="p-1">
          <Card>
            <CardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-3xl font-semibold">{{ index + 1 }}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious v-if="canScrollPrev" class="hidden md:flex" />
    <CarouselNext v-if="canScrollNext" class="hidden md:flex" />
  </Carousel>
</template>
