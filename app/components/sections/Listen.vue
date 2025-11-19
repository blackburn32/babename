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
      class="mx-auto rounded"
      style="border: 0; width: 350px; height: 442px;"
      src="https://bandcamp.com/EmbeddedPlayer/track=3546336673/size=large/bgcol=333333/linkcol=e99708/tracklist=false/transparent=true/"
      seamless
    />
  </UPageSection>
</template>
