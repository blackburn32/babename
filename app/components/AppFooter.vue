<script setup lang="ts">
const columns = [{
  label: 'Music',
  children: [{
    label: 'Spotify'
  }, {
    label: 'Apple Music'
  }, {
    label: 'Bandcamp'
  }, {
    label: 'YouTube'
  }]
}, {
  label: 'Connect',
  children: [{
    label: 'Shows',
    to: '#shows'
  }, {
    label: 'Patreon',
    to: 'https://www.patreon.com/c/babename/posts'
  }]
}, {
  label: 'About',
  children: [{
    label: 'Band Info',
    to: '#about'
  }]
}]
</script>

<template>
  <USeparator
    class="h-px"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <EmailSignupForm />
            <div class="text-sm font-semibold mt-6">
              Contact:
            </div>
            <ULink to="mailto:booking@babenametheband.com" class="hover:underline text-sm">
              booking@babenametheband.com
            </ULink>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-sm text-muted">
        © {{ new Date().getFullYear() }} Babename • All Rights Reserved
      </p>
    </template>

    <template #right>
      <UButton
        to="https://www.patreon.com/c/babename/posts"
        target="_blank"
        icon="i-simple-icons-patreon"
        aria-label="Babename on Patreon"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
