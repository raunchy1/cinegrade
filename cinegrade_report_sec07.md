## 7. The CINEGRADE LAB Web Platform

The CINEGRADE LAB platform translates the theoretical framework of cinematic color science into a functional, interactive web application. Deployed at `https://rvzhn4jucgc3m.kimi.page` and engineered with React 19, TypeScript, and Tailwind CSS, the application serves as both a showcase for the 250+ preset and LUT collection and a demonstration of how color-centric design principles can guide every layer of frontend architecture—from the design tokens that define the palette to the page routes that structure user discovery. The following sections document the platform's design philosophy, page-level architecture, and underlying technical implementation.

### 7.1 Design Philosophy

The visual identity of CINEGRADE LAB is built on the premise that a color grading tool should itself embody cinematic aesthetics. The interface operates as a dark, immersive environment where the user's attention is directed toward the color products rather than competing UI chrome. Three interconnected design systems—the dark cinematic palette, glassmorphism surface language, and hierarchical typography—work in concert to achieve this effect.

#### 7.1.1 Dark Cinematic UI

The foundation of the interface is a near-black background at `#0A0A0F`—a value deliberately chosen with a subtle blue undertone that prevents the flatness of pure black while providing a neutral canvas against which graded imagery can register accurately. This decision aligns with established practices in professional color grading suites, where dark surrounds minimize perceptual adaptation shifts and maximize perceived contrast in displayed imagery.

Against this background, the interface deploys a warm gold accent (`#D4AF37`) derived directly from the CINEGRADE LAB brand mark. The gold functions as the primary accent pathway: it highlights active filter pills, fills the gradient used on call-to-action buttons, and serves as the progress indicator color in match-score visualizations. A complementary cool blue accent (`#3A86FF`) provides secondary emphasis, appearing in the AI Assistant interface, search focus rings, and informational tags. The warm-cool pairing creates visual temperature contrast that mirrors the teal-and-orange logic underlying many of the platform's own cinematic grades.

The gradient system extends this palette into five defined combinations: `gradient-warm` (`135deg, #FF6B35 → #D4AF37 → #FF6B35`) for primary CTAs and active states; `gradient-cool` (`135deg, #3A86FF → #00B4D8`) for technology-forward UI elements; `gradient-premium` (`135deg, #D4AF37 → #8B5A2B → #D4AF37`) for luxury accents; `gradient-overlay` (`180deg, transparent → rgba(10,10,15,0.95)`) for hero section fades; and `gradient-radial-glow` for subtle section-level warmth emanating from the top center of viewport areas. Each category in the 25-category library also receives a unique accent hex—ranging from `#D4AF37` for Luxury Editorial to `#008080` for Teal & Orange Modern—ensuring that every preset card carries a color signature consistent with its creative intent.

Text rendering follows a three-tier opacity hierarchy optimized for dark-mode legibility: fully opaque white (`#FFFFFF`) for headlines and primary interactive elements, 70% white (`rgba(255,255,255,0.7)`) for body copy and descriptions, and 40% white (`rgba(255,255,255,0.4)`) for labels, meta text, and placeholders. This tiered system, combined with the gold accent for highlighted statistics, produces a reading experience where information density is moderated through luminance rather than additional color variables.

The table below summarizes the core design token system governing the CINEGRADE LAB interface.

| Token Category | Token | Value | Application |
|---------------|-------|-------|-------------|
| Background | `bg-dark` | `#0A0A0F` | Page background, root substrate |
| Background | `bg-card` | `#1A1A24` | Elevated card surfaces, sidebar panels |
| Background | `bg-navbar` | `rgba(10,10,15,0.85)` | Fixed navigation bar with `blur(20px)` |
| Accent | `accent-gold` | `#D4AF37` | CTAs, active filters, stat highlights, match scores |
| Accent | `accent-blue` | `#3A86FF` | Search focus, AI elements, info tags, links |
| Gradient | `gradient-warm` | `135deg, #FF6B35 → #D4AF37` | Primary buttons, active states |
| Gradient | `gradient-cool` | `135deg, #3A86FF → #00B4D8` | Technology-forward UI, secondary accents |
| Gradient | `gradient-overlay` | `180deg, transparent → #0A0A0F` | Hero image overlays, section transitions |
| Glass | `glass-fill` | `rgba(255,255,255,0.03)` | Default glassmorphism surface fill |
| Glass | `glass-border` | `1px solid rgba(255,255,255,0.08)` | Default glassmorphism border |
| Glass | `glass-radius` | `12px` | Border radius for all glass surfaces |
| Text | `text-primary` | `#FFFFFF` | Headlines, interactive elements |
| Text | `text-secondary` | `rgba(255,255,255,0.7)` | Body copy, descriptions |
| Text | `text-muted` | `rgba(255,255,255,0.4)` | Labels, meta text, placeholders |

