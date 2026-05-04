<script setup lang="ts">

import * as locales from '@nuxt/ui/locale'

import type { NavigationMenuItem } from '@nuxt/ui'

import { categories } from '~/constants/categories'

const router = useRouter()

const route = useRoute()

const user = useSupabaseUser()

const locale = ref('en')

const headerItems = categories

const isDrawerOpen = ref(false)

const footerDefaultItems = computed<Array<NavigationMenuItem>>(() => [
  {
    label: 'About',
    to: '/about',
    target: '_blank'
  },
  {
    label: 'Contact Us',
    to: '/contact',
    target: '_blank'
  }
])

async function sellItem() {
  router.push('/sell')
}

const isLogoutOpen = ref(false)

const userItems = computed(() => [
  {
    label: 'Hello, ' + user.value?.user_metadata?.display_name || 'Account',
    ui: {
      linkLabel: 'hidden sm:block', 
      linkTrailing: 'hidden sm:block'
    },
    slot: 'account',
    children: [
      {
        label: 'Profile',
        icon: 'i-lucide-user',
        to: '/u/' + user.value?.email?.split('@')[0]
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
  <UHeader
    toggle-side="left"
    :ui="{ root: 'h-auto', container: 'h-(--ui-header-height)' }"
  >
    <template #left>
      <NuxtLink
        to="/"
        class="shrink-0"
      >
        <AppLogo class="h-7 md:h-8 pr-4" />
      </NuxtLink>

      <UNavigationMenu
        :items="headerItems"
        content-orientation="vertical"
        class="hidden lg:flex justify-center"
        :ui="{
          linkLeadingIcon: 'hidden',
          linkTrailingIcon: 'hidden',
          viewport: 'min-w-10',
          content: 'p-1',
          childList: 'flex flex-col gap-1',
          childLinkIcon: 'hidden'
        }"
      />
      <div class="relative z-10 hidden xl:block">
        <UDrawer direction="right" :handle="false">
          <UButton label="All Categories" color="neutral" variant="ghost" icon="i-lucide-layout-grid" />
            <template #header>
              <div class="flex items-center justify-between gap-4 mb-4">
                <h2>All Categories</h2>

                <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="isDrawerOpen = false" />
              </div>
            </template>
            <template #body>
              <Placeholder class="size-full min-h-48" />
              blablabla
            </template>
        </UDrawer>
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :items="headerItems"
        orientation="vertical"
        :ui="{
          childList: 'flex flex-col gap-1'
        }"
      />
    </template>

    <template #right>
      <div class="flex items-center gap-2">
        <div v-if="user" class="flex items-center gap-1">
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
                  :src="user?.user_metadata?.avatar_url" 
                  :alt="user?.user_metadata?.display_name" 
                  size="sm"
                />
                <span class="hidden sm:inline">Hello, <span class="font-bold">{{ user?.user_metadata?.display_name || 'Account' }}</span></span>
              </div>
            </template>
          </UNavigationMenu>
          <UButton icon="i-lucide-heart" variant="ghost" color="neutral"></UButton>
          <UButton icon="i-lucide-shopping-cart" variant="ghost" color="neutral"></UButton>
          <UButton icon="i-lucide-bell" variant="ghost" color="neutral"></UButton>
          <UButton icon="i-lucide-message-circle" variant="ghost" color="neutral"></UButton>
        </div>
        <div v-else>
          <AuthRegister />
          <AuthLogin />
        </div>
        <UButton
          loading-auto
          loading-icon="i-lucide-loader"
          label="Sell"
          class="font-bold text-white"
          @click="sellItem"
        />
      </div>
    </template>

    <template #bottom v-if="route.meta.showSearch">
      <HeaderSearch />
    </template>

    <template #bottom v-if="route.meta.showSell">
      <HeaderSell />
    </template>
  </UHeader>

  <slot />
  
  <USeparator
    type="solid"
    class="h-px"
  />

  <UFooter>
    <template #top>
      <UContainer>
        <AppLogo />
      </UContainer>
    </template>

    <template #left>
      <div>
        <p>Mudah.my Sdn Bhd<br>[200701024583 (782603-V)]<br>a Carousell Group company</p>
      </div>
    </template>

    <UNavigationMenu
      :items="footerDefaultItems"
      variant="link"
    />

    <template #right>
      <UColorModeSelect />
      <ULocaleSelect
        v-model="locale"
        :locales="Object.values(locales)"
        class="w-48"
      />
    </template>
  </UFooter>
  <AuthLogout v-model:open="isLogoutOpen" />
</template>