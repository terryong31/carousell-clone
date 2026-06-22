<script setup lang="ts">
import { categoryLabel } from '~/constants/sell-categories'

definePageMeta({
  showSearch: true,
  key: route => route.fullPath
})

const route = useRoute()
const category = (route.query.category as string) || undefined

const { fetchItems, PAGE_SIZE } = useItems()
const { data: initial } = await useAsyncData(
  `shop-${category ?? 'all'}`,
  () => fetchItems({ category })
)
const { items, likedIds, pending, hasMore, loadMore, toggle } = useItemFeed(
  initial.value ?? [],
  offset => fetchItems({ offset, category }),
  PAGE_SIZE
)

const heading = computed(() => (category ? categoryLabel(category) : 'Browse all'))
</script>

<template>
  <div class="py-4 space-y-6">
    <h1 class="font-black text-2xl">
      {{ heading }}
    </h1>

    <p
      v-if="!items.length"
      class="text-muted py-8 text-center"
    >
      No listings found.
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
