<script setup lang="ts">
import type { GeocodeResult } from '~~/server/api/geocode.get'

const props = defineProps<{
  // When true, clear the input after selecting (caller shows its own card)
  clearOnSelect?: boolean
}>()

const model = defineModel<GeocodeResult | null>({ default: null })

const query = ref(model.value?.name ?? '')
const results = ref<GeocodeResult[]>([])
const open = ref(false)
const loading = ref(false)

let debounce: ReturnType<typeof setTimeout> | undefined
let suppressWatch = false

watch(query, (value) => {
  if (suppressWatch) {
    suppressWatch = false
    return
  }

  // Editing the field after a pick invalidates the stored selection
  if (model.value && value !== model.value.name) {
    model.value = null
  }

  clearTimeout(debounce)
  if (value.trim().length < 3) {
    results.value = []
    open.value = false
    return
  }
  debounce = setTimeout(search, 350)
})

async function search() {
  loading.value = true
  try {
    results.value = await $fetch('/api/geocode', { query: { q: query.value } })
    open.value = results.value.length > 0
  } catch {
    results.value = []
    open.value = false
  } finally {
    loading.value = false
  }
}

function selectLocation(location: GeocodeResult) {
  model.value = location
  open.value = false
  results.value = []
  if (props.clearOnSelect) {
    suppressWatch = true
    query.value = ''
  } else {
    query.value = location.name
  }
}

// Delay close so a result's mousedown can register before blur hides the list
function onBlur() {
  setTimeout(() => (open.value = false), 120)
}
</script>

<template>
  <div class="relative pt-2">
    <UFormField label="Add location">
      <UInput
        v-model="query"
        placeholder="Search for a location"
        :loading="loading"
        trailing-icon="i-lucide-search"
        class="w-full"
        @focus="open = results.length > 0"
        @blur="onBlur"
      />
    </UFormField>

    <div
      v-if="open"
      class="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-default bg-default shadow-lg"
    >
      <p class="bg-elevated px-3 py-2 text-sm text-muted">
        Search result
      </p>
      <ul class="max-h-72 overflow-y-auto">
        <li
          v-for="location in results"
          :key="location.id"
          class="cursor-pointer border-t border-default px-3 py-2 hover:bg-elevated"
          @mousedown.prevent="selectLocation(location)"
        >
          <p class="font-semibold">
            {{ location.name }}
          </p>
          <p class="line-clamp-1 text-sm text-muted">
            {{ location.address }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
