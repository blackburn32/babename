<script setup lang="ts">
const page = await usePageContent()
</script>

<template>
  <UPageSection
    v-if="page"
    id="bio"
    class="max-w-4xl mx-auto"
  >
    <template #title>
      <MDC :value="page.bio.headline" />
    </template>
    <div class="prose prose-lg dark:prose-invert whitespace-pre-line w-fit mx-auto">
      {{ page.bio.content }}
    </div>
  </UPageSection>
</template>
