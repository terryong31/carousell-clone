<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
  <ClientOnly>
    <NuxtImg
      v-if="colorMode.value === 'dark'"
      src="/carousell.svg"
      alt="Carousell"
      v-bind="$attrs"
    />
    <NuxtImg
      v-if="colorMode.value === 'light'"
      src="/carousell-light.svg"
      alt="Carousell"
      v-bind="$attrs"
    />
  </ClientOnly>
</template>
