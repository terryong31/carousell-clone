<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

const props = defineProps<{ error: NuxtError }>()
</script>

<template>
  <UError
    :error="props.error"
  />
</template>
