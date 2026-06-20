<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

import { categories } from '~/constants/categories'

const showSellHeader = useState('showSellHeader')

const router = useRouter()

const user = useSupabaseUser()

const route = useRoute()

const locale = ref('en')

const headerItems = categories

const navContainerRef = ref<HTMLElement | null>(null)
const maxVisibleItems = ref(categories.length)
const visibleHeaderItems = computed(() => categories.slice(0, maxVisibleItems.value))

let isMeasuring = false

const checkNavOverflow = async () => {
  const container = navContainerRef.value
  if (!container || isMeasuring) return
  isMeasuring = true

  // Render every category first so we can measure the they truly need.
  maxVisibleItems.value = categories.length
  await nextTick()

  const ul = container.querySelector('ul')
  if (ul) {
    // Drop categories from the right one at a time while the row overflows,
    // i.e. while the "All Categories" button would overlap the last item.
    let count = categories.length
    while (count > 0 && ul.scrollWidth > container.clientWidth) {
      count--
      maxVisibleItems.value = count
      await nextTick()
    }

    // Never leave a single lonely category: the moment the button reaches the
    // second item, collapse everything into the "All Categories" drawer.
    if (count === 1) {
      count = 0
      maxVisibleItems.value = 0
    }
  }

  isMeasuring = false
}

onMounted(() => {
  let frame = 0
  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(checkNavOverflow)
  })
  if (navContainerRef.value) {
    observer.observe(navContainerRef.value)
  }
  onUnmounted(() => {
    cancelAnimationFrame(frame)
    observer.disconnect()
  })
})

async function sellItem() {
  router.push('/sell')
}

const footerInfoUrls = [
  {
    label: 'Help Center',
    redirectUrl: 'https://support.carousell.com/hc/en-us?origin=web&platform=web'
  },
  {
    label: 'Contact Us',
    redirectUrl: 'https://support.carousell.com/hc/en-us/requests/new?open_chat_bot=true&origin=web&platform=web'
  },
  {
    label: 'Press',
    redirectUrl: 'https://press.carousell.com/'
  },
  {
    label: 'Sustainability',
    redirectUrl: 'https://carousell.com/sustainability/l/'
  },
  {
    label: 'Jobs',
    redirectUrl: 'https://careers.carousell.com/'
  },
  {
    label: 'Advertise with Us',
    redirectUrl: 'https://docs.google.com/forms/d/1ZhprlP1FZ7Jk55RqlkAnT6YcV9DTDUoFM1gLCM59L6A/'
  },
  {
    label: 'Terms',
    redirectUrl: 'https://support.carousell.com/hc/en-us/articles/360038207054'
  },
  {
    label: 'Privacy',
    redirectUrl: 'https://support.carousell.com/hc/en-us/articles/360016106213'
  },
  {
    label: 'Business Conduct',
    redirectUrl: 'https://support.carousell.com/hc/en-us/articles/45022750135449-Third-Party-Code-of-Business-Conduct-and-Ethics'
  }
]
</script>

