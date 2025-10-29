<script setup lang="ts">
const page = await useEpkPageContent()
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <UPageSection
    v-if="page"
    id="music"
    orientation="horizontal"
    reverse
  >
    <template #title>
      <MDC :value="page.music.headline" />
    </template>

    <template #description>
      <MDC :value="page.music.description" />
    </template>

    <div class="max-w-3xl mx-auto">
      <div
        class="rounded-lg overflow-hidden shadow-lg"
        v-html="page.music.embedCode"
      />
    </div>
  </UPageSection>
</template>
