import type { Tables } from './database.types'

// An item row enriched with its seller profile and aggregate like count.
export type FeedItem = Tables<'items'> & {
  seller: Pick<Tables<'profiles'>, 'username' | 'display_name' | 'avatar_url'> | null
  likes: { count: number }[]
}
