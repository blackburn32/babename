<script setup lang="ts">
import { z } from 'zod'

const emit = defineEmits<{
  submit: [email: string]
}>()

const { data: page } = await useAsyncData('content', () => queryCollection('content').first())

const emailFormSchema = z.object({
  email: z.string().email('Please enter a valid email address')
})

type EmailForm = z.infer<typeof emailFormSchema>

const emailForm = reactive<EmailForm>({
  email: ''
})

const isSubmitting = ref(false)
const toast = useToast()

async function handleEmailSubmit() {
  isSubmitting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const submittedEmail = emailForm.email
    emailForm.email = ''
    emit('submit', submittedEmail)
    toast.add({
      title: page.value?.album.successToastTitle,
      description: page.value?.album.successToastDescription,
      icon: 'i-lucide-check-circle',
      color: 'primary'
    })
  } catch (error) {
    console.error('Error submitting email:', error)
    toast.add({
      title: page.value?.album.errorToastTitle,
      description: page.value?.album.errorToastDescription,
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <UForm
    v-if="page"
    :schema="emailFormSchema"
    :state="emailForm"
    @submit="handleEmailSubmit"
  >
    <UFormField name="email" :label="page.album.emailHeader">
      <UInput
        v-model="emailForm.email"
        trailing-icon="i-lucide-at-sign"
        :placeholder="page.album.emailPlaceholder"
        size="md"
        type="email"
      />
    </UFormField>
    <UButton
      class="w-fit mt-2"
      :label="page.album.submitLabel"
      type="submit"
      :loading="isSubmitting"
      :disabled="isSubmitting"
      variant="outline"
    />
  </UForm>
</template>
