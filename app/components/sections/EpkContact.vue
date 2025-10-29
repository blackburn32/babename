<script setup lang="ts">
const page = await useEpkPageContent()
const toast = useToast()

const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.add({
      title: 'Copied!',
      description: `${label} copied to clipboard`,
      color: 'primary'
    })
  } catch {
    toast.add({
      title: 'Error',
      description: 'Failed to copy to clipboard',
      color: 'error'
    })
  }
}
</script>

<template>
  <UPageSection
    v-if="page"
    id="contact"
  >
    <template #title>
      <MDC :value="page.contact.headline" />
    </template>

    <div class="max-w-2xl mx-auto">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Booking Email -->
        <div class="flex flex-col items-center p-6 border border-default rounded-lg">
          <div class="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <UIcon
              name="i-lucide-calendar"
              class="w-8 h-8 text-primary"
            />
          </div>
          <h3 class="text-lg font-semibold mb-2">
            Booking Inquiries
          </h3>
          <a
            :href="`mailto:${page.contact.bookingEmail}`"
            class="text-primary hover:underline mb-3"
          >
            {{ page.contact.bookingEmail }}
          </a>
          <UButton
            icon="i-lucide-copy"
            variant="outline"
            color="neutral"
            @click="copyToClipboard(page.contact.bookingEmail, 'Booking email')"
          >
            Copy Email
          </UButton>
        </div>

        <!-- Press Email -->
        <div class="flex flex-col items-center p-6 border border-default rounded-lg">
          <div class="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <UIcon
              name="i-lucide-newspaper"
              class="w-8 h-8 text-primary"
            />
          </div>
          <h3 class="text-lg font-semibold mb-2">
            Press Inquiries
          </h3>
          <a
            :href="`mailto:${page.contact.pressEmail}`"
            class="text-primary hover:underline mb-3"
          >
            {{ page.contact.pressEmail }}
          </a>
          <UButton
            icon="i-lucide-copy"
            variant="outline"
            color="neutral"
            @click="copyToClipboard(page.contact.pressEmail, 'Press email')"
          >
            Copy Email
          </UButton>
        </div>
      </div>
    </div>
  </UPageSection>
</template>
