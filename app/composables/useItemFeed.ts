import type { FeedItem } from '~/types/feed'

// Shared list state for the home feed, shop browse, and search results:
// seeds from SSR data, loads more client-side, and manages per-user like state.
export const useItemFeed = (
  initial: FeedItem[],
  fetchMore: (offset: number) => Promise<FeedItem[]>,
  pageSize: number
) => {
  const user = useSupabaseUser()
  const isLoginOpen = useState('auth-login-modal', () => false)
  const { toggleLike, fetchLikedIds } = useLikes()

  const items = ref<FeedItem[]>([...initial])
  const likedIds = ref(new Set<string>())
  const pending = ref(false)
  const hasMore = ref(initial.length >= pageSize)

  const syncLikes = async (rows: FeedItem[]) => {
    const ids = await fetchLikedIds(rows.map(row => row.id))
    ids.forEach(id => likedIds.value.add(id))
  }

  // Likes are user-specific, so they're resolved on the client (the SSR/ISR
  // payload is shared across users and must stay like-agnostic).
  onMounted(() => syncLikes(items.value))

  const loadMore = async () => {
    if (pending.value || !hasMore.value) return
    pending.value = true
    try {
      const rows = await fetchMore(items.value.length)
      hasMore.value = rows.length >= pageSize
      items.value.push(...rows)
      await syncLikes(rows)
    } finally {
      pending.value = false
    }
  }

  const adjustCount = (item: FeedItem, delta: number) => {
    if (item.likes[0]) item.likes[0].count += delta
    else if (delta > 0) item.likes = [{ count: 1 }]
  }

  const toggle = async (id: string) => {
    if (!user.value) {
      isLoginOpen.value = true
      return
    }
    const item = items.value.find(row => row.id === id)
    if (!item) return

    const wasLiked = likedIds.value.has(id)
    // optimistic update
    if (wasLiked) likedIds.value.delete(id)
    else likedIds.value.add(id)
    adjustCount(item, wasLiked ? -1 : 1)

    try {
      await toggleLike(id, wasLiked)
    } catch {
      // revert on failure
      if (wasLiked) likedIds.value.add(id)
      else likedIds.value.delete(id)
      adjustCount(item, wasLiked ? 1 : -1)
    }
  }

  return { items, likedIds, pending, hasMore, loadMore, toggle }
}
