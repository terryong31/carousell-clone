<script setup lang="ts">
const isDrawerOpen = ref(false)

const props = defineProps<{
  showLabel?: boolean
}>()

const buttonLabel = computed(() => props.showLabel ? 'All Categories' : undefined)
</script>

<template>
  <div class="relative">
    <UDrawer
      direction="right"
      :handle="false"
    >
      <UButton
        :label="buttonLabel"
        color="neutral"
        variant="ghost"
        icon="i-lucide-layout-grid"
      />
      <template #header>
        <div class="flex items-center justify-between gap-4 mb-4">
          <h2>All Categories</h2>

          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-x"
            @click="isDrawerOpen = false"
          />
        </div>
      </template>
      <template #body>
        blablabla
      </template>
    </UDrawer>
  </div>
</template>