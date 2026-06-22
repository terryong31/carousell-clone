<script setup lang="ts">
import type { FeedItem } from '~/types/feed'

const props = defineProps<{
  item: FeedItem
  liked?: boolean
}>()

const emit = defineEmits<{
  toggle: [itemId: string]
}>()

const CONDITION_LABELS: Record<string, string> = {
  new: 'Brand new',
  like_new: 'Like new',
  good: 'Lightly used',
  fair: 'Well used',
  poor: 'Heavily used'
}

const sellerName = computed(() =>
  props.item.seller?.display_name || props.item.seller?.username || 'Unknown seller'
)
const sellerAvatar = computed(() => props.item.seller?.avatar_url || '/blank_profile_pic.webp')
const cover = computed(() => props.item.images[0] || '/shrek.webp')
const priceLabel = computed(() => (props.item.price > 0 ? `RM${props.item.price}` : 'Free'))
const conditionLabel = computed(() =>
  props.item.condition ? CONDITION_LABELS[props.item.condition] ?? props.item.condition : ''
)
const likeCount = computed(() => props.item.likes[0]?.count ?? 0)

const listedAgo = computed(() => {
  if (!props.item.created_at) return ''
  const days = Math.floor((Date.now() - new Date(props.item.created_at).getTime()) / 86_400_000)
  if (days <= 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  return months === 1 ? '1 month ago' : `${months} months ago`
})
</script>

<template>
  <NuxtLink :to="`/p/${item.slug}`">
    <UCard
      class="hover:border-gray-800 hover:shadow-xl dark:hover:shadow-none dark:hover:bg-neutral-800 transition-colors px-2 py-4"
    >
      <template #header>
        <div class="flex gap-2">
          <UAvatar :src="sellerAvatar" />
          <div class="flex flex-col gap-0.5">
            <div class="font-bold line-clamp-1">
              {{ sellerName }}
            </div>
            <div class="text-sm text-muted">
              {{ listedAgo }}
            </div>
          </div>
        </div>
      </template>

      <NuxtImg
        :src="cover"
        class="w-full aspect-[1/1] rounded-md object-cover"
        loading="lazy"
      />

      <template #footer>
        <p class="line-clamp-1">
          {{ item.title }}
        </p>
        <p class="font-bold text-lg">
          {{ priceLabel }}
        </p>
        <p class="text-muted">
          {{ conditionLabel }}
        </p>
        <div class="pt-3 flex items-center gap-1">
          <UButton
            icon="i-lucide-heart"
            :color="liked ? 'primary' : 'neutral'"
            :variant="liked ? 'soft' : 'ghost'"
            size="xs"
            @click.prevent.stop="emit('toggle', item.id)"
          />
          <span>{{ likeCount }}</span>
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>
