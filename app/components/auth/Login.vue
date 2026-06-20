<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { loginSchema } from '~/utils/auth'

const { signIn } = useAuth()

const toast = useToast()

const isLoginOpen = useState('auth-login-modal', () => false)

const isRegisterOpen = useState('auth-register-modal', () => false)

const loading = ref(false)

const fields = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email'
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password'
}]

async function onLoginSubmit(event: FormSubmitEvent<LoginSchema>) {
  if (event.data.email && event.data.password) {
    loading.value = true
    try {
      const { data, error } = await signIn(event.data.email, event.data.password)
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
      <UAuthForm
        :fields="fields"
        :schema="loginSchema"
        :loading="loading"
        title="Login"
        align="top"
        @submit="onLoginSubmit"
      >
        <template #password-hint>
          <ULink
            as="button"
            to="/forgot-password"
            active-class="text-default"
            class="font-semibold text-primary"
            @click="isLoginOpen = false"
          >Forgot password?</ULink>
        </template>
        <template #submit-button>
          <UButton
            :loading="loading"
            type="submit"
            label="Log in"
            class="w-full justify-center"
          />
        </template>
      </UAuthForm>
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