The 25 category-specific accent colors extend this palette further, assigning each preset category a unique hex value (from `#2D1B69` for Deep Cinematic Shadows to `#F8F9FA` for Clean Editorial Bright) that propagates through filter pills, card top-bars, and thumbnail gradients. This category-color mapping ensures visual consistency between the library's organizational taxonomy and its visual presentation.

#### 7.1.2 Glassmorphism Design Language

Surface design throughout the platform employs a glassmorphism treatment defined by three parameters: a base fill of `rgba(255,255,255,0.03)`, a `backdrop-filter: blur(16px)` pass, and a `1px solid rgba(255,255,255,0.08)` border at `12px` border-radius. On hover, surfaces transition to `rgba(255,255,255,0.05)` fill with `rgba(255,255,255,0.15)` border, producing a subtle luminance shift that communicates interactivity without introducing additional color.

This glassmorphism system appears on navigation bars (`rgba(10,10,15,0.85)` background with `blur(20px)`), preset cards, testimonial panels, sidebar containers, and modal surfaces. The treatment is not merely decorative—it serves a functional purpose in a dark interface by creating depth separation between content layers while maintaining the ambient darkness that preserves color fidelity. Cards that house graded sample images use the glass wrapper to "float" the imagery above the `#0A0A0F` substrate, creating a subtle museum-display effect where each preset is presented as an artifact within its own illuminated frame.

The CSS implementation defines `.glass-card` as a reusable component class in the global stylesheet, enabling consistent application across all 6 pages and 40+ component instances. Hover transitions execute over `300ms` with a `cubic-bezier(0.25, 0.1, 0.25, 1)` easing curve, producing smooth state changes that feel responsive without perceptible delay.

#### 7.1.3 Typography System

The type system employs a three-font stack loaded via Google Fonts with `display=swap` optimization. **Space Grotesk** (weights 400–700) handles all display text—headlines H1 through H3, the logo lockup, section titles, and stat counters. Its geometric construction with slightly squared terminals carries a technical-cinematic character that aligns with the platform's positioning. **Inter** (weights 400–600) serves as the body font for UI labels, navigation links, descriptions, and paragraph text, chosen for its exceptional legibility at small sizes on dark backgrounds. **JetBrains Mono** (weights 400–500) renders all technical data: preset parameters, format badges ("XMP" / "CUBE"), match scores, and metadata labels.

The type scale uses CSS `clamp()` functions for fluid responsive sizing. H1 headlines scale from `48px` on mobile to `120px` on ultra-wide displays at `700` weight with `-0.03em` letter-spacing and `0.92` line-height. H2 section titles range from `36px` to `72px` at `600` weight with `-0.02em` tracking. H3 subsection titles span `24px` to `40px`. Body text is set at `16px` with `1.6` line-height, while body-large paragraphs for hero descriptions use `18px` at `1.55` line-height. Caption labels operate at `13px` with `0.02em` positive tracking for uppercase section identifiers (e.g., "THE COLLECTION", "TESTIMONIALS"). Mono-small text for parameters renders at `12px` with `0.04em` tracking.

### 7.2 Page Architecture

The application implements 6 client-side routes through React Router's `HashRouter`, with each route corresponding to a distinct page component in the `src/pages/` directory. A shared `Layout` component wraps every route, providing the fixed navigation bar at `72px` height and the footer, with the main content area offset by `padding-top: 72px` to prevent overlap. The following table maps each route to its page component and primary functionality.

