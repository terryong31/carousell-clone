<script setup lang="ts">
const brands = [
  {
    label: 'Levis Jeans'
  },
  {
    label: 'Uniqlo Jeans'
  },
  {
    label: 'Dickies Jeans'
  },
  {
    label: 'Handm Jeans'
  },
  {
    label: 'Zara Jeans'
  },
  {
    label: 'Paul Ralph Lauren Jeans'
  },
  {
    label: 'Tommy Hilfiger Jeans'
  },
  {
    label: 'Adidas Jeans'
  },
  {
    label: 'Ralph Lauren Jeans'
  },
  {
    label: 'Nike Jeans'
  }
]

const footerLinks: Record<string, { label: string, to: string }[]> = {
  'Follow us': [
    { label: 'Facebook', to: '#' },
    { label: 'Twitter', to: '#' },
    { label: 'Blog', to: '#' },
    { label: 'Carousell College', to: '#' }
  ],
  'Cars & Property': [
    { label: 'Cars', to: '#' },
    { label: 'Auto Accessories', to: '#' },
    { label: 'Property', to: '#' },
    { label: 'Motorbikes', to: '#' }
  ],
  'Fashion': [
    { label: 'Women\'s Fashion', to: '#' },
    { label: 'Luxury', to: '#' },
    { label: 'Men\'s Fashion', to: '#' },
    { label: 'Beauty & Personal Care', to: '#' }
  ],
  'Home & Living': [
    { label: 'Furniture & Home Living', to: '#' },
    { label: 'Babies & Kids', to: '#' },
    { label: 'Health & Nutrition', to: '#' },
    { label: 'Food & Drinks', to: '#' },
    { label: 'Pet Supplies', to: '#' }
  ],
  'Electronics & Mobiles': [
    { label: 'Computers & Tech', to: '#' },
    { label: 'Video Gaming', to: '#' },
    { label: 'Mobile Phones & Gadgets', to: '#' },
    { label: 'Audio', to: '#' },
    { label: 'Photography', to: '#' },
    { label: 'TV & Home Appliances', to: '#' }
  ],
  'Hobbies & Games': [
    { label: 'Toys & Games', to: '#' },
    { label: 'Music & Media', to: '#' },
    { label: 'Books & Magazines', to: '#' },
    { label: 'Stationery & Craft', to: '#' },
    { label: 'Collectibles & Memorabilia', to: '#' },
    { label: 'Sports Equipment', to: '#' },
    { label: 'Tickets & Vouchers', to: '#' },
    { label: 'Travel', to: '#' }
  ],
  'Jobs & Services': [
    { label: 'Jobs', to: '#' },
    { label: 'Services', to: '#' }
  ],
  'Others': [
    { label: 'Everything Else', to: '#' },
    { label: 'Looking For', to: '#' },
    { label: 'Following', to: '#' },
    { label: 'Free Items', to: '#' }
  ]
}

const accordionItems = Object.entries(footerLinks).map(([title, links]) => ({
  label: title,
  links
}))
</script>

<template>
  <p class="font-bold text-sm mb-2">
    Popular Brands in Jeans
  </p>
  <div class="flex flex-wrap items-center gap-y-1">
    <template
      v-for="({ label }, index) in brands"
      :key="label"
    >
      <ULink
        target="_blank"
        class="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
      >
        {{ label }}
      </ULink>
      <span
        v-if="index < brands.length - 1"
        class="mx-2 text-xs text-neutral-500"
      >|</span>
    </template>
  </div>
  <USeparator
    type="dashed"
    size="sm"
    class="pt-8"
  />
  <div class="pt-8">
    <!-- Desktop Grid View -->
    <div class="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-6">
      <div
        v-for="(links, title) in footerLinks"
        :key="title"
        class="flex flex-col gap-1"
      >
        <h3 class="font-bold text-sm text-neutral-900 dark:text-white mb-1">
          {{ title }}
        </h3>
        <ULink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="text-xs text-neutral hover:text-green-500 dark:hover:text-green-500 hover:underline"
        >
          {{ link.label }}
        </ULink>
      </div>
    </div>

    <!-- Mobile Accordion View -->
    <div class="md:hidden">
      <UAccordion :items="accordionItems">
        <template #body="{ item }">
          <div class="flex flex-col gap-3 py-1">
            <ULink
              v-for="link in item.links"
              :key="link.label"
              :to="link.to"
              class="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-semibold transition-colors"
            >
              {{ link.label }}
            </ULink>
          </div>
        </template>
      </UAccordion>
    </div>
  </div>
</template>
