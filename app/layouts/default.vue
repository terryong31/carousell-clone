<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

import { categories } from '~/constants/categories'

const showSellHeader = useState('showSellHeader')

const router = useRouter()

const user = useSupabaseUser()

const route = useRoute()

const locale = ref('en')

const headerItems = categories

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

const acknowledged = useCookie('disclaimer-acknowledged', { default: () => false })

const disclaimerModal = ref(!acknowledged.value)
</script>

<template>
  <div>
    <!-- Disclaimer Modal -->
    <UModal
      v-model:open="disclaimerModal"
      :dismissible="false"
      title="Disclaimer"
      :close="false"
    >
      <template #body>
        <div>
          <p>
            By using this site, I acknowledge that this website is not official Carousell's website but a clone made by <ULink
              target="_blank"
              to="https://github.com/terryong31"
            >Terry Ong</ULink> to showcase his web development skills for portfolio purposes
          </p>
        </div>
      </template>
      <template #footer>
        <div class="flex items-center justify-end gap-4">
          <UButton
            label="I acknowledge"
            @click="
              disclaimerModal = false,
              acknowledged = true"
          />
          <ULink
            to="https://carousell.com"
            class="text-sm"
          >Go to Carousell Website</ULink>
        </div>
      </template>
    </UModal>

    <!-- Main Content Here Below -->
    <UBanner
      id="disclaimer"
      icon="i-lucide-circle-alert"
      title="WARNING! THIS IS NOT CAROUSELL'S OFFICIAL WEBSITE, ITS A CLONE FOR DEVELOPER PORTFOLIO PURPOSES! CREATED BY TERRY ONG"
      close
    />

    <div>
      <UHeader
        :toggle="false"
        :ui="{
          root: 'h-auto',
          container: 'h-(--ui-header-height)'
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
              <img
                src="/carousell-header-logo.svg"
                class="h-8"
              >
            </div>
          </NuxtLink>

          <UNavigationMenu
            :items="headerItems"
            content-orientation="vertical"
            class="hidden lg:flex justify-center"
            :ui="{
              link: 'text-default',
              linkLeadingIcon: 'hidden',
              linkTrailingIcon: 'hidden',
              viewport: 'min-w-10',
              content: 'p-1',
              childList: 'flex flex-col gap-1',
              childLinkIcon: 'hidden'
            }"
          />

          <div>
            <HeaderCategories
              class="hidden xl:block"
              :show-label="true"
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
            <div
              v-if="user"
              class="flex items-center gap-1"
            >
              <HeaderCategories
                :show-label="false"
                class="md:hidden"
              />
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
              <HeaderCategories
                :show-label="false"
                class="sm:hidden"
              />
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
        <template #left>
          <div class="flex gap-4">
            <p>Mudah.my Sdn Bhd<br>[200701024583 (782603-V)]<br>a Carousell Group company</p>
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
                class="text-xs font-semibold"
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
