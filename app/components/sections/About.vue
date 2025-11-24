<script setup lang="ts">
const page = await usePageContent()
</script>

<template>
  <UPageSection
    v-if="page"
    id="about"
    :description="page.about.description"
    :features="page.about.members"
    orientation="horizontal"
    :ui="{
      container: 'lg:px-0 2xl:px-20 mx-0 max-w-none md:mr-10',
      features: 'gap-0'
    }"
    reverse
  >
    <template #title>
      <MDC
        :value="page.about.title"
        class="sm:*:leading-11"
      />
    </template>
    <NuxtImg
      :src="page.about.images.band"
      :alt="page.about.title"
      width="800"
      quality="80"
      format="webp"
      loading="lazy"
      class="block left-0 w-full max-w-2xl"
    />
  </UPageSection>
</template>