| Route (HashRouter) | Page Component | Primary Purpose | Key Interactive Elements |
|-------------------|----------------|-----------------|-------------------------|
| `/` | `Home.tsx` | Conversion funnel, brand showcase | Hero with parallax, animated stats, 12-category grid, testimonial carousel |
| `/#/library` | `Library.tsx` | Full collection discovery | Real-time search, 25 filter pills, format toggle, load-more pagination |
| `/#/preview` | `Preview.tsx` | Before/after comparison | Draggable slider (pointer + keyboard), 3 image pairs, parameter bar visualization |
| `/#/assistant` | `Assistant.tsx` | AI color matching simulation | Mood selector (8 options), text input, 2.5s analysis, ranked result cards |
| `/#/pricing` | `Pricing.tsx` | Subscription conversion | 3-tier cards, feature comparison table, FAQ accordion, billing toggle |
| `/#/dashboard` | `Dashboard.tsx` | User account management | Collapsible sidebar, 6 tabbed views, activity timeline, cloud sync status |

The Home page (`/`) functions as the primary conversion funnel, organized into 7 vertically stacked sections that guide the visitor from brand impression to pricing action.

The Home page (`/`) functions as the primary conversion funnel, organized into 7 vertically stacked sections that guide the visitor from brand impression to pricing action. The **Hero Section** fills the full viewport height (`100dvh`) with a cinematic aerial background image overlaid by a three-stop gradient (`rgba(10,10,15,0.3)` at top through `0.95` at bottom) and a subtle SVG-based film grain texture at 3% opacity using `mix-blend-mode: overlay`. The headline "Cinematic Color, Perfected" renders in Space Grotesk at H1 scale with `text-shadow: 0 4px 60px rgba(0,0,0,0.5)` for depth separation against the photography. Two Framer Motion-animated CTA buttons—"Explore Library" (primary gradient) and "Watch Demo" (secondary outline)—appear below the subheadline with staggered entrance delays of 0.7s and 0.9s respectively.

Below the hero, a **Stats Bar Section** displays 4 animated counters ("250+" presets, "25" categories, "50K+" creators, "4.9" rating) rendered with the `Counter` component. Each counter uses Framer Motion's `useMotionValue` and `animate` functions to interpolate from 0 to the target value over 2 seconds with an `easeOutExpo` curve when the element enters the viewport at 30% visibility via `useInView`. The stat numbers receive a warm gradient text fill (`background-clip: text`), while thin vertical dividers (`1px solid rgba(255,255,255,0.1)`) separate each column on desktop. A trust bar below lists 7 compatible software platforms (Adobe Lightroom, DaVinci Resolve, Final Cut Pro, etc.) at 30% opacity.

The **Category Preview Section** renders a responsive grid of 12 category cards (from a data array of 25 categories) using the glassmorphism card component. Each card features an accent-colored top bar, a CSS gradient thumbnail generated from the category's accent color, the category name in Space Grotesk, a preset/LUT count, and a row of 3 color swatches. The grid adapts from 2 columns on mobile to 6 columns on ultra-wide via Tailwind's `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6` utility. Staggered entrance animation delivers cards with `0.05s` delay per item.

The **How It Works Section** presents a 3-column layout documenting the user journey: Browse → Compare → Download. Each step features a large watermark number at 6% opacity, a gold-accented icon circle, and descriptive copy. The **Featured LUTs Section** displays 6 preset cards in a horizontal scroll container with `snap-x snap-mandatory` behavior; each card shows a before/after image toggle on hover using CSS `opacity` transitions. The **Testimonials Section** auto-scrolls through 4 creator testimonials in an infinite horizontal loop driven by `requestAnimationFrame`, pausing on mouse hover. Finally, the **CTA Banner Section** centers a headline, subcopy, and dual action buttons beneath a radial gold glow, closing the conversion loop with links to `/pricing`.

#### 7.2.2 Library Page