<template>
  <div>
    <!-- Main Content Here Below -->
    <UBanner
      v-if="route.meta.showBanner"
      id="ticket-scam"
      color="neutral"
      icon="i-lucide-triangle-alert"
      title="Stay safe from ticket scams. Let’s stay safe together and avoid fake sellers when buying concert tickets."
    />
    <div>
      <UHeader
        :toggle="false"
        :ui="{
          root: 'h-auto',
          container: 'h-(--ui-header-height)',
          left: 'flex-1 min-w-0',
          right: 'flex-none lg:flex-none'
        }"
      >
        <template #left>
          <NuxtLink
            to="/"
            class="shrink-0"
          >
            <AppLogo
              class="h-8 pr-4"
              :class="{ 'hidden sm:inline-block': user }"
            />
            <div
              v-if="user"
              class="sm:hidden"
            >
              <NuxtImg
                src="/carousell-header-logo.svg"
                class="h-8"
              />
            </div>
          </NuxtLink>

          <div
            ref="navContainerRef"
            class="hidden lg:flex flex-1 min-w-0 items-center"
          >
            <UNavigationMenu
              :items="visibleHeaderItems"
              content-orientation="vertical"
              class="whitespace-nowrap"
              :ui="{
                link: 'text-default flex items-center justify-center py-2',
                linkLeadingIcon: 'hidden',
                linkTrailingIcon: 'hidden',
                viewport: 'min-w-10',
                content: 'p-1',
                childList: 'flex flex-col gap-1',
                childLinkIcon: 'hidden'
              }"
            />
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
            <!-- Full "All Categories" label from md up, collapses to just the
                 grid icon below md. -->
            <HeaderCategories
              class="hidden md:block"
              :show-label="true"
            />
            <HeaderCategories
              class="md:hidden"
              :show-label="false"
            />
            <div
              v-if="user"
              class="flex items-center gap-1"
            >
              <HeaderProfile
                class="hidden lg:block"
                :show-details="true"
                :user-display-name="user.user_metadata?.display_name"
                :username="user.email?.split('@')[0]"
                :user-profile-pic="user?.user_metadata?.avatar_url"
              />
              <UButton
                icon="i-lucide-heart"
                variant="ghost"
                color="neutral"
              />
              <UButton
                icon="i-lucide-shopping-cart"
                variant="ghost"
                color="neutral"
              />
              <UButton
                icon="i-lucide-bell"
                variant="ghost"
                color="neutral"
              />
              <UButton
                icon="i-lucide-message-circle"
                variant="ghost"
                color="neutral"
              />
              <HeaderProfile
                class="lg:hidden !px-0 !py-0"
                :show-details="false"
                :user-display-name="user.user_metadata?.display_name"
                :username="user.email?.split('@')[0]"
                :user-profile-pic="user?.user_metadata?.avatar_url"
              />
            </div>
            <div
              v-else
              class="flex items-center"
            >
              <AuthRegister />
              <AuthLogin />
            </div>
            <div
              class="fixed bottom-5 right-5 z-50
                    md:relative md:bottom-auto md:right-auto"
            >
              <UButton
                loading-auto
                loading-icon="i-lucide-loader"
                class="font-bold text-white rounded-full md:rounded-md text-lg py-2.5 px-4 md:px-2.5 md:py-1.5 md:text-sm"
                @click="sellItem"
              >
                <UIcon
                  name="i-lucide-plus"
                  class="md:hidden inline-block"
                />Sell
              </UButton>
            </div>
          </div>
        </template>

        <template #bottom>
          <HeaderSearch v-if="route.meta.showSearch" />
          <HeaderSell v-if="showSellHeader" />
        </template>
      </UHeader>

      <slot />

      <USeparator
        type="dashed"
      />

      <UFooter>
        <template
          v-if="route.meta.showFooter"
          #top
        >
          <UContainer>
            <FooterProduct />
          </UContainer>
        </template>
        <template #left>
          <div class="flex gap-4">
            <p class="text-xs">
              Mudah.my Sdn Bhd<br>[200701024583 (782603-V)]<br>a Carousell Group company
            </p>
            <USeparator
              orientation="vertical"
              class="h-auto self-stretch"
              size="sm"
            />
          </div>
        </template>

        <div class="flex items-center flex-1 pl-4 pr-2 min-w-0">
          <div class="flex flex-wrap items-center gap-y-1">
            <template
              v-for="({ label, redirectUrl }, index) in footerInfoUrls"
              :key="label"
            >
              <ULink
                :to="redirectUrl"
                target="_blank"
                class="text-xs"
              >
                {{ label }}
              </ULink>
              <span
                v-if="index < footerInfoUrls.length - 1"
                class="mx-1 text-xs text-neutral-500"
              >•</span>
            </template>
          </div>
        </div>

        <template #right>
          <div class="flex items-center gap-2 mr-4">
            <UIcon
              name="i-circle-flags-au"
              class="size-5"
            />
            <UIcon
              name="i-circle-flags-ca"
              class="size-5"
            />
            <UIcon
              name="i-circle-flags-hk"
              class="size-5"
            />
            <UIcon
              name="i-circle-flags-id"
              class="size-5"
            />
            <UIcon
              name="i-circle-flags-my"
              class="size-5"
            />
            <UIcon
              name="i-circle-flags-nz"
              class="size-5"
            />
            <UIcon
              name="i-circle-flags-ph"
              class="size-5"
            />
            <UIcon
              name="i-circle-flags-sg"
              class="size-5"
            />
            <UIcon
              name="i-circle-flags-tw"
              class="size-5"
            />
          </div>
          <ULocaleSelect
            v-model="locale"
            :locales="Object.values(locales)"
            class="w-40"
          />
          <UColorModeSelect />
        </template>
      </UFooter>
    </div>
  </div>
</template>
