<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
  <img v-if="colorMode.value === 'dark'"
    src="/carousell.svg"
    alt="Carousell"
    v-bind="$attrs"
  >
  <img v-if="colorMode.value === 'light'"
    src="/carousell-light.svg"
    alt="Carousell"
    v-bind="$attrs"
  >
</template>