The Library page (`/#/library`) serves as the primary discovery interface for the full collection of 250+ presets and LUTs. The page header contains a title block with a gold-accented underline bar and a search input that filters across preset name, category, and mood fields in real time. Below the header, a sticky filter bar (positioned at `top: 72px` with `z-index: 40`) presents 25 horizontally scrollable category filter pills—each displaying a colored dot indicator alongside the category name. The "All" pill defaults to active with gold styling, while individual category pills adopt their respective accent colors when selected. A format toggle group (All / Presets XMP / LUTs CUBE) sits below the category pills, enabling binary filtering by file format.

The filter logic uses a `useMemo` hook combining three predicate functions: `matchesSearch` (case-insensitive string inclusion across name, category, and mood), `matchesCategory` (exact category ID match), and `matchesFormat` (exact format match). Results update reactively as the user types or selects filters, with the visible item count reset to `ITEMS_PER_PAGE` (24) on each filter change. Pagination uses a "Load More" pattern rather than page numbers, revealing 24 additional items per click until all results are displayed.

Preset cards render in a responsive grid (`1-col` mobile, `2-col` tablet, `3-col` desktop, `4-col` ultra-wide) with glassmorphism styling. Each card's thumbnail area uses radial gradients derived from the category accent color layered over the `#0A0A0F` to `#1A1A24` base, creating a unique color signature for every item without requiring external thumbnail assets. Format badges ("XMP" or "CUBE") appear in JetBrains Mono at `11px` with a glass backdrop. A toast notification system via `sonner` provides feedback when a user clicks a preset card, displaying the preset name and category in a dark-themed toast positioned at the bottom-right.

Below the grid, a **Featured Collections** section presents 3 curated collection cards—"Cinema Classics" (36 items), "Modern Creator" (48 items), and "Luxury & Editorial" (42 items)—each with a multi-color gradient montage thumbnail and descriptive copy.

#### 7.2.3 Preview Page

The Preview page (`/#/preview`) provides an interactive before/after comparison tool built around a draggable slider component. Three image pairs are included: a portrait graded with the "Golden Editorial 01" preset, a landscape with "Neo Noir Cinema," and a Tokyo street scene with "Tokyo Night Neon." Each pair exposes 8 parameter values (Exposure, Contrast, Highlights, Shadows, Saturation, Temperature, Tint, Grain) rendered as animated horizontal bars with warm (`#FF6B35 → #D4AF37`) or cool (`#3A86FF → #00B4D8`) gradients depending on whether the parameter value is positive or negative.

The `ComparisonSlider` component implements the before/after interaction using Framer Motion's `useMotionValue` and `useTransform` hooks. The "after" image layer is clipped via a dynamic `clipPath: inset(0 ${100 - v}% 0 0)` transform tied to the slider position, which ranges from 0 to 100. Pointer event handlers (`onPointerDown`, `onPointerMove`, `onPointerUp`) provide drag interaction with `col-resize` cursor feedback, while a keyboard handler enables 5% incremental adjustment via left/right arrow keys. The slider handle renders as a `3px` white vertical line with a `48px` circular thumb containing directional arrows. "BEFORE" and "AFTER" labels in JetBrains Mono `12px` are positioned at the bottom corners over `rgba(0,0,0,0.5)` pill backgrounds.

A right sidebar (`320px` on desktop, collapsing to full-width on mobile) presents the active preset's metadata: category badge with color indicator, format badges, a thumbnail selector for switching between the 3 image pairs, parameter bars, and action buttons for download (primary), favorite (toggleable heart), and share. Below the comparison area, a horizontal scroll carousel shows 4 related presets with category-color coding and format labels.

#### 7.2.4 AI Assistant Page

The AI Assistant page (`/#/assistant`) simulates an intelligent color matching interface with a two-panel layout. The left panel contains a textarea (max 300 characters, with live character counter in JetBrains Mono) for describing the desired look, an 8-option mood selector grid (Cinematic, Moody, Bright, Vintage, Dark, Dreamy, Bold, Natural), and a gradient-blue submit button. Four example prompts appear below the input area as clickable blue text triggers.

