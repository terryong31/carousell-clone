import type { TablesInsert } from '~/types/database.types'

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
        .select('*')
        .eq('slug', slug)
        .single()
      if (error) throw createError({ statusCode: 404, message: 'Item not found' })
      return data
    })

  const fetchSellerItems = (sellerId: string) =>
    useAsyncData(`seller-items-${sellerId}`, async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('seller_id', sellerId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data ?? []
    })

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

  return { fetchItem, fetchSellerItems, createItem }
}
