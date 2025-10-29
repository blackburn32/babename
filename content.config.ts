import { defineCollection, z } from '@nuxt/content'

const createEnum = (options: [string, ...string[]]) => z.enum(options)

const createBaseSchema = () => z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty()
})

const createLinkSchema = () => z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional().editor({ input: 'icon' }),
  size: createEnum(['xs', 'sm', 'md', 'lg', 'xl']),
  trailing: z.boolean().optional(),
  target: createEnum(['_blank', '_self']),
  color: createEnum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info']),
  variant: createEnum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
})

const createFeatureSchema = () => createBaseSchema().extend({
  icon: z.string().optional().editor({ input: 'icon' }),
  ui: z.object({
    leading: z.string().optional()
  }).editor({ hidden: true })
})

export const collections = {
  content: defineCollection({
    source: 'index.yml',
    type: 'page',
    schema: z.object({
      hero: createBaseSchema().extend({
        backgroundImage: z.string().optional().editor({ input: 'image' }),
        headline: z.string(),
        description: z.string()
      }),
      listen: createBaseSchema().extend({
        headline: z.string(),
        description: z.string(),
        links: z.array(createFeatureSchema())
      }),
      album: z.object({
        headline: z.string(),
        description: z.string()
      }),
      email: z.object({
        header: z.string(),
        placeholder: z.string(),
        submitLabel: z.string(),
        successToastTitle: z.string(),
        successToastDescription: z.string(),
        errorToastTitle: z.string(),
        errorToastDescription: z.string()
      }),
      about: createBaseSchema().extend({
        headline: z.string().optional(),
        images: z.object({
          band: z.string().optional()
        }),
        members: z.array(
          createBaseSchema().extend({
            icon: z.string().editor({ input: 'icon' })
          })
        )
      }),
      shows: z.object({
        headline: z.string(),
        description: z.string(),
        list: z.array(z.object({
          date: z.string().nonempty(),
          venue: z.string().nonempty(),
          location: z.string().nonempty(),
          ticketLink: z.string().nonempty()
        }))
      }),
      patreon: z.object({
        headline: z.string(),
        description: z.string(),
        free: z.string(),
        links: z.array(createLinkSchema()),
        levels: z.array(
          createBaseSchema().extend({
            price: z.string().nonempty(),
            button: createLinkSchema(),
            features: z.array(z.string().nonempty()),
            highlight: z.boolean().optional(),
            billing_period: z.string().nonempty(),
            billing_cycle: z.string().nonempty()
          })
        )
      }),
      cta: createBaseSchema().extend({
        links: z.array(createLinkSchema())
      })
    })
  })
}