When the user submits a description or selects moods, the interface enters a 2.5-second simulated analysis phase: the submit button displays a spinning `Loader2` icon with "Analyzing..." text, the results panel shows a rotating loader with "Analyzing your preferences..." copy and animated thinking dots, and three shimmer placeholder cards animate a `background-position` sweep in an infinite loop. The `generateMockResults` function then parses the input for keywords ("wedding", "cyberpunk", "film", "luxury") and mood selections to return 3 ranked `MatchResult` objects with scores ranging from 78% to 96%. Each result card displays a circular SVG match score indicator (gold stroke for scores above 80%, blue for 50–80%), the preset thumbnail, category badge with accent color, a match reason explanation, and descriptive tags in blue pill format.

A "How It Works" section below the interface explains the 3-step matching pipeline (Analyze Input → Match Parameters → Ranked Results) with icon-accented step cards in a 3-column grid.

#### 7.2.5 Pricing Page

The Pricing page (`/#/pricing`) presents a 3-tier subscription structure: **Starter** (free, 25 presets across 5 categories, basic preview, community support), **Pro** ($29/month, all 125 presets and 125 LUTs, AI Assistant with 50 monthly queries, priority support, commercial license), and **Studio** ($79/month, everything in Pro plus 5 team seats, custom LUT generation, API access, dedicated account manager, unlimited AI queries). The Pro tier is visually emphasized with a gold gradient top border, `1px solid rgba(212,175,55,0.3)` card border, and a "Most Popular" badge. A monthly/yearly billing toggle (with "Save 20%" label) adjusts displayed prices via Framer Motion's `AnimatePresence`.

Below the pricing cards, a full feature comparison table organizes 16 features across 4 categories (Collection, Tools, Support, Licensing) with Starter, Pro, and Studio columns. Features render with animated checkmarks (gold for included, muted X for excluded) or string values for tier-limited capabilities. An FAQ accordion using Radix UI's `Accordion.Root` component addresses 8 common questions covering formats, licensing, installation, refunds, updates, tier switching, AI Assistant functionality, and educational discounts.

#### 7.2.6 Dashboard Page

The Dashboard page (`/#/dashboard`) implements a sidebar-layout application shell with 6 tabbed views managed by Radix UI's `Tabs.Root`. The **desktop sidebar** (collapsible from `260px` to `72px` width via a circular toggle button) displays the user avatar with gold-gradient initials, the plan badge ("Pro" with crown icon), 6 navigation items (Overview, My Presets, Favorites, Downloads, Activity, Settings), and a cloud sync status indicator showing "Synced" in green with a timestamp. The **mobile sidebar** renders as a slide-in drawer with `AnimatePresence` overlay.

The **Overview tab** presents a welcome message, 4 stat cards (Total Downloads, Presets Used, Favorites, Days Active) with color-coded icons, a recent activity timeline with gold dot markers and vertical connecting lines, and a Quick Actions panel with 3 shortcut buttons (Browse Library, Try AI Assistant, View Preview) plus a storage usage mini-bar (1.2 GB / 5 GB at 24%). The **My Presets tab** provides search, sort (Recent/Name/Category), and category filter pills over a grid of downloaded preset cards. The **Favorites tab** mirrors this layout with favorited presets and a remove-from-favorites action. The **Downloads tab** renders presets in a table layout with columns for name, category, format, date, size, and re-download action. The **Activity tab** shows the full activity timeline with 5 event types (download, favorite, preview, AI query, purchase), each with a color-coded icon. The **Settings tab** includes profile editing fields, plan management with upgrade button, notification and default format preferences with toggle switches, and a danger zone for account deletion.

### 7.3 Technical Stack

The CINEGRADE LAB platform is built on a modern React-based toolchain optimized for performance, developer experience, and visual fidelity. The architecture follows current industry best practices for single-page applications while leveraging animation and UI primitives that elevate the cinematic design language into interactive reality.

#### 7.3.1 Core Framework and Build System

At the foundation sits **React 19** (v19.2.0), the 2024 major release from Meta that introduces the React Compiler for automatic performance optimization and improved WebAssembly integration. React's dominance in the frontend framework landscape—documented at 44.7% usage among developers in the 2025 Stack Overflow Developer Survey with over 82% usage reported in the State of JS 2024 survey—makes it the de facto standard for component-based user interfaces[^525^]. The choice of React over emerging alternatives reflects the platform's need for a mature ecosystem with extensive component library compatibility and proven animation integration.

