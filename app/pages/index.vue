<script setup lang="ts">
import { categories } from '~/constants/categories'

definePageMeta({
  showSearch: true
})

const images = import.meta.glob('~/assets/ads/*.{png,jpg,jpeg,webp}', { eager: true })
const carouselItems = (Object.values(images) as { default: string }[]).map(img => img.default)

// Flatten the categories to show all sub-categories in the carousel
const carouselCategoryList = categories.flatMap(cat => cat.children || [])

const products = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  name: `Awesome Product ${i + 1}`,
  price: 'RM100',
  sellerName: `Seller Name ${i + 1}`,
  daysAgo: `${i + 1} days ago`,
  condition: 'Brand new',
  likeCount: 5
}))
</script>

<template>
  <div class="py-4 space-y-10">
    <div>
      <UCarousel
        v-slot="{ item }"
        :align="'start'"
        arrows
        :items="carouselItems"
        loop
        wheel-gestures
        prev-icon="i-lucide-chevron-left"
        next-icon="i-lucide-chevron-right"
        :ui="{
          item: 'md:basis-1/2',
          arrows: 'flex items-center justify-between pointer-events-none z-[1] absolute inset-0 -mx-4 sm:mx-7 md:mx-7 lg:mx-7',
          prev: 'pointer-events-auto rounded-full bg-white/90 dark:bg-neutral-900/80 shadow-lg text-neutral-900 dark:text-white p-2',
          next: 'pointer-events-auto rounded-full bg-white/90 dark:bg-neutral-900/80 shadow-lg text-neutral-900 dark:text-white p-2'
        }"
        class="w-full"
      >
        <img
          :src="item"
          class="rounded-lg aspect-[60/24.5] object-cover border border-neutral-200 dark:border-neutral-800 shadow-sm"
          loading="lazy"
        >
      </UCarousel>
    </div>

    <h1 class="font-black text-2xl">
      Explore Carousell
    </h1>
    <div>
      <UCarousel
        v-slot="{ item }"
        arrows
        prev-icon="i-lucide-chevron-left"
        next-icon="i-lucide-chevron-right"
        :slides-to-scroll="3"
        :breakpoints="{
          '(min-width: 640px)': {
            slidesToScroll: 5
          },
          '(min-width: 768px)': {
            slidesToScroll: 7
          },
          '(min-width: 1024px)': {
            slidesToScroll: 11
          }
        }"
        :items="carouselCategoryList"
        :ui="{
          item: 'lg:basis-1/11 md:basis-1/7 sm:basis-1/5 basis-1/3',
          arrows: 'flex items-center justify-between pointer-events-none z-[1] absolute inset-0 -mx-4 sm:mx-7 md:mx-7 lg:mx-7',
          prev: 'pointer-events-auto rounded-full bg-white/90 dark:bg-gray-900/90 shadow-md text-neutral-900 dark:text-white p-2',
          next: 'pointer-events-auto rounded-full bg-white/90 dark:bg-gray-900/90 shadow-md text-neutral-900 dark:text-white p-2'
        }"
      >
        <NuxtLink
          :to="item.to"
          class="flex flex-col items-center gap-3 group transition-all active:scale-95"
        >
          <div class="size-22 rounded-full flex items-center justify-center group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors">
            <UAvatar
              :src="item.avatar?.src"
              :icon="item.icon"
              size="2xl"
              class="bg-transparent size-20 text-neutral-700 dark:text-neutral-300 group-hover:text-primary transition-colors"
            />
          </div>
          <span class="text-xs font-medium text-center line-clamp-2 max-w-[80px] text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white">
            {{ item.label }}
          </span>
        </NuxtLink>
      </UCarousel>
    </div>

    <h1 class="font-black text-2xl">
      Recommended For You
    </h1>
    <div class="grid md:grid-cols-4 gap-6 grid-cols-2">
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
      >
        <UCard>
          <template #header>
            <div class="grid gap-x-2 w-fit">

              <div class="row-span-2 size-5 flex items-center justify-center">
                <img
                  src="/blank_profile_pic.webp"
                  class="w-full aspect-[1/1] rounded-full object-cover"
                >
              </div>

              <div class="col-start-2 row-start-1 font-bold">
                {{ product.sellerName }}
              </div>

              <div class="col-start-2 row-start-2">
                {{ product.daysAgo }}
              </div>

            </div>
          </template>

          <img
            src="/shrek.webp"
            class="w-full aspect-[1/1] rounded-md object-cover"
          >

          <template #footer>
            <p>{{ product.name }}</p>
            <p class="font-bold text-lg">{{ product.price }}</p>
            <p>{{ product.condition }}</p>
            <div class="pt-3 flex items-center gap-1">
              <UIcon
                name="i-lucide-heart"
                class="size-4"
              />
              <span>{{ product.likeCount }}</span>
            </div>
          </template>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
