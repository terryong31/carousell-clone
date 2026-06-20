import type { TablesUpdate } from '~/types/database.types'

export const useProfile = () => {
  const supabase = useSupabaseClient()

  const fetchProfile = (userId: string) =>
    useAsyncData(`profile-${userId}`, async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (error) throw error
      return data
    })

  const updateProfile = async (patch: TablesUpdate<'profiles'>) => {
    const user = useSupabaseUser()
    if (!user.value?.id) throw new Error('Not authenticated')
    return supabase
      .from('profiles')
      .update(patch)
      .eq('id', user.value.id)
  }

  return { fetchProfile, updateProfile }
}
