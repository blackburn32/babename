export async function useEpkPageContent() {
  const { data: page } = await useAsyncData('epk', () => queryCollection('epk').first())

  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  return page
}
