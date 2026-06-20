<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { passwordResetSchema } from '~/utils/auth'

const { resetPassword } = useAuth()

const loading = ref(false)

const router = useRouter()

const route = useRoute()

const toast = useToast()

const state = reactive<Partial<PasswordResetSchema>>({
  password: undefined
})

onMounted(() => {
  if (route.query.error) {
    toast.add({
      title: 'Access Denied',
      description: route.query.error_description as string,
      color: 'error'
    })
    router.push('/')
  }
})

async function onPasswordSubmit(_event: FormSubmitEvent<PasswordResetSchema>) {
  loading.value = true
  if (state.password) {
    try {
      const result = await resetPassword(state.password)
      if (result.error) {
        toast.add({
          title: 'Unable to Change Password',
          description: 'Please try again',
          color: 'error'
        })
      } else {
        toast.add({
          title: 'Password Changed Successfully!',
          description: 'Your password has been changed successfully',
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
    v-if="!route.query.error"
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
          Change Password
        </p>
        <p class="pb-8">
          Enter the new password for your account
        </p>
        <UForm
          ref="form"
          :state="state"
          :schema="passwordResetSchema"
          @submit="onPasswordSubmit"
        >
          <div>
            <UFormField
              name="password"
              label="New Password"
            >
              <UInput
                v-model="state.password"
                type="password"
                placeholder="........"
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
              Submit
            </UButton>
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
