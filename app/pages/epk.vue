<script setup lang="ts">
const page = await useEpkPageContent()

useSeoMeta({
  title: page.value?.seo?.title,
  ogTitle: page.value?.seo?.title,
  description: page.value?.seo?.description,
  ogDescription: page.value?.seo?.description,
  ogImage: page.value?.seo?.ogImage
})
</script>

<template>
  <div>
    <SectionsEpkPressPhotos />

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <SectionsEpkMusicEmbed />

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <SectionsEpkBio />

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <SectionsShows
      :default-tab="'past'"
      :headline="page?.shows?.headline"
      :description="page?.shows?.description"
    />

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <SectionsEpkSocials />

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <SectionsEpkContact />
  </div>
</template>
