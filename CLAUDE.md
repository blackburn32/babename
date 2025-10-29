# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for babename, an indie rock band from Seattle, WA. Built with Nuxt 4 and Nuxt UI v4, the site features music streaming links, live show dates, band information, Patreon membership tiers, and email newsletter signup.

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

The site uses **Nuxt Content** with a YAML-based content system. All page content lives in a single structured YAML file:

- **Content file**: [content/index.yml](content/index.yml) - Contains all band-specific sections
- **Schema definition**: [content.config.ts](content.config.ts) - Defines strict Zod schemas for all content sections
- **Custom composable**: [app/composables/usePageContent.ts](app/composables/usePageContent.ts) - Fetches content using `queryCollection('content').first()`
- **Page component**: [app/pages/index.vue](app/pages/index.vue) - Renders custom section components

### Content Structure

The page is divided into these band-specific sections defined in [index.yml](content/index.yml):

- **`seo`** - SEO metadata (title, description)
- **`hero`** - Hero image with headline and album announcement overlay
  - `backgroundImage` - Full-width hero image (hosted on ImageKit.io)
  - `headline` - Text overlay (top-left)
  - `description` - Text overlay (bottom-right)
- **`album`** - Album announcement section with pre-order button
  - `headline` - Album title with MDC formatting
  - `description` - Release date
- **`listen`** - Streaming platform links
  - `headline`, `description`
  - `links` - Array of streaming services with icons (Spotify, Apple Music, Bandcamp, YouTube, SoundCloud, Tidal)
- **`email`** - Newsletter signup form configuration
  - Form labels, placeholders, toast messages
- **`about`** - Band information and member profiles
  - `images.band` - Band photo
  - `members` - Array with name, role, custom styling
- **`shows`** - Live performance dates
  - `list` - Array with date, venue, location, ticketLink
- **`patreon`** - Patreon membership tiers
  - `levels` - Array of pricing tiers with features and buttons
  - `links` - Free follow link
- **`cta`** - Call-to-action section with links

Each section has a strict schema in [content.config.ts](content.config.ts). Modifications to content structure require updating both the schema and YAML file.

### Component Architecture

**Layout Components:**
- [AppHeader.vue](app/components/AppHeader.vue) - Sticky header with smooth-scroll navigation and mobile slideover menu
  - Uses `useScrollspy()` to track active section
  - Navigation items: Music, About, Shows, Patreon
  - Includes color mode toggle
  - Custom logo with font-logo class
- [AppFooter.vue](app/components/AppFooter.vue) - Footer with links, email signup, and social icons
  - Footer columns for Music, Connect, About
  - Integrated EmailSignupForm
  - Contact email link
  - Social icons (Patreon, Instagram)

**Section Components:** (in [app/components/sections/](app/components/sections/))
- [Hero.vue](app/components/sections/Hero.vue) - Full-width hero image with text overlays and album announcement
- [Listen.vue](app/components/sections/Listen.vue) - Streaming platform icon grid
- [About.vue](app/components/sections/About.vue) - Band photo and member profiles
- [Shows.vue](app/components/sections/Shows.vue) - Upcoming and past show dates with tabs
- [Patreon.vue](app/components/sections/Patreon.vue) - Pricing plan cards using `UPricingPlans` component
- [CTA.vue](app/components/sections/CTA.vue) - Final call-to-action section

**Utility Components:**
- [EmailSignupForm.vue](app/components/EmailSignupForm.vue) - Newsletter signup with Zod validation and toast notifications
- [StarsBg.vue](app/components/StarsBg.vue) - Animated background effect

**Page Layout:**
- Sections are separated by `USeparator` components with custom primary color borders
- All sections use the shared `usePageContent()` composable
- MDC rendering for styled text (e.g., `[text]{.text-primary}`)

### Styling & Theming

- **Theme colors**: Configured in [app/app.config.ts](app/app.config.ts)
  - `primary: 'violet'`
  - `neutral: 'neutral'`
- **Custom fonts**: Defined in [app/assets/css/main.css](app/assets/css/main.css)
  - `--font-sans: 'Public Sans'` - Body text
  - `--font-logo: 'MayflowerAntique'` - Brand/logo text (use `.font-logo` class)
- **Custom CSS**: Located in [app/assets/css/main.css](app/assets/css/main.css)
  - Imports Tailwind CSS and Nuxt UI
  - Sources content from `content/**/*` for styling
