<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt Carousell Clone',
  description: 'Nuxt Carousell Clone Practice',
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain>
        <UContainer>
          <NuxtPage />
        </UContainer>
      </UMain>
    </NuxtLayout>
  </UApp>
</template>
