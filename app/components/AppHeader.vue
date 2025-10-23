<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const items: ComputedRef<NavigationMenuItem[]> = computed(() => [{
  label: 'Music',
  active: activeHeadings.value.includes('music') && !activeHeadings.value.includes('shows'),
  onSelect: (event: Event) => handleSmoothScroll(event, '#music')
}, {
  label: 'Shows',
  active: activeHeadings.value.includes('shows'),
  onSelect: (event: Event) => handleSmoothScroll(event, '#shows')
}, {
  label: 'Patreon',
  active: activeHeadings.value.includes('patreon'),
  onSelect: (event: Event) => handleSmoothScroll(event, '#patreon')
}, {
  label: 'Press',
  active: activeHeadings.value.includes('press') && !activeHeadings.value.includes('patreon'),
  onSelect: (event: Event) => handleSmoothScroll(event, '#press')
}, {
  to: 'https://www.patreon.com/bePatron?u=143537464',
  icon: 'i-tabler-brand-patreon-filled'
}])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#music'),
    document.querySelector('#shows'),
    document.querySelector('#patreon'),
    document.querySelector('#press')
  ].filter(Boolean) as Element[])
})

const handleSmoothScroll = (event: Event, targetId: string) => {
  event.preventDefault()
  const target = document.querySelector(targetId)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <UHeader class="h-20">
    <template #left>
      <NuxtLink to="/">
        <div class="flex flex-col space-y-0">
          <div class="text-4xl font-logo">
            babename
          </div>
          <div class="font-logo leading-none">
            THE BAND
          </div>
        </div>
      </NuxtLink>
    </template>

    <template #right>
      <UNavigationMenu
        :items="items"
        variant="link"
        class="hidden lg:block"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
