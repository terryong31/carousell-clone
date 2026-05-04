<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const { signIn } = useAuth()

const toast = useToast()

const isLoginOpen = useState('auth-login-modal', () => false)

const isRegisterOpen = useState('auth-register-modal', () => false)

const state = reactive<Partial<LoginSchema>>({
  email: undefined,
  password: undefined
})

const loading = ref(false)

async function onLoginSubmit(_event: FormSubmitEvent<LoginSchema>) {
  if (state.email && state.password) {
    loading.value = true
    try {
      const { data, error } = await signIn(state.email, state.password)
      if (error) {
        toast.add({ title: 'Login Failed', description: 'Invalid login credentials', color: 'error' })
        return
      } else {
        toast.add({ title: 'Login Successful', description: 'Welcome back! ' + data.user.email, color: 'success' })
        isLoginOpen.value = false
        return
      }
    } finally {
      loading.value = false
    }
  }
}
</script>

<template>
  <UButton
    label="Login"
    class="font-bold"
    color="neutral"
    variant="ghost"
    @click="isLoginOpen = true"
  />

  <UModal
    v-model:open="isLoginOpen"
    :ui="{ content: 'sm:max-w-sm' }"
  >
    <template #title>
      <AppLogo class="h-7" />
    </template>
    <template #body>
      <div class="w-full text-center pb-4 text-xl font-bold">
        Login
      </div>
      <UForm
        id="login-form"
        :schema="loginSchema"
        :state="state"
        class="space-y-4"
        @submit="onLoginSubmit"
      >
        <UFormField
          label="Email"
          name="email"
        >
          <UInput
            v-model="state.email"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Password"
          name="password"
          class="w-full"
        >
          <UInput
            v-model="state.password"
            type="password"
            class="w-full"
          />
        </UFormField>

        <div>
          <ULink
            as="button"
            to="/forgot-password"
            active-class="text-default"
            class="font-semibold"
            @click="isLoginOpen = false"
          >Forgot password?</ULink>
        </div>

        <UButton
          :loading="loading"
          type="submit"
          label="Log in"
          form="login-form"
          class="w-full justify-center"
        />
      </UForm>
    </template>

    <template #footer>
      <div class="w-full items-center text-center justify-center">
        Don't have an account yet?
        <ULink
          class="text-primary"
          @click="isLoginOpen = false, isRegisterOpen = true"
        >
          Create account
        </ULink>
      </div>
    </template>
  </UModal>
</template>
