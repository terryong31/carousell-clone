<script setup lang="ts">
import type { FeedItem } from '~/types/feed'

definePageMeta({
  showSearch: true,
  key: route => route.fullPath
})

const route = useRoute()
const router = useRouter()
const q = (route.query.q as string) || ''
const search = ref(q)

const { PAGE_SIZE } = useItems()
const { data: initial } = await useAsyncData(
  `search-${q}`,
  () => $fetch<FeedItem[]>('/api/search', { query: { q } })
)
const { items, likedIds, pending, hasMore, loadMore, toggle } = useItemFeed(
  initial.value ?? [],
  offset => $fetch<FeedItem[]>('/api/search', { query: { q, offset } }),
  PAGE_SIZE
)

function submitSearch() {
  router.push({ path: '/search', query: { q: search.value || undefined } })
}
</script>

<template>
  <div class="py-4 space-y-6">
    <UInput
      v-model="search"
      placeholder="Search listings"
      icon="i-lucide-search"
      size="lg"
      class="w-full"
      @keyup.enter="submitSearch"
    />

    <h1
      v-if="q"
      class="font-black text-2xl"
    >
      Results for "{{ q }}"
    </h1>

    <p
      v-if="!items.length"
      class="text-muted py-8 text-center"
    >
      {{ q ? `No results for "${q}".` : 'Search for something to get started.' }}
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
