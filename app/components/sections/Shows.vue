<script setup lang="ts">
const props = defineProps<{
  headline?: string
  description?: string
}>()

const page = await usePageContent()
</script>

<template>
  <UPageSection
    v-if="page"
    id="shows"
    class="relative overflow-hidden"
    :ui="{ container: 'gap-4 sm:gap-4 lg:gap-4' }"
  >
    <template #title>
      <MDC :value="props.headline || page.shows.headline" />
    </template>
    <ShowsList />
  </UPageSection>
</template>
