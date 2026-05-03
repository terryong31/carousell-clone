<script setup lang="ts">

definePageMeta({
  showSell: true
})

const images = ref<File[]>([])

const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])

</script>

<template>
  <div class="flex gap-8 py-4 items-start">
    <div class="flex-1 rounded-md border border-default p-6">
      <UFileUpload
        v-model="images"
        icon="i-lucide-image"
        label="Drop your images here"
        description="SVG, PNG, JPG or GIF (max. 2MB)"
        layout="list"
        multiple
        class="w-full min-h-48"
      >
        <template #actions="{ open }">
          <UButton
            label="Select images"
            icon="i-lucide-upload"
            color="neutral"
            variant="outline"
            @click="open()"
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
    <div class="flex-2 rounded-md border border-default p-6">
      <UForm>
        <UFormField>
          <USelectMenu placeholder="Select a Category" :items="items" class="w-full" />
        </UFormField>
      </UForm>
    </div>
  </div>
</template>