**TypeScript** (v5.9.3) provides static type checking across the entire codebase. Type definitions for presets (`Preset`, `PresetFormat`, `Category`), match results (`MatchResult`), dashboard items (`ActivityItem`, `PresetItem`), and component props ensure type safety throughout the 6-page application. This aligns with industry trends: an estimated 78% of React codebases now use TypeScript, and the language's adoption among frontend developers has risen steadily since 2020[^528^].

The build pipeline uses **Vite** (v7.2.4) with the `@vitejs/plugin-react` plugin. Vite's native ES modules development server and Rollup-based production bundler deliver significantly faster build times compared to legacy Webpack configurations. By July 2025, Vite surpassed Webpack in weekly npm downloads (32.6M vs 32.1M) and currently maintains approximately 84 million weekly downloads as of early 2026[^520^]. The State of JavaScript 2025 survey reports Vite usage at 84.4% among respondents, closing to within 2 percentage points of Webpack's 86.4% while achieving a 56% positive sentiment rating compared to Webpack's 14%[^522^]. The Vite configuration defines a path alias `@ → ./src` for clean module resolution, a `base: './'` setting for static deployment compatibility, and the `plugin-inspect-react-code` plugin for development-time component inspection.

**Tailwind CSS** (v3.4.19) handles all styling via utility-class composition. The framework's utility-first approach—where `flex`, `gap-4`, `text-sm`, and `bg-blue-600` classes compose directly in markup—eliminates the overhead of custom CSS file management and ensures consistent application of the design token system. Tailwind leads the CSS framework category with 37% of developers actively using it according to the State of CSS 2025 survey, commanding 31.1 million weekly downloads—12.5× more than Bootstrap's 2.5 million[^521^]. The Tailwind configuration extends the default theme with custom colors (`bg-dark: #0A0A0F`, `bg-card: #1A1A24`, `accent-gold: #D4AF37`, `accent-blue: #3A86FF`), font families (`display: Space Grotesk`, `body: Inter`, `mono: JetBrains Mono`), background gradients, and a `tailwindcss-animate` plugin for keyframe animations. The `darkMode: ["class"]` setting ensures the entire UI renders in dark mode by default.

**shadcn/ui** components provide the base primitive layer for accessible UI elements. The project includes 40+ shadcn/ui components—`accordion`, `dialog`, `slider`, `tabs`, `badge`, `input`, `select`, `switch`, `table`, `scroll-area`, `separator`, `sheet`, `skeleton`, `sonner`, and others—each styled with Tailwind utilities and built on Radix UI primitives for accessibility (ARIA attributes, keyboard navigation, focus management). This approach avoids the vendor-lock-in of all-in-one component libraries while ensuring that every interactive element meets WCAG accessibility standards.

| Technology | Version | Role | Rationale |
|------------|---------|------|-----------|
| React | 19.2.0 | UI framework | 44.7% developer usage [^525^]; mature component ecosystem; Framer Motion integration |
| TypeScript | 5.9.3 | Type system | 78% of React codebases use TS [^528^]; compile-time safety for 250+ item dataset |
| Vite | 7.2.4 | Build tool | 84M weekly downloads [^520^]; ES modules dev server; faster than Webpack |
| Tailwind CSS | 3.4.19 | Styling | 37% developer usage [^521^]; 31.1M weekly downloads; utility-first dark mode |
| shadcn/ui | latest | Component primitives | 40+ accessible components on Radix UI; no runtime dependency |
| Framer Motion | 12.39.0 | Animation library | Declarative React animations; `useMotionValue` for slider physics |
| GSAP | 3.15.0 | Scroll animation | ScrollTrigger for scroll-linked effects; industry-standard timing curves |
| Lucide React | 0.562.0 | Icon system | Tree-shakeable SVG icons; consistent 24×24 grid; 1,000+ icons |
| Radix UI | latest | Accessible primitives | ARIA-compliant dialogs, accordions, tabs, sliders; keyboard navigation |
| Lenis | 1.3.23 | Smooth scroll | `lerp: 0.08` interpolation; cinematic scroll feel across all pages |

