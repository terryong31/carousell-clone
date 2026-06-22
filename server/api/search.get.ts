import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { FeedItem } from '~/types/feed'

const PAGE_SIZE = 12

// Full-text + filtered search over active listings.
// Query params: q (text), category, condition, offset.
export default defineEventHandler(async (event): Promise<FeedItem[]> => {
  const { q, category, condition, offset } = getQuery(event)
  const client = await serverSupabaseClient<Database>(event)

  const start = Math.max(0, Number.parseInt(String(offset ?? '0'), 10) || 0)
  let query = client
    .from('items')
    .select('*, seller:profiles!items_seller_id_fkey(username, display_name, avatar_url), likes(count)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .range(start, start + PAGE_SIZE - 1)

  const text = String(q ?? '').trim()
  if (text) {
    query = query.textSearch('search_vector', text, { type: 'websearch', config: 'english' })
  }
  if (category) query = query.eq('category', String(category))
  if (condition) query = query.eq('condition', String(condition))

  const { data, error } = await query
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  return (data ?? []) as unknown as FeedItem[]
})
