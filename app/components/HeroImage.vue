<script setup lang="ts">
const page = await usePageContent()
const image = computed(() => page.value?.hero.backgroundImage || 'https://ik.imagekit.io/alnazmrug/babename/hero.jpg?updatedAt=1761250159137')
</script>

<template>
  <div
    v-if="page"
    class="block w-full relative max-h-[calc(100vh-5rem)] overflow-hidden"
  >
    <NuxtImg
      :src="image"
      class="pointer-events-none left-0 top-0 object-cover w-full max-h-[100vh]"
      alt="babename"
    />
    <div class="absolute top-5 left-5 text-neutral-950 font-logo text-3xl sm:text-4xl">
      {{ page.hero.headline }}
    </div>
    <div class="absolute bottom-5 right-5 text-neutral-50 font-logo text-3xl sm:text-4xl">
      {{ page.hero.description }}
    </div>
  </div>
</template>
