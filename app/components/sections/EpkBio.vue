<script setup lang="ts">
const page = await useEpkPageContent()
</script>

<template>
  <UPageSection
    v-if="page"
    id="bio"
  >
    <template #title>
      <MDC :value="page.bio.headline" />
    </template>

    <div class="max-w-4xl mx-auto">
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <MDC
          :value="page.bio.content"
          class="whitespace-pre-line leading-relaxed text-muted-foreground"
        />
      </div>
    </div>
  </UPageSection>
</template>
