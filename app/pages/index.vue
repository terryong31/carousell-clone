<script setup lang="ts">
import { categories } from '~/constants/header-categories'

definePageMeta({
  showSearch: true,
  showBanner: true
})

const carouselItems = [
  '/ads/2df28c8f891a2441_(1500,610).jpeg',
  '/ads/72cd7f6f4d445d8d_(1500,610).jpeg',
  '/ads/848a5c74f130dae8_(1500,610).png',
  '/ads/93fb4aa723abe827_(1500,610).png',
  '/ads/9a64e4aa014408d2_(1500,610).png',
  '/ads/ba6e69fcf27a41cf_(1500,610).png'
]

// Flatten the categories to show all sub-categories in the carousel
const carouselCategoryList = categories.flatMap(cat => cat.children || [])

// Live "Recommended" feed from the database
const { fetchFeed, fetchItems, PAGE_SIZE } = useItems()
const { data: feedData } = await fetchFeed()
const { items, likedIds, pending, hasMore, loadMore, toggle } = useItemFeed(
  feedData.value ?? [],
  offset => fetchItems({ offset }),
  PAGE_SIZE
)
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
        <NuxtImg
          :src="item"
          class="rounded-lg aspect-[60/24.5] object-cover border border-neutral-200 dark:border-neutral-800 shadow-sm"
          loading="lazy"
        />
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
              class="bg-transparent size-20 ease-in-out transition-all transform-gpu duration-500 hover:-translate-y-1 text-neutral-700 dark:text-neutral-300 group-hover:text-primary"
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

    <p
      v-if="!items.length"
      class="text-muted py-8 text-center"
    >
      No listings yet. Be the first to sell something.
    </p>

    <template v-else>
      <ItemGrid
        :items="items"
        :liked-ids="likedIds"
        @toggle="toggle"
      />
      <div
        v-if="hasMore"
        class="flex justify-center pb-12"
      >
        <UButton
          size="xl"
          class="w-fit"
          variant="outline"
          color="neutral"
          :loading="pending"
          trailing-icon="i-lucide-arrow-right"
          label="View More"
          @click="loadMore"
        />
      </div>
    </template>
  </div>
</template>
