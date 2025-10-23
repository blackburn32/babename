<script setup lang="ts">
import { z } from 'zod'

const emit = defineEmits<{
  submit: [email: string]
}>()

const page = await usePageContent()

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
      title: page.value?.email.successToastTitle,
      description: page.value?.email.successToastDescription,
      icon: 'i-lucide-check-circle',
      color: 'primary'
    })
  } catch (error) {
    console.error('Error submitting email:', error)
    toast.add({
      title: page.value?.email.errorToastTitle,
      description: page.value?.email.errorToastDescription,
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
    <UFormField name="email" :label="page.email.header">
      <UInput
        v-model="emailForm.email"
        :placeholder="page.email.placeholder"
        size="md"
        type="email"
        class="w-full"
      >
        <template #trailing>
          <UButton
            type="submit"
            size="xs"
            :label="page.email.submitLabel"
            :loading="isSubmitting"
            :disabled="isSubmitting"
          />
        </template>
      </UInput>
    </UFormField>
  </UForm>
</template>
