<script setup lang="ts">
import { SELL_CATEGORIES, isBuyCategory, categoryRootLabel, type SellCategory } from '~/constants/sell-categories'
import type { GeocodeResult } from '~~/server/api/geocode.get'

const imageUploaded = computed(() => images.value.length > 0)

const user = useSupabaseUser()

const showSellHeader = useState('showSellHeader', () => false)

const images = ref<File[]>([])

watch(images, (newImages) => {
  showSellHeader.value = newImages.length > 0
})

onUnmounted(() => {
  showSellHeader.value = false
})

const selectedCategory = ref<SellCategory | null>(null)
const categoryOpen = ref(false)

// Shared state with <AuthLogin> (mounted in the header when logged out)
const isLoginOpen = useState('auth-login-modal', () => false)

function onSelectCategory(node: SellCategory) {
  selectedCategory.value = node
  categoryOpen.value = false
}

function onCategoryClick() {
  categoryOpen.value = !categoryOpen.value
}

// Form is visible to everyone; prompt login the moment a logged-out user
// tries to interact with any field.
function requireAuth(event: Event) {
  if (user.value) return
  event.preventDefault()
  event.stopPropagation()
  ;(event.target as HTMLElement | null)?.blur?.()
  isLoginOpen.value = true
}

// Buy-enabled categories support in-app checkout; the rest are deal-only
const isBuy = computed(() =>
  selectedCategory.value ? isBuyCategory(selectedCategory.value.value) : false
)

// About the item
type Condition = 'new' | 'like_new' | 'good' | 'fair' | 'poor'
const title = ref('')
const condition = ref<Condition>()
const brand = ref('')
const priceType = ref<'sale' | 'free'>('sale')
const price = ref<number>()
const fixedPrice = ref(false)
const preorder = ref(false)
const description = ref('')

// Optional details (non-buy)
const showOptional = ref(false)
const multiQuantity = ref(false)

// Deal methods / payment
const dealMeetup = ref(false)
const meetupLocation = ref<GeocodeResult | null>(null)
const showMeetupNotes = ref(false)
const meetupNotes = ref('')
const deliveryEnabled = ref(false)
const buyButtonEnabled = ref(true)

const conditionOptions = [
  { label: 'New', value: 'new' as const },
  { label: 'Used', value: 'good' as const }
]
const buyConditionOptions = [
  { label: 'Brand new', value: 'new' as const },
  { label: 'Like new', value: 'like_new' as const },
  { label: 'Lightly used', value: 'good' as const },
  { label: 'Well used', value: 'fair' as const },
  { label: 'Heavily used', value: 'poor' as const }
]
const priceOptions = [
  { label: 'For Sale', value: 'sale' as const },
  { label: 'For Free', value: 'free' as const }
]

const canSubmit = computed(() =>
  !!selectedCategory.value
  && title.value.trim().length > 0
  && (priceType.value === 'free' || (price.value ?? 0) > 0)
)

const { createItem } = useItems()
const toast = useToast()
const loading = ref(false)

