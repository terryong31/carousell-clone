<script setup lang="ts">
import type { FormInputEvents } from '@nuxt/ui';
const v: FormInputEvents[] = ['submit'];
</script>
<template>
  <UForm :validate-on="['submit']" />
  <UForm :validate-on="v" />
  <UForm :validate-on="[]" />
</template>
