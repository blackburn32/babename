import { defineFontProvider } from 'unifont'

export default defineFontProvider('mayflower', async () => {
  return {
    async resolveFont(fontFamily) {
      if (fontFamily === 'Mayflower Antique') {
        return {
          fonts: [
            {
              src: [
                {
                  url: 'https://ik.imagekit.io/alnazmrug/babename/MayflowerAntique.ttf?updatedAt=1761250713116',
                  format: 'truetype'
                }
              ],
              weight: 400,
              style: 'normal'
            }
          ]
        }
      }
    }
  }
})
