<script setup lang="ts">
const products = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  name: `Awesome Product ${i + 1}`,
  price: 'RM100',
  sellerName: `Seller Name ${i + 1}`,
  daysAgo: `${i + 1} days ago`,
  condition: 'Brand new',
  likeCount: 5
}))
</script>

<template>
  <div class="grid md:grid-cols-4 gap-3 grid-cols-2">
    <NuxtLink
      v-for="product in products"
      :key="product.id"
      :to="`/p/${product.id}`"
    >
      <UCard
        class="hover:border-gray-800 hover:shadow-xl dark:hover:shadow-none dark:hover:bg-neutral-800 transition-colors px-2 py-4"
      >
        <template #header>
          <div class="flex gap-2">
            <div class="items-center justify-center">
              <UAvatar
                src="/blank_profile_pic.webp"
              />
            </div>

            <div class="flex flex-col gap-0.5">
              <div class="col-start-2 row-start-1 font-bold">
                {{ product.sellerName }}
              </div>

              <div class="col-start-2 row-start-2">
                {{ product.daysAgo }}
              </div>
            </div>
          </div>
        </template>

        <NuxtImg
          src="/shrek.webp"
          class="w-full aspect-[1/1] rounded-md object-cover"
        />

        <template #footer>
          <p>{{ product.name }}</p>
          <p class="font-bold text-lg">{{ product.price }}</p>
          <p>{{ product.condition }}</p>
          <div class="pt-3 flex items-center gap-1">
            <UIcon
              name="i-lucide-heart"
              class="size-4"
            />
            <span>{{ product.likeCount }}</span>
          </div>
        </template>
      </UCard>
    </NuxtLink>
  </div>
  <div class="flex justify-center pb-12">
    <UButton
      size="xl"
      class="items-center justify-center w-fit hover:text-green-600 hover:ring-green-600 hover:bg-0 active:bg-neutral"
      variant="outline"
      color="neutral"
    >
      <p>View More</p><UIcon name="i-lucide-arrow-right" />
    </UButton>
  </div>
</template>
