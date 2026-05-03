<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { categories } from '~/constants/categories'
import * as locales from '@nuxt/ui/locale'

useSeoMeta({
  title: 'Nuxt Carousell Clone',
  description: 'Nuxt Carousell Clone Practice',
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})

const router = useRouter()

const locale = ref('en')

const headerItems = categories

const user = useSupabaseUser()

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
    icon: 'i-lucide-user',
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
  <UApp>
    <UHeader
      toggle-side="left"
      :ui="{ root: 'h-auto', container: 'h-(--ui-header-height)' }"
    >
      <template #left>
        <NuxtLink
          to="/"
          class="shrink-0"
        >
          <AppLogo class="h-7 pr-4" />
        </NuxtLink>

        <UNavigationMenu
          :items="headerItems"
          content-orientation="vertical"
          class="hidden lg:flex justify-center"
          :ui="{
            linkLeadingIcon: 'hidden',
            viewport: 'min-w-10',
            content: 'p-1',
            childList: 'flex flex-col gap-1',
            childLinkIcon: 'hidden'
          }"
        />
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
        <div class="flex items-center gap-1">
          <div v-if="user">
            <UNavigationMenu
              :items="userItems"
              :ui="{
                viewport: 'min-w-48',
                content: 'w-48',
                childList: 'flex flex-col gap-1'
              }"
            >
              <template #account-label="{ item }">
                <span class="hidden sm:inline">{{ item.label }}</span>
              </template>
            </UNavigationMenu>
          </div>
          <div v-else>
            <AuthRegister />
            <AuthLogin />
          </div>
          <UButton
            loading-auto
            loading-icon="i-lucide-loader"
            label="Sell"
            @click="sellItem"
          />
        </div>
      </template>

      <template #bottom>
        <UContainer class="pb-3">
          <div class="flex items-center gap-1">
            <div class="flex-1 bg-neutral-100 dark:bg-neutral-800 p-1">
              <UInput
                icon="i-lucide-search"
                placeholder="Search for an item"
                variant="none"
                class="w-full"
              />
            </div>
            <div class="bg-neutral-100 dark:bg-neutral-800 p-1">
              <UButton
                variant="ghost"
                icon="i-lucide-map-pin"
              >
                Malaysia
              </UButton>
            </div>
            <div class="bg-neutral-100 dark:bg-neutral-800 p-1">
              <UButton color="primary">
                Search
              </UButton>
            </div>
          </div>
        </UContainer>
      </template>
    </UHeader>

    <UMain>
      <UContainer>
        <NuxtPage />
      </UContainer>
    </UMain>

    <USeparator
      type="solid"
      class="h-px"
    />

    <UFooter>
      <template #top>
        <UContainer>
          <img
            src="/carousell.svg"
            alt="Tailwind CSS"
          >
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
  </UApp>
</template>
