<script setup lang="ts">
const page = await useEpkPageContent()
</script>

<template>
  <UPageSection
    v-if="page"
    id="socials"
    :description="page.socials.description"
  >
    <template #title>
      <MDC :value="page.socials.headline" />
    </template>

    <div class="max-w-2xl mx-auto">
      <div class="flex flex-wrap justify-center gap-4">
        <UButton
          v-for="link in page.socials.links"
          :key="link.label"
          :to="link.to"
          :target="link.target"
          :icon="link.icon"
          :size="link.size"
          :color="link.color"
          :variant="link.variant"
        >
          {{ link.label }}
        </UButton>
      </div>
    </div>
  </UPageSection>
</template>
