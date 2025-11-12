<script setup lang="ts">
const page = await usePageContent()
const appConfig = useAppConfig()

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <div>
    <HeroImage />

    <template v-if="appConfig.comingSoonMode">
      <SectionsComingSoon />
    </template>

    <template v-else>
      <SectionsHero />

      <USeparator :ui="{ border: 'border-primary/30' }" />

      <SectionsListen />

      <USeparator :ui="{ border: 'border-primary/30' }" />

      <SectionsAbout />

      <USeparator :ui="{ border: 'border-primary/30' }" />

      <SectionsBio />

      <USeparator :ui="{ border: 'border-primary/30' }" />

      <SectionsShows />

      <USeparator :ui="{ border: 'border-primary/30' }" />

      <SectionsPatreon />

      <USeparator :ui="{ border: 'border-primary/30' }" />

      <SectionsCTA />
    </template>
  </div>
</template>
