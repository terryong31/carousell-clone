<script setup lang="ts">
import type { FeedItem } from '~/types/feed'

defineProps<{
  items: FeedItem[]
  likedIds: Set<string>
}>()

const emit = defineEmits<{
  toggle: [itemId: string]
}>()
</script>

<template>
  <div class="grid md:grid-cols-4 gap-3 grid-cols-2">
    <ItemCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      :liked="likedIds.has(item.id)"
      @toggle="emit('toggle', $event)"
    />
  </div>
</template>
