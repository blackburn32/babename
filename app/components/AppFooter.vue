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
    label: 'Tour Dates'
  }, {
    label: 'Patreon'
  }, {
    label: 'Merch'
  }, {
    label: 'Contact'
  }]
}, {
  label: 'About',
  children: [{
    label: 'Band Info'
  }, {
    label: 'Press Kit'
  }, {
    label: 'News'
  }, {
    label: 'FAQ'
  }]
}]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  toast.add({
    title: 'Subscribed!',
    description: 'You\'ve been subscribed to our newsletter.'
  })
}
</script>

<template>
  <USeparator
    icon="i-simple-icons-nuxtdotjs"
    class="h-px"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <form @submit.prevent="onSubmit">
              <UFormField
                name="email"
                label="Get updates on new music & shows"
                size="lg"
              >
                <UInput
                  v-model="email"
                  type="email"
                  class="w-full"
                  placeholder="Enter your email"
                >
                  <template #trailing>
                    <UButton
                      type="submit"
                      size="xs"
                      label="Subscribe"
                    />
                  </template>
                </UInput>
              </UFormField>
            </form>
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
        to="https://instagram.com/babename"
        target="_blank"
        icon="i-simple-icons-instagram"
        aria-label="Babename on Instagram"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://facebook.com/babename"
        target="_blank"
        icon="i-simple-icons-facebook"
        aria-label="Babename on Facebook"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://x.com/babename"
        target="_blank"
        icon="i-simple-icons-x"
        aria-label="Babename on X"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://youtube.com/@babename"
        target="_blank"
        icon="i-simple-icons-youtube"
        aria-label="Babename on YouTube"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
