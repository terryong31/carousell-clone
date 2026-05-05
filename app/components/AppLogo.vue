<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
  <ClientOnly>
    <img
      v-if="colorMode.value === 'dark'"
      src="/carousell.svg"
      alt="Carousell"
      v-bind="$attrs"
      class="hidden sm:inline-block"
    />
    <img
      v-if="colorMode.value === 'light'"
      src="/carousell-light.svg"
      alt="Carousell"
      v-bind="$attrs"
      class="hidden sm:inline-block"
    />
    <img
      src="/carousell-header-logo.svg"
      class="sm:hidden"
    />
  </ClientOnly>
</template>
