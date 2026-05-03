<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const { signIn } = useAuth()

const toast = useToast()

const state = reactive<Partial<LoginSchema>>({
  email: undefined,
  password: undefined
})

const isLoginOpen = ref(false)

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
    color="neutral"
    variant="ghost"
    @click="isLoginOpen = true"
  >
    Login
  </UButton>

  <UModal
    v-model:open="isLoginOpen"
    title="Login"
    :ui="{ content: 'sm:max-w-sm' }"
  >
    <template #body>
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

        <ULink
          as="button"
          to="/forgot-password"
          @click="isLoginOpen = false"
          active-class="text-default"
        >Forgot password?</ULink>
      </UForm>
    </template>

    <template #footer>
      <UButton
        :loading="loading"
        type="submit"
        label="Submit"
        form="login-form"
      />
      <UButton
        color="neutral"
        label="Dismiss"
        @click="isLoginOpen = false"
      />
    </template>
  </UModal>
</template>
