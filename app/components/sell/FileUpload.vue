<script setup lang="ts">
import draggable from 'vuedraggable'
import imageCompression from 'browser-image-compression'

const MAX_FILES = 10
const MAX_SIZE_MB = 2
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

const images = defineModel<File[]>({ required: true })

const previews = computed(() =>
  images.value.map(file => URL.createObjectURL(file))
)

watch(images, async (newImages, oldImages) => {
  if (!newImages || newImages.length === 0) return
  if (newImages.length === oldImages?.length) return

  // Filter out non-image files
  const validImages = newImages.filter(f => ACCEPTED_TYPES.includes(f.type))

  // Enforce max file limit
  const capped = validImages.slice(0, MAX_FILES)

  // Check if any files were removed by validation
  if (capped.length !== newImages.length) {
    images.value = capped
    return
  }

  // Compress any files that exceed the size limit
  const needsCompression = capped.some(f => f.size > MAX_SIZE_MB * 1024 * 1024)
  if (needsCompression) {
    const compressed = await Promise.all(
      capped.map(f => f.size > MAX_SIZE_MB * 1024 * 1024
        ? imageCompression(f, {
            maxSizeMB: MAX_SIZE_MB,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          })
        : f
      )
    )
    images.value = compressed
  }
})

function removeImage(index: number) {
  const updated = [...images.value]
  updated.splice(index, 1)
  images.value = updated
}
</script>

<template>
  <div>
    <UFileUpload
      v-model="images"
      icon="i-lucide-image"
      accept="image/*"
      layout="list"
      multiple
      :preview="false"
      :ui="{
        base: 'border-green-400 border-2 bg-green-400/20 hover:bg-green-400/20 dark:text-white',
        wrapper: 'flex flex-col items-center justify-center'
      }"
      class="w-full min-h-48"
    >
      <template #actions="{ open }">
        <div class="flex flex-col items-center gap-1">
          <UButton
            label="Select photos"
            icon="i-lucide-upload"
            :ui="{
              base: 'bg-green-600 hover:bg-green-600 border-none ring-green-300 text-white'
            }"
            variant="outline"
            @click.stop="open()"
          />
          <div class="mt-1">
            or drag photos here
          </div>
          <div class="text-neutral-500 dark:text-neutral-400">
            (Up to 10 photos)
          </div>
        </div>
      </template>
    </UFileUpload>

    <!-- Custom image preview grid -->
    <template v-if="images.length > 0">
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-4 mb-2 flex items-center justify-center gap-1 pt-2 pb-12">
        <UIcon
          name="i-lucide-lightbulb"
          class="size-4"
        />
        Tip: Re-arrange photos to change cover
      </p>

      <draggable
        v-model="images"
        item-key="name"
        class="grid grid-cols-3 gap-4"
        ghost-class="opacity-40"
        animation="200"
      >
        <template #item="{ element, index }">
          <div class="relative group cursor-grab active:cursor-grabbing aspect-[5/6] z-0">
            <!-- Absolute white card wrapper for COVER (doesn't shift the image) -->
            <template v-if="index === 0">
              <!-- Background card sticking out behind the image -->
              <div class="absolute -left-1.5 -right-1.5 -bottom-1.5 -top-8 bg-white rounded-lg -z-10 shadow-sm border border-neutral-200 dark:border-neutral-200 pointer-events-none" />
              <!-- COVER text positioned in the top sticking-out part -->
              <div class="absolute -top-8 left-0 right-0 h-8 flex items-center justify-center text-black font-medium text-[13px] tracking-wide pointer-events-none">
                COVER
              </div>
            </template>

            <!-- Image container (always exactly the same size for every item) -->
            <div class="relative w-full h-full rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <NuxtImg
                :src="previews[index]"
                :alt="element.name"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Delete button -->
            <button
              class="absolute top-1.5 right-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-black/60 text-white z-10"
              @click.stop="removeImage(index)"
            >
              <UIcon
                name="i-lucide-trash-2"
                class="size-3.5"
              />
            </button>
          </div>
        </template>
      </draggable>
    </template>
  </div>
</template>
