<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { registerSchema } from '~/utils/auth'

const { signUp } = useAuth()

const toast = useToast()

const isLoginOpen = useState('auth-login-modal', () => false)

const isRegisterOpen = useState('auth-register-modal', () => false)

const loading = ref(false)

async function onRegisterSubmit(event: FormSubmitEvent<RegisterSchema>) {
  if (event.data.email && event.data.password && event.data.name) {
    loading.value = true
    try {
      const { data, error } = await signUp(event.data.email, event.data.password, event.data.name)
      if (error) {
        toast.add({ title: 'Register Failed', description: '' + error, color: 'error' })
        return
      } else {
        toast.add({ title: 'Register Successful', description: 'Your account has been registered successfully. Check your email to confirm it.', color: 'success' })
        isRegisterOpen.value = false
        console.log(data)
        return
      }
    } finally {
      loading.value = false
    }
  }
}

const props = withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Register'
})

const fields = [{
  name: 'name',
  type: 'text',
  label: 'Display Name',
  placeholder: 'Enter your display name'
}, {
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
</script>

<template>
  <UButton
    v-bind="$attrs"
    :label="props.label"
    color="neutral"
    class="font-bold"
    variant="ghost"
    @click="isRegisterOpen = true"
  />

  <UModal
    v-model:open="isRegisterOpen"
    :ui="{ content: 'sm:max-w-sm' }"
  >
    <template #title>
      <AppLogo class="h-7" />
    </template>

    <template #body>
      <UAuthForm
        :fields="fields"
        :schema="registerSchema"
        :loading="loading"
        title="Create account"
        align="top"
        @submit="onRegisterSubmit"
      >
        <template #submit-button>
          <UButton
            :loading="loading"
            type="submit"
            label="Sign up"
            class="w-full justify-center"
          />
        </template>
        <template #validation>
          <div class="text-sm">
            To ensure a safe community, Carousellers have to verify their email. A verification email will be sent to your inbox.
          </div>
        </template>
      </UAuthForm>
    </template>

    <template #footer>
      <div class="w-full items-center text-center justify-center">
        Already have an account?
        <ULink
          class="text-primary"
          @click="isRegisterOpen = false, isLoginOpen = true"
        >
          Login
        </ULink>
      </div>
    </template>
  </UModal>
</template>
