<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const distance: Array<Array<DropdownMenuItem>> = [
  [
    {
      label: '0.5km',
      value: 0.5
    },
    {
      label: '1km',
      value: 1
    },
    {
      label: '2.5km',
      value: 2.5
    },
    {
      label: '5km',
      value: 5
    },
    {
      label: '10km',
      value: 10
    },
    {
      label: '25km',
      value: 25
    },
    {
      label: '50km',
      value: 50
    },
    {
      label: '100km',
      value: 100
    },
    {
      label: '200km',
      value: 200
    },
    {
      label: '500km',
      value: 500
    }
  ]
]
</script>

<template>
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
      <div class="flex items-center">
        <div class="bg-neutral-100 dark:bg-neutral-800 p-1">
          <UInput
            icon="i-lucide-map-pin"
            variant="ghost"
            placeholder="Malaysia"
          />
        </div>
        <div class="bg-neutral-100 dark:bg-neutral-800 p-1">
          <UDropdownMenu
            :items="distance"
            :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width)' }"
          >
            <UButton
              label="+km"
              class="w-full"
              color="neutral"
              variant="ghost"
              block
              trailing-icon="i-lucide-chevron-down"
            />
          </UDropdownMenu>
        </div>
      </div>
      <div class="bg-neutral-100 dark:bg-neutral-800 p-1">
        <UButton
          color="success"
          label="Search"
          class="font-bold text-white"
        />
      </div>
    </div>
  </UContainer>
</template>
