<script setup lang="ts">
const page = await usePageContent()
const image = computed(() => page.value?.hero.backgroundImage || 'https://ik.imagekit.io/alnazmrug/babename/hero.jpg?updatedAt=1761250159137')
</script>

<template>
  <div
    v-if="page"
  >
    <div class="block w-full relative max-h-[calc(100vh-5rem)] overflow-hidden">
      <NuxtImg
        :src="image"
        class="pointer-events-none left-0 top-0 object-cover w-full max-h-[100vh]"
        alt="babename"
      />
      <div class="absolute top-5 left-5 text-inverted font-logo text-3xl sm:text-4xl">
        {{ page.hero.headline }}
      </div>
      <div class="absolute bottom-5 right-5 font-logo text-3xl sm:text-4xl">
        {{ page.hero.description }}
      </div>
    </div>

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
      <USkeleton class="w-64 h-64 self-center mx-auto" />
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
