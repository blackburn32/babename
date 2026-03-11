<template>
  <iframe
    :src="iframeSrc"
    width="100%"
    height="220px"
    title="newsletter-widget"
    scrolling="no"
    class="overflow-hidden border-0"
  />
</template>

<script setup lang="ts">
const colorMode = useColorMode()

// Track resolved dark mode, only render after mounted to avoid hydration mismatch
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})

const isDark = computed(() => {
  if (!isMounted.value) return false
  // Handle 'system' preference by checking the actual resolved value
  if (colorMode.preference === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return colorMode.value === 'dark'
})

const iframeSrc = computed(() => {
  // Site colors matching main.css and app.config.ts
  const bgColor = isDark.value ? 'rgba(10,10,10,1)' : 'rgba(250,250,250,1)' // neutral-950 / neutral-50
  const textColor = isDark.value ? 'rgba(250,250,250,1)' : 'rgba(10,10,10,1)'
  const primaryColor = 'rgba(139,92,246,1)' // violet-500

  const params = new URLSearchParams({
    headerTextColor: textColor,
    backgroundColor: bgColor,
    ctaBackgroundColor: primaryColor,
    title: 'MAILING LIST',
    headerTextStyle: 'normal',
    headerText: 'Sign up to get the latest updates',
    font: 'Public Sans',
    ctaIcon: 'show',
    ctaBorderRadius: '4px',
    ctaBorderWidth: '2px',
    ctaBorderColor: primaryColor,
    ctaFontColor: 'rgba(255,255,255,1)',
    alignment: 'center',
    emailInputField: 'show',
    ctaLabel: 'Subscribe',
    layout: 'wide',
    locale: 'en'
  })

  return `https://bandsintown.com/artist/15625517/email_signup_form?${params.toString()}`
})
</script>
