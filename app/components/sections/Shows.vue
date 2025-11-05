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
      <UTabs :items="tabs" :default-value="props.defaultTab">
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
