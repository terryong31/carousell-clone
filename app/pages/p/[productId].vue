<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import { faqItems } from '../../constants/faq'

definePageMeta({
  showSearch: true
})

const breadcrumb = ref<Array<BreadcrumbItem>>([
  {
    label: 'Home'
  },
  {
    label: 'Men\'s Fashion'
  },
  {
    label: 'Bottoms'
  },
  {
    label: 'Jeans'
  }
])

const itemData = {
  id: 'blablabla',
  images: [
    'https://media.karousell.com/media/photos/products/2026/6/10/uniqlo_selvedge_men_regular_st_1781100941_262a3a21_progressive.jpg',
    'https://media.karousell.com/media/photos/products/2026/6/10/uniqlo_selvedge_men_regular_st_1781100941_c476b452_progressive.jpg',
    'https://media.karousell.com/media/photos/products/2026/6/10/uniqlo_selvedge_men_regular_st_1781100941_5ff5e902_progressive.jpg',
    'https://media.karousell.com/media/photos/products/2026/6/10/uniqlo_selvedge_men_regular_st_1781100941_5ff5e902_progressive.jpg',
    'https://media.karousell.com/media/photos/products/2026/6/10/uniqlo_selvedge_men_regular_st_1781100941_61360e17_progressive.jpg',
    'https://media.karousell.com/media/photos/products/2026/6/10/uniqlo_selvedge_men_regular_st_1781100941_f18dab7e_progressive.jpg'
  ],
  name: 'UNIQLO Selvedge Men Regular Straight Fit Jeans. Waist 29. Fabric by Kaihara Japan',
  price: '69',
  buyerProtection: true,
  freeShipping: true,
  acceptOffer: true,
  likeCount: 7,
  details: {
    condition: 'Well used',
    size: 'Others',
    category: 'Jeans',
    brand: 'Uniqlo',
    timeListed: Date.now()
  },
  description: '* Harga termasuk pos untuk Semenanjung Malaysia.\n* Original & terpakai.\n* Fabric by Kaihara Japan.\n* Saiz : 29 - ukuran manual & saiz di tag adalah. \n* Length : 41".\n* Rise : 11.5".\n* Hip : 20.5".\n* Thigh : 11.5".\n* Leg opening : 7".\n* Material : 100% cotton.\n* Condition : 9/10 - jahitan semula yang kemas di peha kanan.',
  userFullName: 'Terry Ong',
  userName: '@terryong30',
  userPicUrl: 'https://i.pravatar.cc/150?u=john-doe',
  userRating: 4.5,
  userReviews: 503,
  deal: {
    westMalaysia: {
      method: 'Custom',
      daysToArrive: '3-5 days',
      cost: 0,
      tracked: true
    },
    eastMalaysia: {
      method: 'Custom',
      daysToArrive: '3-5 days',
      cost: 15.00,
      tracked: true
    },
    meetUp: {
      locationName: 'U.n.i Clinic KLTS',
      locationUrl: 'https://maps.app.goo.gl/xFeast1tNAKUZo2X6',
      cost: 0
    }
  }
}

const isDescriptionExpanded = ref(false)

const displayedDescription = computed(() => {
  if (isDescriptionExpanded.value) {
    return itemData.description
  }
  const lines = itemData.description.split('\n')
  if (lines.length <= 4) {
    return itemData.description
  }
  const collapsedLines = lines.slice(0, 4)
  const lastLine = collapsedLines[3]
  if (lastLine !== undefined) {
    collapsedLines[3] = lastLine.trimEnd() + ' ...'
  }
  return collapsedLines.join('\n')
})

const isDealMethodsExpanded = ref(false)

const dealMethods = computed(() => {
  return [
    {
      type: 'shipping',
      name: `${itemData.deal.westMalaysia.method} (West Malaysia)`,
      cost: itemData.deal.westMalaysia.cost,
      daysToArrive: itemData.deal.westMalaysia.daysToArrive,
      tracked: itemData.deal.westMalaysia.tracked
    },
    {
      type: 'shipping',
      name: `${itemData.deal.eastMalaysia.method} (East Malaysia)`,
      cost: itemData.deal.eastMalaysia.cost,
      daysToArrive: itemData.deal.eastMalaysia.daysToArrive,
      tracked: itemData.deal.eastMalaysia.tracked
    },
    {
      type: 'meetup',
      name: 'Meet-up',
      cost: itemData.deal.meetUp.cost,
      locationName: itemData.deal.meetUp.locationName,
      locationUrl: itemData.deal.meetUp.locationUrl
    }
  ]
})

const displayedDealMethods = computed(() => {
  if (isDealMethodsExpanded.value) {
    return dealMethods.value
  }
  const first = dealMethods.value[0]
  return first ? [first] : []
})

useSeoMeta({
  title: itemData.name
})
</script>