The component architecture follows a page-based organization: six page components in `src/pages/` (Home, Library, Preview, Assistant, Pricing, Dashboard) share a common `Layout` wrapper and consume reusable components from `src/components/` (Navbar, Footer) and data modules from `src/data/` (presets, dashboardData). The `App.tsx` root component defines 6 routes through `react-router-dom`'s `HashRouter`—a deployment-appropriate choice for static hosting where server-side routing is unavailable.

#### 7.3.2 Animation and Motion System

Animation on the platform serves a functional purpose beyond decoration: it guides user attention, provides interaction feedback, and reinforces the cinematic quality of the brand. Two animation libraries operate in concert.

**Framer Motion** handles the majority of UI animations through declarative React props. Entrance animations use a standard "fade up" pattern (`opacity: 0→1`, `translateY: 40px→0`) triggered at 20% viewport visibility via `useInView`, with `easeOutExpo` (`cubic-bezier(0.16, 1, 0.3, 1)`) easing over 600ms duration. The `ComparisonSlider` on the Preview page uses `useMotionValue` and `useTransform` for reactive pointer tracking, enabling 1:1 slider movement without React re-renders. `AnimatePresence` manages mount/unmount animations for filter results, tab switching, toast notifications, and mobile drawer transitions. Staggered children receive incremental delays (`0.1s` per child) for sequential reveal effects on grids and lists.

**GSAP** (GreenSock Animation Platform) with the ScrollTrigger plugin handles scroll-linked effects. The library's `ScrollTrigger` with `scrub: 1` enables parallax and scroll-scrubbed animations tied to the user's scroll position, creating the cinematic depth effects in hero sections and category previews. GSAP's industry-standard easing curves ensure that scroll-linked motion feels physically grounded rather than mechanical.

Continuous ambient animations include a gradient text shimmer on CTA elements (`background-position` sliding 200% over 3s, infinite), a rotating loading spinner (360° over 1s, infinite), and pulse dots for live indicators (scale oscillation `0.8→1.2→0.8` over 2s). Page transitions use a coordinated exit-enter sequence: exit runs `opacity: 1→0` with `translateY: 0→-20px` over 300ms, while enter runs `opacity: 0→1` with `translateY: 20px→0` over 400ms after a 100ms delay.

#### 7.3.3 Routing and State Architecture

Client-side routing uses `HashRouter` from `react-router-dom` (v7.15.1), which prefixes all routes with `/#/` to ensure compatibility with static file hosting. Six routes are defined: `/` (Home), `/library` (Library), `/preview` (Preview), `/assistant` (AI Assistant), `/pricing` (Pricing), and `/dashboard` (Dashboard). The `Layout` component wraps all routes in a `min-h-[100dvh] flex flex-col` container with the `Navbar` fixed at `z-50` and the `Footer` at the page bottom. The `Navbar` component manages scroll-state opacity (transitioning from `rgba(10,10,15,0.85)` to `0.95` after 100px scroll), mobile drawer open/close with body scroll lock, and active link highlighting via `useLocation`.

State management remains local to components throughout the application—no external state library (Redux, Zustand, Jotai) is required. The Library page uses `useState` for search text, active category, active format, visible count, and mobile filter visibility, with `useMemo` computing filtered results. The AI Assistant uses `useState` for input text, selected moods, analyzing status, and result arrays. The Dashboard uses `useState` for active tab, sidebar collapse, search query, and filter/sort preferences. This local-state architecture is sufficient because the application does not require cross-component state sharing beyond what React's prop drilling and context can handle; the preset dataset (250 items across 25 categories) is imported as a static module rather than fetched from an API.

The deployment at `rvzhn4jucgc3m.kimi.page` serves the application as a static build (`vite build` output), making the `HashRouter` essential—`BrowserRouter` would require server-side fallback configuration that static hosting cannot provide. The `base: './'` setting in Vite ensures that all asset paths resolve relative to the deployment directory, enabling the application to function correctly regardless of the hosting path.
