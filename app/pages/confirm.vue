<script setup lang="ts">
const router = useRouter()

const user = useSupabaseUser()

const status = ref('loading')

watchEffect(() => {
  if (user.value) {
    status.value = 'success'
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }
})
</script>

<template>
  <UModal
    :dismissible="false"
    :open="true"
  >
    <template #content>
      <div
        v-if="status === 'loading'"
        class="flex flex-col items-center justify-center py-20 gap-4"
      >
        <UIcon
          name="i-lucide-loader"
          class="size-8 animate-spin text-primary"
        />
        <p>Confirming your account... please wait.</p>
      </div>

      <div
        v-if="status === 'success'"
        class="flex flex-col items-center justify-center py-20 gap-4"
      >
        <UIcon
          name="i-lucide-check"
          class="size-8 text-primary"
        />
        <p>Your email has been confirmed! Redirecting...</p>
      </div>
    </template>
  </UModal>
</template>
