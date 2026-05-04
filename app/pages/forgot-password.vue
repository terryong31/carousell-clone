<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const { sendResetPasswordLink } = useAuth()

const loading = ref(false)

const router = useRouter()

const toast = useToast()

const state = reactive<Partial<ResetSchema>>({
  email: undefined
})

async function onResetSubmit(_event: FormSubmitEvent<ResetSchema>) {
  loading.value = true
  if (state.email) {
    try {
      const result = await sendResetPasswordLink(state.email)
      if (result.error) {
        toast.add({
          title: 'Reset Link Sent Failed',
          description: 'A error has occured. Please try again later',
          color: 'error'
        })
      } else {
        toast.add({
          title: 'Password Reset Link Sent',
          description: 'A password reset link has been sent to ' + state.email + ', check your inbox',
          color: 'success'
        })
        router.push('/')
      }
    } finally {
      loading.value = false
    }
  }
}
</script>

<template>
  <UModal
    :transition="false"
    :content="{ onOpenAutoFocus: (e) => e.preventDefault() }"
    :open="true"
    :dismissible="false"
    class="p-12"
    :ui="{ overlay: 'bg-default' }"
  >
    <template #content>
      <div class="flex flex-col justify-center items-center">
        <AppLogo class="h-8 mb-8" />
        <p class="text-xl font-bold pb-2">
          Reset Password
        </p>
        <p class="pb-8">
          Enter the email address of your account
        </p>
        <UForm
          ref="form"
          :state="state"
          :schema="resetSchema"
          @submit="onResetSubmit"
        >
          <div>
            <UFormField
              name="email"
              label="Your Email"
            >
              <UInput
                v-model="state.email"
                placeholder="example@gmail.com"
                :ui="{
                  root: 'w-72'
                }"
              />
            </UFormField>
          </div>
          <div class="pt-6 text-center">
            <UButton
              :loading="loading"
              type="submit"
            >
              Send a password reset link
            </UButton>
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
