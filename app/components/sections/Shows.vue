<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const props = withDefaults(defineProps<{
  defaultTab?: 'upcoming' | 'past'
  headline?: string
  description?: string
}>(), {
  defaultTab: 'upcoming'
})

const page = await usePageContent()

const eventsStructuredData = computed(() => {
  if (!page.value?.shows?.list) return []

  return page.value.shows.list.map((show) => {
    const showDate = new Date(show.date)
    const event: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'MusicEvent',
      name: `babename the band at ${show.venue}`,
      startDate: showDate.toISOString().split('T')[0],
      location: {
        '@type': 'Place',
        name: show.venue,
        address: {
          '@type': 'PostalAddress',
          addressLocality: show.location.split(',')[0]?.trim(),
          addressRegion: show.location.split(',')[1]?.trim()
        }
      },
      performer: {
        '@type': 'MusicGroup',
        name: 'babename the band',
        url: 'https://www.babenametheband.com'
      },
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
    }

    if (show.ticketLink && show.ticketLink !== '#') {
      event.offers = {
        '@type': 'Offer',
        url: show.ticketLink,
        availability: 'https://schema.org/InStock'
      }
    }

    return event
  })
})

useHead({
  script: computed(() =>
    eventsStructuredData.value.map(event => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(event)
    }))
  )
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

const upcomingShows = computed(() => showsTableData.value.filter(show => !show.isPast))
const pastShows = computed(() => showsTableData.value.filter(show => show.isPast))

const upcomingShowsColumns: TableColumn<ShowRow>[] = [
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
      return h(resolveComponent('UButton'), {
        to: row.original.ticketLink,
        target: '_blank',
        size: 'sm',
        variant: 'outline'
      }, () => 'Get Tickets')
    }
  }
]

const pastShowsColumns: TableColumn<ShowRow>[] = [
  {
    accessorKey: 'date',
    header: 'Date'
  },
  {
    accessorKey: 'venue',
    header: 'Venue'
  }
]

const tabs = [
  { label: 'Upcoming', slot: 'upcoming', value: 'upcoming' },
  { label: 'Past', slot: 'past', value: 'past' }
]
</script>

<template>
  <UPageSection
    v-if="page"
    id="shows"
    :description="props.description || page.shows.description"
    class="relative overflow-hidden"
  >
    <template #title>
      <MDC :value="props.headline || page.shows.headline" />
    </template>

    <UContainer>
      <UTabs
        :items="tabs"
        :default-value="props.defaultTab"
      >
        <template #upcoming>
          <UTable
            :columns="upcomingShowsColumns"
            :data="upcomingShows"
          />
        </template>
        <template #past>
          <UTable
            :columns="pastShowsColumns"
            :data="pastShows"
          />
        </template>
      </UTabs>
    </UContainer>
  </UPageSection>
</template>
