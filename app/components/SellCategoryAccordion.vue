<script setup lang="ts">
import type { SellCategory } from '~/constants/sell-categories'

const props = defineProps<{
  nodes: SellCategory[]
}>()

const emit = defineEmits<{
  select: [node: SellCategory]
}>()

const hasChildren = (node: SellCategory) => !!node.children?.length

// Branches and leaves share one alphabetically sorted list.
const sortedNodes = computed(() =>
  [...props.nodes].sort((a, b) => a.label.localeCompare(b.label))
)
</script>

<template>
  <div class="space-y-0.5">
    <template
      v-for="node in sortedNodes"
      :key="node.value"
    >
      <UCollapsible v-if="hasChildren(node)">
        <UButton
          :label="node.label"
          color="neutral"
          variant="ghost"
          block
          trailing-icon="i-lucide-chevron-down"
          class="group justify-between text-sm font-medium"
          :ui="{ trailingIcon: 'transition-transform group-data-[state=open]:rotate-180' }"
        />
        <template #content>
          <div class="ml-1.5 border-l border-default pl-3">
            <SellCategoryAccordion
              :nodes="node.children ?? []"
              @select="child => emit('select', child)"
            />
          </div>
        </template>
      </UCollapsible>

      <UButton
        v-else
        :label="node.label"
        color="neutral"
        variant="ghost"
        block
        class="justify-start text-sm font-normal"
        @click="emit('select', node)"
      />
    </template>
  </div>
</template>
