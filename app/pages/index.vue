<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const { data: page } = await useAsyncData('index', () => queryCollection('content').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.seo?.title || page.value.title,
  ogTitle: page.value.seo?.title || page.value.title,
  description: page.value.seo?.description || page.value.description,
  ogDescription: page.value.seo?.description || page.value.description
})

type ShowRow = {
  date: string
  venue: string
  isPast: boolean
  ticketLink: string
}

const showsTableData = computed<ShowRow[]>(() => {
  if (!page.value) {
    return []
  }
  return page.value.shows.list.map((show) => {
    const showDate = new Date(show.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const isPast = showDate < today

    return {
      date: show.date,
      venue: `${show.venue}, ${show.location}`,
      isPast,
      ticketLink: show.ticketLink
    }
  })
})

const showsTableColumns: TableColumn<ShowRow>[] = [
  {
    accessorKey: 'date',
    header: 'Date'
  },
  {
    accessorKey: 'venue',
    header: 'Venue'
  },
  {
    id: 'tickets',
    header: 'Tickets',
    cell: ({ row }) => {
      if (row.original.isPast) {
        return h('span', { class: 'text-muted' }, 'Past')
      }
      return h(resolveComponent('UButton'), {
        to: row.original.ticketLink,
        target: '_blank',
        size: 'sm',
        variant: 'outline'
      }, () => 'Get Tickets')
    }
  }
]

function handleEmailSubmit(email: string) {
  console.log('Email submitted:', email)
}
</script>

<template>
  <div
    v-if="page"
    class="relative"
  >
    <div class="block w-full">
      <img
        src="/images/hero.jpg"
        class="pointer-events-none left-0 top-0 object-cover w-full max-h-[100vh]"
      >
    </div>

    <UPageSection
      id="hero"
      :description="page.album.description"
      :ui="{
        container: 'lg:px-0 2xl:px-20 mx-0 max-w-none md:mr-10',
        features: 'gap-0'
      }"
    >
      <template #title>
        <MDC
          :value="page.album.headline"
          class="sm:*:leading-11"
        />
      </template>
      <USkeleton class="w-64 h-64 self-center mx-auto" />
      <div class="flex flex-col mx-auto gap-2">
        <EmailSignupForm />
      </div>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      id="listen"
      orientation="horizontal"
      :description="page.listen.description"
      :features="page.listen.links"
      :ui="{
        container: 'lg:px-0 2xl:px-20 mx-0 max-w-none md:mr-10',
        features: 'gap-1'
      }"
    >
      <template #title>
        <MDC
          :value="page.listen.headline"
          class="sm:*:leading-11"
        />
      </template>
      <iframe
        data-testid="embed-iframe"
        style="border-radius:12px"
        src="https://open.spotify.com/embed/album/5WulAOx9ilWy1h8UGZ1gkI?utm_source=generator&theme=0"
        width="100%"
        height="352"
        frameBorder="0"
        :allowfullscreen="false"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      id="about"
      :description="page.about.description"
      :features="page.about.members"
      orientation="horizontal"
      :ui="{
        container: 'lg:px-0 2xl:px-20 mx-0 max-w-none md:mr-10',
        features: 'gap-0'
      }"
      reverse
    >
      <template #title>
        <MDC
          :value="page.about.title"
          class="sm:*:leading-11"
        />
      </template>
      <img
        :src="page.about.images.band"
        :alt="page.about.title"
        class="block left-0 w-full max-w-2xl"
      >
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      id="shows"
      :description="page.shows.description"
      class="relative overflow-hidden"
    >
      <template #title>
        <MDC :value="page.shows.headline" />
      </template>

      <UContainer>
        <UTable
          :columns="showsTableColumns"
          :data="showsTableData"
        />
      </UContainer>
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
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

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageCTA
      v-bind="page.cta"
      variant="naked"
      class="overflow-hidden @container"
    >
      <template #title>
        <MDC :value="page.cta.title" />
      </template>

      <LazyStarsBg />
    </UPageCTA>
  </div>
</template>
