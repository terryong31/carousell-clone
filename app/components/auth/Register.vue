<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const { signUp } = useAuth()

const toast = useToast()

const isLoginOpen = useState('auth-login-modal', () => false)

const isRegisterOpen = useState('auth-register-modal', () => false)

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

const props = withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Register'
})
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
      <div class="w-full text-center pb-4 text-xl font-bold">
        Create acoount
      </div>

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
        <div class="text-sm text-justify">
          To ensure a safe community, Carousellers have to verify their email. A verification email will be sent to your inbox.
        </div>
        <div>
          <UButton
            :loading="loading"
            type="submit"
            label="Sign up"
            form="register-form"
            class="w-full justify-center"
          />
        </div>
      </UForm>
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
