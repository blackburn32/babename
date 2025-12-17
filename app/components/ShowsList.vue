<template>
  <div ref="containerRef">
    <a
      v-if="isMounted"
      class="bit-widget-initializer"
      :data-artist-name="artistId"
      data-events-to-display=""
      :data-background-color="bgColor"
      :data-separator-color="separatorColor"
      :data-text-color="textColor"
      data-font="Public Sans"
      data-auto-style="true"
      data-button-label-capitalization="uppercase"
      data-header-capitalization="uppercase"
      data-location-capitalization="uppercase"
      data-venue-capitalization="uppercase"
      data-display-local-dates="true"
      data-local-dates-position="tab"
      data-display-past-dates="true"
      data-display-details="false"
      data-display-lineup="false"
      data-display-start-time="false"
      data-social-share-icon="false"
      data-display-limit="all"
      data-date-format="MMM. D, YYYY"
      data-date-orientation="horizontal"
      :data-date-border-color="primaryColor"
      data-date-border-width="1px"
      data-date-capitalization="capitalize"
      data-date-border-radius="10px"
      data-event-ticket-cta-size="medium"
      data-event-custom-ticket-text=""
      data-event-ticket-text="TICKETS"
      data-event-ticket-icon="false"
      data-event-ticket-cta-text-color="rgba(255,255,255,1)"
      :data-event-ticket-cta-bg-color="primaryColor"
      :data-event-ticket-cta-border-color="primaryColor"
      data-event-ticket-cta-border-width="0px"
      data-event-ticket-cta-border-radius="4px"
      data-sold-out-button-text-color="rgba(255,255,255,1)"
      :data-sold-out-button-background-color="mutedColor"
      :data-sold-out-button-border-color="mutedColor"
      data-sold-out-button-clickable="true"
      data-event-rsvp-position="left"
      data-event-rsvp-cta-size="medium"
      data-event-rsvp-only-show-icon="false"
      data-event-rsvp-text="RSVP"
      data-event-rsvp-icon="false"
      :data-event-rsvp-cta-text-color="primaryColor"
      :data-event-rsvp-cta-bg-color="bgColor"
      :data-event-rsvp-cta-border-color="primaryColor"
      data-event-rsvp-cta-border-width="1px"
      data-event-rsvp-cta-border-radius="4px"
      data-follow-section-position="top"
      data-follow-section-alignment="center"
      data-follow-section-header-text="Get updates on new shows, new music, and more"
      data-follow-section-cta-size="medium"
      data-follow-section-cta-text="FOLLOW"
      data-follow-section-cta-icon="false"
      data-follow-section-cta-text-color="rgba(255,255,255,1)"
      :data-follow-section-cta-bg-color="primaryColor"
      :data-follow-section-cta-border-color="primaryColor"
      data-follow-section-cta-border-width="0px"
      data-follow-section-cta-border-radius="4px"
      data-play-my-city-position="bottom"
      data-play-my-city-alignment="center"
      data-play-my-city-header-text="Don't see a show near you?"
      data-play-my-city-cta-size="medium"
      data-play-my-city-cta-text="REQUEST A SHOW"
      data-play-my-city-cta-icon="false"
      data-play-my-city-cta-text-color="rgba(255,255,255,1)"
      :data-play-my-city-cta-bg-color="primaryColor"
      :data-play-my-city-cta-border-color="primaryColor"
      data-play-my-city-cta-border-width="0px"
      data-play-my-city-cta-border-radius="4px"
      data-optin-font=""
      data-optin-text-color=""
      data-optin-bg-color=""
      data-optin-cta-text-color=""
      data-optin-cta-bg-color=""
      data-optin-cta-border-width=""
      data-optin-cta-border-radius=""
      data-optin-cta-border-color=""
      data-language="en"
      data-layout-breakpoint="900"
      data-app-id="6431294b919c4fa90ddd94523bf09b80"
      data-affil-code=""
      data-bit-logo-position="bottomRight"
      :data-bit-logo-color="mutedColor"
    ></a>
  </div>
</template>

<script setup lang="ts">
const artistId = 'id_15625517'
const colorMode = useColorMode()
const containerRef = ref<HTMLElement | null>(null)

// Track mounted state to avoid hydration mismatch
const isMounted = ref(false)

const isDark = computed(() => {
  if (!isMounted.value) return false
  if (colorMode.preference === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return colorMode.value === 'dark'
})

// Site colors matching main.css and app.config.ts
const bgColor = computed(() => isDark.value ? 'rgba(10,10,10,1)' : 'rgba(250,250,250,1)')
const textColor = computed(() => isDark.value ? 'rgba(250,250,250,1)' : 'rgba(10,10,10,1)')
const separatorColor = computed(() => isDark.value ? 'rgba(64,64,64,1)' : 'rgba(221,221,221,1)')
const mutedColor = computed(() => isDark.value ? 'rgba(82,82,82,1)' : 'rgba(115,115,115,1)')
const primaryColor = 'rgba(139,92,246,1)' // violet-500

// Load the Bandsintown widget script
const loadWidget = () => {
  // Remove existing widget content if any
  if (containerRef.value) {
    const existingWidget = containerRef.value.querySelector('.bit-widget')
    if (existingWidget) {
      existingWidget.remove()
    }
  }

  // Check if script already exists
  const existingScript = document.querySelector('script[src*="bandsintown.com"]')
  if (existingScript) {
    existingScript.remove()
  }

  // Create and load new script
  const script = document.createElement('script')
  script.charset = 'utf-8'
  script.src = 'https://widgetv3.bandsintown.com/main.min.js'
  document.body.appendChild(script)
}

onMounted(() => {
  isMounted.value = true
  nextTick(() => {
    loadWidget()
  })
})

// Reload widget when color mode changes
watch(isDark, () => {
  nextTick(() => {
    loadWidget()
  })
})
</script>
