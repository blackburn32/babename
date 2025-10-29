<script setup lang="ts">
const page = await useEpkPageContent()
const items = computed(() => page.value?.pressPhotos.images.map(image => image.url) || [])
</script>

<template>
  <UPageSection
    v-if="page"
    id="press-photos"
    orientation="horizontal"
  >
    <template #title>
      <MDC :value="page.pressPhotos.headline" />
    </template>

    <template #description>
      <MDC :value="page.pressPhotos.description" />
    </template>

    <UCarousel
      v-slot="{ item }"
      :items="items"
      class="mx-auto my-auto lg:max-w-4xl"
      arrows
      dots
    >
      <NuxtImg
        :src="item"
        class="rounded-lg"
      />
    </UCarousel>
  </UPageSection>
</template>