async function handleSubmit() {
  if (!canSubmit.value || !selectedCategory.value) return
  loading.value = true
  try {
    const { data, error } = await createItem({
      title: title.value.trim(),
      description: description.value.trim() || null,
      price: priceType.value === 'free' ? 0 : Number(price.value ?? 0),
      condition: condition.value,
      category: selectedCategory.value.value,
      brand: isBuy.value ? brand.value.trim() || null : null,
      free_shipping: false,
      // Fixed price ON means no offers; deal-only listings never accept offers
      accept_offer: isBuy.value ? !fixedPrice.value : false,
      buyer_protection: true,
      deal_west_malaysia: isBuy.value ? deliveryEnabled.value : false,
      deal_east_malaysia: false,
      deal_meetup: dealMeetup.value,
      meetup_location: dealMeetup.value ? meetupLocation.value?.name ?? null : null,
      meetup_lat: dealMeetup.value ? meetupLocation.value?.lat ?? null : null,
      meetup_lng: dealMeetup.value ? meetupLocation.value?.lng ?? null : null,
      status: 'active',
      imageFiles: images.value
    })
    if (error) throw error
    await navigateTo(`/p/${data.slug}`)
  } catch (err) {
    toast.add({
      title: 'Could not list your item',
      description: err instanceof Error ? err.message : 'Please try again.',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div
      v-if="showSellHeader === false"
      class="pt-8"
    />

    <!-- State 1: No images uploaded -->
    <div
      v-if="!imageUploaded"
      class="flex gap-8 py-4 items-start"
    >
      <div class="w-[45%]">
        <div class="mb-4">
          <p class="font-black text-xl">
            List it yourself
          </p>
          <p>Find your own buyers</p>
        </div>
        <SellFileUpload v-model="images" />
      </div>

      <div class="w-[55%]">
        <div class="mb-4">
          <p class="text-xl font-black">
            Sell to Carousell
          </p>
          <p>No listing needed, sell directly to us</p>
        </div>

        <div class="dark:bg-[#19191a] flex flex-col text-center justify-center items-center rounded-md border border-default h-full">
          <div
            v-if="!user"
            class="px-36 py-24"
          >
            <p class="text-md font-bold">
              Sell your phones to Carousell
            </p>
            <p class="text-sm mb-2">
              Save time and effort, get paid effortlessly
            </p>
            <p class="text-xs mb-4">
              Service available in Kuala Lumpur and Selangor only
            </p>
            <UButton
              color="neutral"
              variant="outline"
              class="rounded-none text-md"
              size="lg"
            >
              Log in or Sign Up
            </UButton>
          </div>
          <div
            v-else
            class="px-24 py-12"
          >
            <NuxtImg
              src="/explore/no-review.svg"
              class="h-48 mb-4 mx-auto"
            />
            <p class="text-xl font-black">
              This service is not available in your region yet
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- State 2: Images uploaded — wrapped in UCard -->
    <div
      v-else
      class="flex gap-8 py-4 items-start"
    >
      <UCard class="w-[45%] rounded-md border border-default p-6">
        <SellFileUpload v-model="images" />
      </UCard>

      <UCard
        class="w-[55%] rounded-md border border-default p-6"
        :ui="{ root: 'overflow-visible' }"
      >
        <UForm>
          <UFormField>
            <UPopover v-model:open="categoryOpen">
              <template #anchor>
                <UButton
                  color="neutral"
                  variant="outline"
                  block
                  class="justify-between"
                  trailing-icon="i-lucide-chevron-down"
                  @click="onCategoryClick"
                >
                  <div class="text-left">
                    <p class="font-semibold">
                      {{ selectedCategory?.label ?? 'Select a Category' }}
                    </p>
                    <p
                      v-if="selectedCategory && categoryRootLabel(selectedCategory.value) !== selectedCategory.label"
                      class="text-xs font-normal text-muted"
                    >
                      in {{ categoryRootLabel(selectedCategory.value) }}
                    </p>
                  </div>
                </UButton>
              </template>
              <template #content>
                <div class="max-h-80 w-(--reka-popover-trigger-width) overflow-y-auto p-2">
                  <SellCategoryAccordion
                    :nodes="SELL_CATEGORIES"
                    @select="onSelectCategory"
                  />
                </div>
              </template>
            </UPopover>
            <!-- Deal-only (non-buy) categories -->
            <div
              v-if="selectedCategory && !isBuy"
              class="flex flex-col gap-6 pt-4"
              @click.capture="requireAuth"
              @focusin.capture="requireAuth"
            >
              <UInput
                v-model="title"
                placeholder="Listing Title"
                class="w-full"
              />

              <div class="flex flex-col gap-4">
                <h2 class="text-xl font-black">
                  About the item
                </h2>

                <div>
                  <p class="text-sm text-muted mb-2">
                    Condition
                  </p>
                  <div class="flex gap-3">
                    <UButton
                      v-for="opt in conditionOptions"
                      :key="opt.value"
                      :label="opt.label"
                      :color="condition === opt.value ? 'primary' : 'neutral'"
                      variant="outline"
                      class="rounded-full"
                      @click="condition = opt.value"
                    />
                  </div>
                </div>

                <div>
                  <p class="text-sm text-muted mb-2">
                    Price
                  </p>
                  <div class="flex gap-3">
                    <UButton
                      v-for="opt in priceOptions"
                      :key="opt.value"
                      :label="opt.label"
                      :color="priceType === opt.value ? 'primary' : 'neutral'"
                      variant="outline"
                      class="rounded-full"
                      @click="priceType = opt.value"
                    />
                  </div>
                </div>

                <UInput
                  v-if="priceType === 'sale'"
                  v-model.number="price"
                  type="number"
                  placeholder="Price of your listing"
                  class="w-full"
                >
                  <template #leading>
                    <span class="text-sm text-muted">RM</span>
                  </template>
                </UInput>
              </div>

              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xl font-black">
                    Pre-order
                  </p>
                  <p class="text-sm text-muted">
                    List now, ship to buyer once item is available
                  </p>
                </div>
                <USwitch v-model="preorder" />
              </div>

              <div class="flex flex-col gap-2">
                <UTextarea
                  v-model="description"
                  :rows="4"
                  placeholder="Description (Optional)"
                  class="w-full"
                />
                <p class="text-sm text-muted">
                  Please also disclose all other information and contact details as may be required under the Consumer Protection Act.
                </p>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <h2 class="text-xl font-black">
                    Optional details
                  </h2>
                  <UButton
                    :label="showOptional ? 'Hide' : 'Show'"
                    color="primary"
                    variant="link"
                    :trailing-icon="showOptional ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    @click="showOptional = !showOptional"
                  />
                </div>
                <p class="text-sm text-muted">
                  With these details, buyers can find your listing more easily and ask fewer questions.
                </p>
                <div
                  v-if="showOptional"
                  class="pt-4"
                >
                  <UCheckbox
                    v-model="multiQuantity"
                    label="I have more than one of the same item"
                    description="Don't mark listing as reserved when I accept an offer"
                  />
                </div>
              </div>

              <div>
                <h2 class="text-xl font-black mb-3">
                  Deal methods
                </h2>
                <UCheckbox
                  v-model="dealMeetup"
                  label="Meet-up"
                />
                <SellMeetupLocation
                  v-if="dealMeetup"
                  v-model="meetupLocation"
                  class="mt-3"
                />
              </div>

              <div class="flex justify-end">
                <UButton
                  label="List now"
                  color="primary"
                  size="lg"
                  :loading="loading"
                  :disabled="!canSubmit"
                  @click="handleSubmit"
                />
              </div>
            </div>

            <!-- Buy-enabled categories — checkout UI -->
            <div
              v-else-if="selectedCategory && isBuy"
              class="flex flex-col gap-6 pt-4"
              @click.capture="requireAuth"
              @focusin.capture="requireAuth"
            >
              <UInput
                v-model="title"
                placeholder="Listing title"
                class="w-full"
              />

              <div>
                <p class="text-sm text-muted mb-2">
                  Condition
                </p>
                <div class="flex flex-wrap gap-3">
                  <UButton
                    v-for="opt in buyConditionOptions"
                    :key="opt.value"
                    :label="opt.label"
                    :color="condition === opt.value ? 'primary' : 'neutral'"
                    variant="outline"
                    class="rounded-full"
                    @click="condition = opt.value"
                  />
                </div>
              </div>

              <UInput
                v-model="brand"
                placeholder="Brand"
                class="w-full"
              />

              <UTextarea
                v-model="description"
                :rows="3"
                placeholder="Description"
                class="w-full"
              />

              <div>
                <p class="text-sm text-muted mb-2">
                  Price
                </p>
                <div class="flex gap-3">
                  <UButton
                    v-for="opt in priceOptions"
                    :key="opt.value"
                    :label="opt.label"
                    :color="priceType === opt.value ? 'primary' : 'neutral'"
                    variant="outline"
                    class="rounded-full"
                    @click="priceType = opt.value"
                  />
                </div>
              </div>

              <UInput
                v-if="priceType === 'sale'"
                v-model.number="price"
                type="number"
                placeholder="Price of your listing"
                class="w-full"
              >
                <template #leading>
                  <span class="text-sm text-muted">RM</span>
                </template>
              </UInput>

              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="font-bold">
                    Fixed price
                  </p>
                  <p class="text-sm text-muted">
                    Buyers can only make an offer at your listed price
                  </p>
                </div>
                <USwitch v-model="fixedPrice" />
              </div>

              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="font-bold">
                    Pre-order
                  </p>
                  <p class="text-sm text-muted">
                    List now, ship to buyer once item is available
                  </p>
                </div>
                <USwitch v-model="preorder" />
              </div>

              <div class="flex flex-col gap-4">
                <div>
                  <h2 class="text-xl font-black">
                    Deal method and payment
                  </h2>
                  <p class="text-sm text-muted">
                    Filled based on your selling preferences. Go to the 'Me' tab &gt; Selling preferences to update your saved settings.
                  </p>
                </div>

                <div class="flex items-center justify-between">
                  <p class="font-semibold">
                    Meet-up
                  </p>
                  <USwitch v-model="dealMeetup" />
                </div>

                <template v-if="dealMeetup">
                  <SellMeetupLocation
                    v-model="meetupLocation"
                    clear-on-select
                  />

                  <div
                    v-if="meetupLocation"
                    class="rounded-md border border-default p-4"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <p class="font-semibold">
                          {{ meetupLocation.name }}
                        </p>
                        <p class="text-sm text-muted">
                          {{ meetupLocation.address }}
                        </p>
                      </div>
                      <UButton
                        icon="i-lucide-x"
                        color="neutral"
                        variant="ghost"
                        size="xs"
                        @click="meetupLocation = null"
                      />
                    </div>
                    <UButton
                      label="Add notes"
                      icon="i-lucide-plus"
                      color="primary"
                      variant="link"
                      class="mt-2 px-0"
                      @click="showMeetupNotes = !showMeetupNotes"
                    />
                    <UTextarea
                      v-if="showMeetupNotes"
                      v-model="meetupNotes"
                      :rows="2"
                      placeholder="Add a note for the buyer (e.g. preferred meet-up time)"
                      class="mt-2 w-full"
                    />
                  </div>
                </template>

                <div class="border-t border-default" />

                <div class="flex items-center justify-between">
                  <p class="font-semibold">
                    Delivery
                  </p>
                  <USwitch v-model="deliveryEnabled" />
                </div>

                <div
                  v-if="deliveryEnabled"
                  class="flex flex-col gap-2 text-sm"
                >
                  <p class="flex items-center gap-1 text-muted">
                    <UIcon name="i-lucide-map-pin" />
                    Ship from: 31650
                  </p>
                  <p class="flex items-center gap-1 font-semibold">
                    Carousell Official Delivery
                    <UIcon
                      name="i-lucide-info"
                      class="text-muted"
                    />
                  </p>
                  <p class="text-muted">
                    Enabled: Standard (3-5 working days)
                  </p>
                  <p class="font-semibold">
                    Custom (3 - 5 days)
                  </p>
                  <p class="text-muted">
                    West Malaysia: RM10.00
                  </p>
                  <UButton
                    label="Edit delivery methods"
                    color="primary"
                    variant="link"
                    class="w-fit px-0"
                  />
                </div>

                <div class="border-t border-default" />

                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-semibold">
                      'Buy' button
                    </p>
                    <p class="text-sm text-muted">
                      Enabled
                    </p>
                  </div>
                  <USwitch v-model="buyButtonEnabled" />
                </div>
              </div>

              <div class="flex justify-end">
                <UButton
                  label="List now"
                  color="primary"
                  size="lg"
                  :loading="loading"
                  :disabled="!canSubmit"
                  @click="handleSubmit"
                />
              </div>
            </div>
          </UFormField>
        </UForm>
      </UCard>
    </div>
  </div>
</template>