- **Nuxt UI v4**: Uses latest Nuxt UI components - see [Nuxt UI docs](https://ui.nuxt.com)
  - `UPageSection`, `UPricingPlans`, `USeparator`, `UButton`, `UForm`, `UInput`, etc.
- **Icon system**: Uses Iconify with `@iconify-json/lucide` and `@iconify-json/simple-icons`
  - Lucide icons: `i-lucide-icon-name` (e.g., `i-lucide-calendar`)
  - Simple icons: `i-simple-icons-name` (e.g., `i-simple-icons-spotify`)
- **Images**: Hosted on ImageKit.io CDN with optimization parameters

### Key Technical Details

- **Framework**: Nuxt 4.1.3 with Nuxt UI v4.0.1
- **Modules**:
  - `@nuxt/content` v3.7.1 - Content management
  - `@nuxt/ui` v4.0.1 - UI component library
  - `@nuxt/image` v1.11.0 - Image optimization with ImageKit.io
  - `@nuxt/fonts` v0.11.4 - Font optimization
  - `@nuxt/eslint` v1.9.0 - Linting
- **SSG (Static Generation)**: Configured in [nuxt.config.ts](nuxt.config.ts) with Nitro prerendering for `/` route
- **SEO**: Handled in [index.vue](app/pages/index.vue) using `useSeoMeta()` with content from YAML
- **Routing**: Smooth scroll behavior enabled (`scrollBehaviorType: 'smooth'`)
- **Form validation**: Zod schemas for email validation with toast notifications
- **TypeScript**: Fully typed with strict ESLint config
  - Brace style: `1tbs`
  - Comma dangle: `never` (no trailing commas)
- **Content Preview**: Nuxt Studio API integration for content editing
- **Syntax Highlighting**: MDC highlight enabled (for future code blocks if needed)

## Editing Content

### Quick Content Updates

All content is managed in [content/index.yml](content/index.yml). No Vue file modifications needed for content changes:

**Common tasks:**
1. **Update show dates**: Edit the `shows.list` array
2. **Change album release info**: Edit `album.headline` and `album.description`
3. **Update streaming links**: Modify `listen.links` array
4. **Adjust Patreon tiers**: Edit `patreon.levels` with pricing/features
5. **Update band member info**: Edit `about.members` array
6. **Change hero image**: Update `hero.backgroundImage` URL (use ImageKit.io)
7. **Modify form messages**: Edit `email` section toast messages

### Adding New Fields

If adding new fields to existing sections:
1. Update the schema in [content.config.ts](content.config.ts) first
2. Add the field to [content/index.yml](content/index.yml)
3. Update the corresponding section component in [app/components/sections/](app/components/sections/)

### Styling Customization

- **Colors**: Edit [app/app.config.ts](app/app.config.ts) - currently using `violet` primary
- **Fonts**: Managed by `@nuxt/fonts` module - defined in [main.css](app/assets/css/main.css)

## Important Notes

### Content Management
- Content changes only require editing [content/index.yml](content/index.yml) - no Vue modifications needed
- Schema validation prevents runtime errors - ALWAYS update [content.config.ts](content.config.ts) before adding new fields
- MDC syntax in YAML allows styled text: `[text]{.text-primary}` renders with primary color

### Development Workflow
- The site is statically generated - run `pnpm build` to see production output
- ESLint auto-fixes on save - respect the `1tbs` brace style and `never` trailing commas
- Smooth scroll behavior is enabled globally for anchor link navigation
- Dev server runs on `http://localhost:3000`

### Images
- All images hosted on ImageKit.io CDN for optimization
- Use `NuxtImg` component for automatic optimization
- Hero image supports dynamic backgrounds via YAML config

### Forms & Validation
- Email signup uses Zod validation with `z.string().email()`
- Toast notifications configured in [content/index.yml](content/index.yml) under `email` section
- Form currently has a mock submit (1s delay) - integrate with real email service as needed

### Navigation
- Header uses `useScrollspy()` to track active section and highlight nav items
- All navigation links use smooth scroll via `scrollIntoView({ behavior: 'smooth' })`
- Mobile menu uses Nuxt UI's slideover component

### Performance
- Static Site Generation (SSG) for fast loading
- Image optimization via `@nuxt/image` module
- Font optimization via `@nuxt/fonts` module
- All routes prerendered at build time
