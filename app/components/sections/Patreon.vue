<script setup lang="ts">
const page = await usePageContent()
</script>

<template>
  <UPageSection
    v-if="page"
    id="patreon"
    class="mb-32 overflow-hidden"
    :title="page.patreon.headline"
    :description="page.patreon.description"
    :plans="page.patreon.levels"
    :ui="{ title: 'text-left @container relative', description: 'text-left' }"
  >
    <template #title>
      <MDC :value="page.patreon.headline" />
    </template>

    <UPricingPlans scale>
      <UPricingPlan
        v-for="(plan, index) in page.patreon.levels"
        :key="index"
        :title="plan.title"
        :description="plan.description"
        :price="plan.price"
        :billing-period="plan.billing_period"
        :billing-cycle="plan.billing_cycle"
        :highlight="plan.highlight"
        :scale="plan.highlight"
        variant="soft"
        :features="plan.features"
        :button="plan.button"
      />
    </UPricingPlans>
  </UPageSection>
</template>
