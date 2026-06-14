<script setup lang="ts">
const imageUploaded = computed(() => images.value.length > 0)

const user = useSupabaseUser()

const showSellHeader = useState('showSellHeader', () => false)

const images = ref<File[]>([])

watch(images, (newImages) => {
  showSellHeader.value = newImages.length > 0
})

const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
</script>

<template>
  <div class="flex gap-8 py-4 items-start">
    <div class="w-[45%]">
      <div
        v-if="!imageUploaded"
        class="mb-4"
      >
        <p class="font-black text-xl">
          List it yourself
        </p>
        <p>Find your own buyers</p>
      </div>
      <UFileUpload
        v-model="images"
        icon="i-lucide-image"
        label="Drop your images here"
        description="SVG, PNG, JPG or GIF (max. 2MB)"
        layout="list"
        multiple
        :ui="{
          base: 'border-green-400 border-2 bg-green-400/20 hover:bg-green-400/20 dark:text-white'
        }"
        class="w-full min-h-48"
      >
        <template #actions="{ open }">
          <UButton
            label="Select images"
            icon="i-lucide-upload"
            :ui="{
              base: 'bg-green-600 hover:bg-green-600 border-none ring-green-300 text-white'
            }"
            variant="outline"
            @click.stop="open()"
          />
        </template>

        <template #files-bottom="{ removeFile, files }">
          <UButton
            v-if="files?.length"
            label="Remove all files"
            color="neutral"
            @click="removeFile()"
          />
        </template>
      </UFileUpload>
    </div>

    <div
      v-if="!imageUploaded"
      class="w-[55%]"
    >
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
          <img
            src="/explore/no-review.svg"
            class="h-48 mb-4 mx-auto"
          >
          <p class="text-xl font-black">
            This service is not available in your region yet
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="imageUploaded"
      class="w-[60%] rounded-md border border-default p-6"
    >
      <UForm>
        <UFormField>
          <USelectMenu
            placeholder="Select a Category"
            :items="items"
            class="w-full"
          />
        </UFormField>
      </UForm>
    </div>
  </div>
</template>
