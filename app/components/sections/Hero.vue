<script setup lang="ts">
const page = await usePageContent()
</script>

<template>
  <div
    v-if="page"
  >
    <UPageSection
      id="hero"
      :description="page.album.description"
      :ui="{
        container: 'lg:px-0 2xl:px-20 mx-0 max-w-none md:mr-10',
        features: 'gap-0'
      }"
    >
      <template #title>
        <MDC
          :value="page.album.headline"
          class="sm:*:leading-11"
        />
      </template>
      <NuxtImg
        :src="page.album.imageSrc"
        :alt="page.album.imageAlt"
        width="256"
        height="256"
        quality="80"
        format="webp"
        loading="lazy"
        class="w-64 h-64 self-center mx-auto rounded-lg shadow-lg object-cover"
      />
      <div class="flex flex-col mx-auto gap-2">
        <UButton
          to="http://docs.google.com/forms/d/e/1FAIpQLSfduXtFdb29g0z3bVj-UnFHqI5PTCoOwyoFFcLE_0qhLoEHEQ/viewform"
          target="_blank"
          size="lg"
          label="Pre-Order Now"
          color="primary"
          variant="solid"
        />
      </div>
    </UPageSection>
  </div>
</template>
