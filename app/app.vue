<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#171717' : 'white')

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
    { name: 'application-name', content: 'babename the band' },
    { name: 'apple-mobile-web-app-title', content: 'babename the band' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'canonical', href: 'https://www.babenametheband.com' },
    { rel: 'apple-touch-icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  },
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        name: 'babename the band',
        url: 'https://www.babenametheband.com',
        genre: 'Indie Rock',
        foundingLocation: {
          '@type': 'Place',
          name: 'Seattle, WA'
        },
        image: 'https://ik.imagekit.io/alnazmrug/babename/hero.jpg',
        sameAs: [
          'https://open.spotify.com/artist/1sGhJOAOc0ysdhikC7nDYV',
          'https://music.apple.com/us/artist/babename/1849523897',
          'https://babenametheband.bandcamp.com',
          'https://music.youtube.com/channel/UC5K4uf6hPQo1jFKpHQGegzg',
          'https://tidal.com/artist/69111927',
          'https://www.patreon.com/c/babename/posts'
        ]
      })
    }
  ]
})

useSeoMeta({
  title: 'babename the band',
  ogTitle: 'babename the band',
  description: 'babename is an indie rock band from Seattle, WA, blending heartfelt lyrics with energetic guitar-driven sound.',
  ogDescription: 'babename is an indie rock band from Seattle, WA, blending heartfelt lyrics with energetic guitar-driven sound.',
  ogImage: 'https://ik.imagekit.io/alnazmrug/babename/hero.jpg?updatedAt=1761250159137',
  ogImageWidth: 3089,
  ogImageHeight: 2048,
  ogImageAlt: 'babename the band',
  ogType: 'website',
  ogUrl: 'https://www.babenametheband.com',
  ogSiteName: 'babename the band',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  robots: 'index, follow',
  author: 'babename the band'
})
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