<template>
  <div>
    <div class="mt-6 mb-4">
      <UBreadcrumb :items="breadcrumb" />
    </div>

    <div class="my-4 flex flex-col gap-4">
      <div class="relative rounded-xl overflow-hidden">
        <div class="absolute top-2 right-2 z-10 flex gap-2">
          <UButton
            label="Share"
            icon="i-lucide-share"
            :ui="{
              base: 'bg-white text-black dark:bg-gray-800 dark:text-white'
            }"
          />
          <UButton
            :label="`${itemData.likeCount} Likes`"
            icon="i-lucide-heart"
            :ui="{
              base: 'bg-white text-black dark:bg-gray-800 dark:text-white'
            }"
          />
        </div>
        <div class="absolute bottom-2 right-2 z-10 flex gap-2">
          <UButton
            :label="`${itemData.images.length} Images`"
            icon="i-lucide-image"
            :ui="{
              base: 'bg-white text-black dark:bg-gray-800 dark:text-white'
            }"
          />
        </div>
        <UCarousel
          v-slot="{ item }"
          :align="'start'"
          arrows
          :items="itemData.images"
          loop
          wheel-gestures
          prev-icon="i-lucide-chevron-left"
          next-icon="i-lucide-chevron-right"
          :ui="{
            item: 'md:basis-1/3 ps-0',
            container: 'ms-0 gap-0',
            arrows: 'flex items-center justify-between pointer-events-none z-[1] absolute inset-0 -mx-8 sm:mx-14 md:mx-14 lg:mx-14',
            prev: 'pointer-events-auto rounded-full bg-white/90 dark:bg-neutral-900/80 shadow-lg text-neutral-900 dark:text-white p-2',
            next: 'pointer-events-auto rounded-full bg-white/90 dark:bg-neutral-900/80 shadow-lg text-neutral-900 dark:text-white p-2'
          }"
          class="w-full"
        >
          <img
            :src="item"
            class="w-full aspect-[16/13] object-cover"
            loading="lazy"
          >
        </UCarousel>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col gap-4">
          <div>
            <UButton
              v-if="itemData.buyerProtection"
              label="Buyer Protection"
              color="neutral"
              class="pointer-events-none cursor-default"
            />
          </div>
          <div>
            <h1>{{ itemData.name }}</h1>
          </div>
          <div>
            <h1>RM{{ itemData.price }}</h1>
          </div>
          <div
            v-if="itemData.freeShipping"
            class="flex gap-2"
          >
            <div class="flex justify-center items-center">
              <UIcon
                name="i-lucide-van"
                class="size-5"
              />
            </div>
            <div>Free Shipping</div>
          </div>
          <div class="flex gap-2">
            <div v-if="itemData.acceptOffer">
              <UButton
                label="Make Offer"
                variant="outline"
                color="neutral"
                size="xl"
                :ui="{
                  base: 'hover:text-green-600 hover:ring-green-600 hover:bg-0'
                }"
              />
            </div>
            <div>
              <UButton
                label="Chat"
                variant="outline"
                color="neutral"
                size="xl"
                :ui="{
                  base: 'hover:text-green-600 hover:ring-green-600 hover:bg-0'
                }"
              />
            </div>
          </div>
          <USeparator size="sm" />
          <div>
            <h2>Details</h2>
            <div class="flex flex-wrap">
              <div
                v-for="detail, category in itemData.details"
                :key="category"
                class="w-1/2 py-3"
              >
                <div>
                  <p class="text-sm text-gray-400">
                    {{ String(category).charAt(0).toUpperCase() + String(category).slice(1) }}
                  </p>
                  <div class="flex items-center gap-1">
                    <UModal
                      title="Condition"
                    >
                      <UButton
                        v-if="category=='condition'"
                        variant="link"
                        color="neutral"
                        :ui="{
                          base: 'p-0'
                        }"
                      >
                        <UIcon
                          v-if="category=='condition'"
                          class="size-4.5"
                          name="i-lucide-info"
                        />
                      </UButton>
                      <template #body>
                        Test
                      </template>
                    </UModal>
                    {{ detail }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2>Description</h2>
            <div class="whitespace-pre-line pt-3">
              <p>{{ displayedDescription }}</p>
              <button
                v-if="itemData.description.split('\n').length > 4"
                class="text-green-600 dark:text-green-500 font-semibold cursor-pointer block focus:outline-none"
                @click="isDescriptionExpanded = !isDescriptionExpanded"
              >
                {{ isDescriptionExpanded ? 'Read less' : 'Read more' }}
              </button>
            </div>
          </div>
          <USeparator size="sm" />
          <div>
            <h2>Deal method</h2>
            <div class="flex flex-col pt-4">
              <div
                v-for="(method, index) in displayedDealMethods"
                :key="index"
                class="w-150"
              >
                <USeparator
                  v-if="index > 0"
                  class="w-150 my-8"
                  size="sm"
                />

                <div class="flex justify-between">
                  <p class="font-semibold text-neutral-900 dark:text-white">
                    {{ method.name }}
                  </p>
                  <p class="font-semibold text-neutral-900 dark:text-white">
                    {{ method.cost === 0 ? 'Free' : `RM${method.cost.toFixed(2)}` }}
                  </p>
                </div>

                <div
                  v-if="method.type === 'shipping'"
                  class="pt-2 text-sm text-neutral-500 dark:text-neutral-400"
                >
                  <p>
                    {{ method.daysToArrive }}
                    <span v-if="method.tracked"> • Tracked</span>
                  </p>
                </div>

                <div
                  v-if="method.type === 'meetup' && method.locationName"
                  class="pt-2"
                >
                  <ULink
                    :to="method.locationUrl"
                    target="_blank"
                    class="text-green-600 dark:text-green-500 text-sm underline hover:underline font-semibold"
                  >
                    {{ method.locationName }}
                  </ULink>
                </div>
              </div>

              <button
                class="text-green-600 dark:text-green-500 font-semibold cursor-pointer block mt-6 focus:outline-none text-left w-fit"
                @click="isDealMethodsExpanded = !isDealMethodsExpanded"
              >
                {{ isDealMethodsExpanded ? 'Read less' : 'Read more' }}
              </button>
            </div>
          </div>
          <USeparator size="sm" />
          <div>
            <UModal title="FAQ">
              <div class="flex h-12 items-center hover:cursor-pointer">
                <div><h1>FAQ</h1></div>
                <div class="ml-auto">
                  <UIcon name="i-lucide-chevron-right" />
                </div>
              </div>

              <template #body>
                <UAccordion :items="faqItems" />
                <USeparator />
                <div class="flex pt-6">
                  <h3>More Questions?</h3>
                  <div class="ml-auto">
                    <UButton
                      label="Chat with Seller"
                      variant="outline"
                      color="neutral"
                      :ui="{
                        base: 'hover:ring-green-600 hover:text-green-600 hover:bg-neutral transition-none'
                      }"
                    />
                  </div>
                </div>
              </template>
            </UModal>
          </div>
          <USeparator size="sm" />
          <div>
            Seller details
          </div>
        </div>
        <div class="ml-auto w-96">
          <UCard
            variant="subtle"
          >
            <div class="flex flex-col px-6 py-4 gap-6">
              <div>
                <UUser
                  :name="`${itemData.userFullName} ${itemData.userName}`"
                  :avatar="{ src: itemData.userPicUrl }"
                  size="xl"
                >
                  <template #description>
                    <div class="flex items-center gap-1 text-xs">
                      <span>{{ itemData.userRating }}</span>
                      <div class="flex items-center">
                        <UIcon
                          v-for="star in 5"
                          :key="star"
                          :name="star <= Math.floor(Math.round(itemData.userRating * 2) / 2)
                            ? 'i-material-symbols-star'
                            : (star - 0.5 <= Math.round(itemData.userRating * 2) / 2 ? 'i-material-symbols-star-half' : 'i-material-symbols-star-outline')"
                          class="size-3.5"
                          :class="star - 0.5 <= Math.round(itemData.userRating * 2) / 2 ? 'text-green-600' : 'text-neutral-300 dark:text-neutral-700'"
                        />
                      </div>
                      <span>({{ itemData.userReviews }} reviews)</span>
                    </div>
                  </template>
                </UUser>
              </div>
              <div>
                <UButton
                  label="Buy"
                  class="w-full h-9 justify-center text-white font-bold"
                />
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-refresh-cw"
                    class="size-4.5"
                  /><p class="text-sm font-bold">
                    Returns
                  </p>
                </div>
                <div class="pt-2">
                  <p class="text-sm">
                    Eligible for return/refund if the item doesn’t arrive, is damaged during delivery, or is not as described. <ULink
                      to="/policy/returns"
                      class="text-green-600 hover:text-green-600"
                    >Learn more</ULink>
                  </p>
                </div>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-lock-keyhole"
                    class="size-4.5"
                  /><p class="text-sm font-bold">
                    Risk-free payment
                  </p>
                </div>
                <div class="py-2">
                  <div class="flex gap-2">
                    <img
                      src="/visa.svg"
                      class="h-6 w-12 border border-neutral-200 dark:border-neutral-800 rounded bg-white px-1 py-0.5 object-contain"
                      alt="Visa"
                    >
                    <img
                      src="/mastercard.svg"
                      class="h-6 w-12 border border-neutral-200 dark:border-neutral-800 rounded bg-white px-1 py-0.5 object-contain"
                      alt="Mastercard"
                    >
                    <img
                      src="/fpx.svg"
                      class="h-6 w-12 border border-neutral-200 dark:border-neutral-800 rounded bg-white px-1 py-0.5 object-contain"
                      alt="FPX"
                    >
                    <img
                      src="/grabpay.svg"
                      class="h-6 w-12 border border-neutral-200 dark:border-neutral-800 rounded bg-white px-1 py-0.5 object-contain"
                      alt="GrabPay"
                    >
                  </div>
                </div>
                <p class="text-sm">
                  We only release your payment to the seller after you receive the item. <ULink
                    to="/policy/payments"
                    class="text-green-600 hover:text-green-600"
                  >Learn more</ULink>
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
