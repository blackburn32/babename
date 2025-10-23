export async function usePageContent() {
  const { data: page } = await useAsyncData('index', () => queryCollection('content').first())

  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  return page
}
