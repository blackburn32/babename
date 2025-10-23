# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for Babename, a band landing page built with Nuxt UI. The site connects fans with music streaming platforms, Patreon, and live performance information.

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Type checking
pnpm typecheck
```

## Architecture

### Content Management System

The site uses **Nuxt Content** with a YAML-based content system, not markdown files. All page content lives in a single structured YAML file:

- **Content file**: `content/index.yml` - Contains all sections (hero, features, testimonials, pricing, CTA)
- **Schema definition**: `content.config.ts` - Defines strict Zod schemas for all content sections
- **Page component**: `app/pages/index.vue` - Fetches content using `queryCollection('content').first()` and renders pre-built UI sections

### Content Structure

The landing page is divided into sections defined in `index.yml`:
- `hero` - Top section with title, description, and CTA links
- `section` - Featured content with images and feature list
- `features` - Grid of product features with icons
- `steps` - Step-by-step onboarding/usage guide
- `pricing` - Pricing plans (can be repurposed for tier-based content)
- `testimonials` - User quotes with avatars
- `cta` - Bottom call-to-action section

Each section has a strict schema in `content.config.ts`. Modifications to content structure require updating both the schema and YAML file.

### Component Architecture

- **Layout components**: `AppHeader.vue` and `AppFooter.vue` - Global navigation and footer
- **Background effects**: `HeroBackground.vue` and `StarsBg.vue` - Visual decoration components
- **Page sections**: Built using Nuxt UI components (`UPageHero`, `UPageSection`, `UPageCTA`, etc.)
- **MDC rendering**: Section titles support markdown-in-components syntax for styling (e.g., `[text]{.text-primary}`)

### Styling & Theming

- **Theme colors**: Configured in `app/app.config.ts` - Currently set to `primary: 'orange'`
- **Custom CSS**: Located in `assets/css/main.css`
- **Nuxt UI**: Uses Nuxt UI v4 components throughout - consult [Nuxt UI docs](https://ui.nuxt.com) for component APIs
- **Icon system**: Uses Iconify with `@iconify-json/lucide` and `@iconify-json/simple-icons` - icons referenced as `i-lucide-icon-name` or `i-simple-icons-name`

### Key Technical Details

- **SSG (Static Generation)**: Configured in `nuxt.config.ts` with Nitro prerendering for `/` route
- **SEO**: Handled in `index.vue` using `useSeoMeta()` composable with fallback to content title/description
- **Images**: Uses `@nuxt/image` module - supports `UColorModeImage` component for light/dark variants
- **TypeScript**: Fully typed with strict ESLint config (1tbs brace style, no trailing commas)

## Editing Content for Babename

To customize for the band:

1. Update `content/index.yml` with band-specific content (music links, show dates, Patreon links)
2. Replace images in `/public/images/` directory
3. Adjust theme colors in `app/app.config.ts` to match band aesthetic
4. Repurpose sections as needed:
   - `pricing` → Patreon tiers or merch options
   - `testimonials` → Fan quotes or press reviews
   - `steps` → How to support the band
   - `features` → Highlight music platforms, live shows, exclusive content

## Important Notes

- Content changes only require editing `content/index.yml` - no Vue file modifications needed
- Schema validation prevents runtime errors - if adding new fields, update `content.config.ts` first
- The page is statically generated - run `pnpm build` to see production output
- ESLint will auto-fix on save - respect the 1tbs brace style and no trailing comma rules
