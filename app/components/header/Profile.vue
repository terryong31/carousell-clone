<script setup lang="ts">
const props = defineProps<{
  userDisplayName?: string
  username?: string
  userProfilePic?: string
  showDetails?: boolean
}>()

const isLogoutOpen = ref(false)

const userItems = computed(() => [
  {
    label: 'Hello, ' + props.userDisplayName,
    ui: {
      linkTrailing: props.showDetails ? '' : 'hidden'
    },
    slot: 'account',
    children: [
      {
        label: 'Profile',
        icon: 'i-lucide-user',
        to: '/u/' + props.username
      },
      {
        label: 'Sign Out',
        icon: 'i-lucide-log-out',
        onSelect: () => isLogoutOpen.value = true
      }
    ]
  }
])
</script>

<template>
  <div>
    <UNavigationMenu
      :items="userItems"
      :ui="{
        viewport: 'min-w-48',
        content: 'w-48',
        childList: 'flex flex-col gap-1'
      }"
    >
      <template #account-label>
        <div class="flex items-center gap-2">
          <UAvatar
            :src="props.userProfilePic"
            :alt="props.userDisplayName"
            size="sm"
          />
          <span v-if="props.showDetails">Hello, <span class="font-bold">{{ props.userDisplayName }}</span></span>
        </div>
      </template>
    </UNavigationMenu>
    <AuthLogout v-model:open="isLogoutOpen" />
  </div>
</template>