import type { TablesInsert } from '~/types/database.types'
import type { FeedItem } from '~/types/feed'

// Disambiguate the seller embed via the FK name — items links to profiles both
// directly (seller_id) and indirectly (through likes).
const FEED_SELECT = '*, seller:profiles!items_seller_id_fkey(username, display_name, avatar_url), likes(count)'
const PAGE_SIZE = 12

type CreateItemPayload = Omit<
  TablesInsert<'items'>,
  'id' | 'seller_id' | 'slug' | 'images' | 'created_at' | 'updated_at'
> & { imageFiles: File[] }

export const useItems = () => {
  const supabase = useSupabaseClient()

  const fetchItem = (slug: string) =>
    useAsyncData(`item-${slug}`, async () => {
      const { data, error } = await supabase
        .from('items')
        .select(FEED_SELECT)
        .eq('slug', slug)
        .single<FeedItem>()
      if (error) throw createError({ statusCode: 404, message: 'Item not found' })
      return data
    })

  const fetchSellerItems = (sellerId: string) =>
    useAsyncData(`seller-items-${sellerId}`, async () => {
      const { data, error } = await supabase
        .from('items')
        .select(FEED_SELECT)
        .eq('seller_id', sellerId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .returns<FeedItem[]>()
      if (error) throw error
      return data ?? []
    })

  // Initial home-feed page; runs server-side so the page is ISR-cacheable.
  const fetchFeed = () =>
    useAsyncData('home-feed', () => fetchItems())

  // Plain fetch used for client-side pagination and category browsing.
  const fetchItems = async (opts: { offset?: number, category?: string } = {}) => {
    const offset = opts.offset ?? 0
    let query = supabase
      .from('items')
      .select(FEED_SELECT)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1)
    if (opts.category) query = query.eq('category', opts.category)
    const { data, error } = await query.returns<FeedItem[]>()
    if (error) throw error
    return data ?? []
  }

  const createItem = async (payload: CreateItemPayload) => {
    const user = useSupabaseUser()
    if (!user.value?.id) throw new Error('Not authenticated')
    const imageUrls = await Promise.all(
      payload.imageFiles.map(async (file) => {
        const ext = file.name.split('.').pop()
        const path = `${user.value!.id}/${crypto.randomUUID()}.${ext}`
        const { error } = await supabase.storage.from('item-images').upload(path, file)
        if (error) throw error
        return supabase.storage.from('item-images').getPublicUrl(path).data.publicUrl
      })
    )
    const { imageFiles: _files, ...fields } = payload
    return supabase
      .from('items')
      .insert({ ...fields, seller_id: user.value.id, images: imageUrls })
      .select()
      .single()
  }

  return { fetchItem, fetchSellerItems, fetchFeed, fetchItems, createItem, PAGE_SIZE }
}
