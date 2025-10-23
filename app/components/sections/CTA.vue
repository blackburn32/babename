<script setup lang="ts">
const page = await usePageContent()
</script>

<template>
  <UPageCTA
    v-if="page"
    v-bind="page.cta"
    variant="naked"
    class="overflow-hidden @container"
  >
    <template #title>
      <MDC :value="page.cta.title" />
    </template>

    <LazyStarsBg />
  </UPageCTA>
</template>
