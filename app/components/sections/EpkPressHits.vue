<script setup lang="ts">
const page = await useEpkPageContent()
</script>

<template>
  <UPageSection
    v-if="page"
    id="press-hits"
    orientation="vertical"
  >
    <template #title>
      <MDC :value="page.pressHits.headline" />
    </template>

    <template #description>
      <MDC :value="page.pressHits.description" />
    </template>

    <UPageColumns>
      <UPageCard
        v-for="(item, index) in page.pressHits.items"
        :key="index"
        :title="item.title"
        :description="item.quote || item.description"
        :to="item.to"
        target="_blank"
        variant="outline"
      >
        <template
          v-if="item.outlet || item.image || item.to"
          #footer
        >
          <div class="flex items-center justify-between gap-2 text-sm text-muted">
            <div class="flex items-center gap-2">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.outlet || item.title"
                class="size-10 rounded-full object-cover"
              >
              <span
                v-if="item.outlet"
                class="font-medium"
              >{{ item.outlet }}</span>
            </div>
            <UIcon
              v-if="item.to"
              name="i-lucide-external-link"
              class="size-4"
            />
          </div>
        </template>
      </UPageCard>
    </UPageColumns>
  </UPageSection>
</template>
