<script setup lang="ts">
const page = await usePageContent()
</script>

<template>
  <UPageSection
    v-if="page"
    id="listen"
    orientation="horizontal"
    :description="page.listen.description"
    :features="page.listen.links"
    :ui="{
      container: 'lg:px-0 2xl:px-20 mx-0 max-w-none md:mr-10',
      features: 'gap-1'
    }"
  >
    <template #title>
      <MDC
        :value="page.listen.headline"
        class="sm:*:leading-11"
      />
    </template>
    <iframe
      title="Spotify Player"
      data-testid="embed-iframe"
      style="border-radius:12px"
      src="https://open.spotify.com/embed/album/5WulAOx9ilWy1h8UGZ1gkI?utm_source=generator&theme=0"
      width="100%"
      height="352"
      frameBorder="0"
      :allowfullscreen="false"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  </UPageSection>
</template>
