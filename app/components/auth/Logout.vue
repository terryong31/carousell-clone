<script setup lang="ts">
const { signOut } = useAuth()

const toast = useToast()

const isLogoutOpen = defineModel<boolean>('open')

const loading = ref(false)

const handleLogout = async () => {
  loading.value = true
  const { error } = await signOut()
  if (error) {
    toast.add({ title: 'Sign out failed', description: error.message, color: 'error' })
  } else {
    loading.value = false
    toast.add({ title: 'Signed out', description: 'See you again!', color: 'success' })
    isLogoutOpen.value = false
    navigateTo('/')
  }
}
</script>

<template>
  <UModal
    v-model:open="isLogoutOpen"
    title="Sign Out"
    description="Are you sure you want to sign out?"
  >
    <template #footer>
      <div class="flex gap-2">
        <UButton
          color="neutral"
          label="Dismiss"
          @click="isLogoutOpen = false"
        />
        <UButton
          color="error"
          label="Sign Out"
          loading-auto
          :loading="loading"
          @click="handleLogout"
        />
      </div>
    </template>
  </UModal>
</template>
