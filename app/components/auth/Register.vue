<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const { signUp } = useAuth()

const toast = useToast()

const state = reactive<Partial<RegisterSchema>>({
  email: undefined,
  password: undefined
})

const loading = ref(false)

async function onRegisterSubmit(_event: FormSubmitEvent<RegisterSchema>) {
  if (state.email && state.password && state.name) {
    loading.value = true
    try {
      const { data, error } = await signUp(state.email, state.password, state.name)
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

const isRegisterOpen = ref(false)
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    @click="isRegisterOpen = true"
  >
    Register
  </UButton>

  <UModal
    v-model:open="isRegisterOpen"
    title="Sign Up"
    :ui="{ content: 'sm:max-w-sm' }"
  >
    <template #body>
      <UForm
        id="register-form"
        :schema="registerSchema"
        :state="state"
        class="space-y-4"
        @submit="onRegisterSubmit"
      >

        <UFormField
          label="Display Name"
          name="name"
        >
          <UInput
            v-model="state.name"
            class="w-full"
          />
        </UFormField>

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
      </UForm>
    </template>

    <template #footer>
      <UButton
        :loading="loading"
        type="submit"
        label="Submit"
        form="register-form"
      />
      <UButton
        color="neutral"
        label="Dismiss"
        @click="isRegisterOpen = false"
      />
    </template>
  </UModal>
</template>
