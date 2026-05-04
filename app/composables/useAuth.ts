export const useAuth = () => {
  const supabase = useSupabaseClient()
  const signIn = async (userEmail: string, userPassword: string) => {
    const result = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword
    })
    return result
  }

  const signUp = async (userEmail: string, userPassword: string, userDisplayName: string) => {
    const result = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
      options: {
        emailRedirectTo: 'http://localhost:3000/confirm',
        data: {
          display_name: userDisplayName
        }
      }
    })
    return result
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const sendResetPasswordLink = async (userEmail: string) => {
    const result = await supabase.auth.resetPasswordForEmail(
      userEmail,
      { redirectTo: 'http://localhost:3000/reset-password' }
    )
    return result
  }

  const resetPassword = async (userPassword: string) => {
    const result = await supabase.auth.updateUser({
      password: userPassword
    })
    return result
  }

  return { signIn, signUp, signOut, sendResetPasswordLink, resetPassword }
}
