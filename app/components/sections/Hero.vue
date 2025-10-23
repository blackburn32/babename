<script setup lang="ts">
const page = await usePageContent()
</script>

<template>
  <div
    v-if="page"
    class="relative"
  >
    <div class="block w-full">
      <img
        src="https://ik.imagekit.io/alnazmrug/babename/hero.jpg?updatedAt=1761250159137"
        class="pointer-events-none left-0 top-0 object-cover w-full max-h-[100vh]"
      >
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
