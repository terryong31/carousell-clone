export const useLikes = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // Insert or remove a like; returns the new liked state.
  const toggleLike = async (itemId: string, currentlyLiked: boolean) => {
    if (!user.value?.id) throw new Error('Not authenticated')
    if (currentlyLiked) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('item_id', itemId)
        .eq('user_id', user.value.id)
      if (error) throw error
      return false
    }
    const { error } = await supabase
      .from('likes')
      .insert({ item_id: itemId, user_id: user.value.id })
    if (error) throw error
    return true
  }

  // Which of the given items has the current user liked? (empty when logged out)
  const fetchLikedIds = async (itemIds: string[]) => {
    if (!user.value?.id || itemIds.length === 0) return new Set<string>()
    const { data, error } = await supabase
      .from('likes')
      .select('item_id')
      .eq('user_id', user.value.id)
      .in('item_id', itemIds)
    if (error) throw error
    return new Set((data ?? []).map(row => row.item_id))
  }

  return { toggleLike, fetchLikedIds }
}
