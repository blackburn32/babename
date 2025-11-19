<script setup lang="ts">
const page = await usePageContent()

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
  </div>
</template>
