export const useAuth = () => {
    const supabase = useSupabaseClient()
    const signIn = async (userEmail: string, userPassword: string) => {
        const result = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: userPassword,
        })
        return result
    }

    const signUp = async (userEmail: string, userPassword: string) => {
        const result = await supabase.auth.signUp({
            email: userEmail,
            password: userPassword,
            options: {
                emailRedirectTo: "http://localhost:3000/confirm"
            }
        })
        return result
    }
    return { signIn, signUp }
}