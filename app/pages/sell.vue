<script setup lang="ts">
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

const _items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
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

      <UCard class="w-[55%] rounded-md border border-default p-6">
        <UForm>
          <UFormField>
            <USelectMenu
              placeholder="Select a Category"
              class="w-full"
            />
          </UFormField>
        </UForm>
      </UCard>
    </div>
  </div>
</template>
