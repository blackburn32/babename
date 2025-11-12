<script setup lang="ts">
const page = await useEpkPageContent()
const items = computed(() => page.value?.pressPhotos.images.map(image => image.url) || [])

const downloadImage = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = imageUrl.split('/').pop() || 'press-photo.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to download image:', error)
  }
}
</script>

<template>
  <UPageSection
    v-if="page"
    id="press-photos"
    orientation="horizontal"
  >
    <template #title>
      <MDC :value="page.pressPhotos.headline" />
    </template>

    <template #description>
      <MDC :value="page.pressPhotos.description" />
    </template>

    <UCarousel
      v-slot="{ item }"
      :items="items"
      class="mx-auto lg:max-w-4xl"
      arrows
      dots
      :ui="{
        container: 'flex items-center'
      }"
    >
      <div class="relative">
        <NuxtImg
          :src="item"
          class="rounded-lg"
        />
        <UButton
          icon="i-lucide-download"
          color="neutral"
          variant="solid"
          size="sm"
          class="absolute bottom-4 left-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
          @click="downloadImage(item)"
        />
      </div>
    </UCarousel>
  </UPageSection>
</template>
