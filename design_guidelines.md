# AI Developer Portfolio - Design Guidelines

## Design Approach
**Selected Approach:** Reference-Based with Modern Tech Portfolio Aesthetics
Drawing inspiration from Linear, Vercel, and contemporary developer portfolios that balance technical professionalism with visual sophistication. The design emphasizes clarity, hierarchy, and subtle interactions that reflect the precision of AI/ML work.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background: 222 15% 8% (deep charcoal)
- Surface: 222 15% 12% (elevated dark)
- Primary: 217 91% 60% (vibrant blue - representing AI/tech)
- Accent: 142 76% 36% (emerald green - for success states, CTAs)
- Text Primary: 210 40% 98%
- Text Secondary: 215 20% 65%

**Light Mode:**
- Background: 0 0% 100%
- Surface: 210 40% 98%
- Primary: 217 91% 60%
- Accent: 142 71% 45%
- Text Primary: 222 47% 11%
- Text Secondary: 215 16% 47%

### B. Typography
**Font Stack:**
- Primary: 'Inter' (via Google Fonts CDN) - headings and UI
- Code/Technical: 'JetBrains Mono' - skill tags, technical details
- Body: 'Inter' with optimized line-height (1.7)

**Scale:**
- Hero H1: text-5xl md:text-7xl, font-bold
- Section H2: text-3xl md:text-5xl, font-bold
- Subsection H3: text-2xl md:text-3xl, font-semibold
- Body: text-base md:text-lg
- Caption: text-sm

### C. Layout System
**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 to p-8
- Section spacing: py-16 md:py-24
- Container max-width: max-w-7xl
- Content max-width: max-w-4xl (for text-heavy sections)

**Grid System:**
- Skills grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Projects: grid-cols-1 md:grid-cols-2 gap-8
- Experience: Single column with timeline design

## Page Structure & Sections

### 1. Hero Section (100vh)
- Large hero image: Abstract AI/neural network visualization or professional workspace (full-bleed background with gradient overlay: from-primary/20 to-background)
- Centered content with name as large display text
- Role subtitle: "AI Developer | ML Engineer"
- Brief tagline: "Building intelligent systems with 2+ years of hands-on ML/DL experience"
- CTA buttons: "View Projects" (primary) and "Download Resume" (outline with backdrop-blur-sm)
- Floating social links (GitHub, LinkedIn) with subtle hover lift
- Scroll indicator at bottom

### 2. About Section
- Two-column layout (lg:grid-cols-2)
- Left: Professional headshot or abstract tech visualization
- Right: Compelling narrative highlighting AI/ML expertise, key achievements, and passion for scalable solutions
- Stats row: Years of Experience | Projects Completed | Technologies Mastered (with animated counting)

### 3. Skills Section
- Multi-category pill/tag display organized in expandable groups:
  - AI/ML Frameworks (TensorFlow, PyTorch, etc.)
  - Languages & Tools
  - LLMs & NLP
  - Deployment & Cloud
- Interactive tag cloud or bento-box grid layout
- Each skill with subtle hover state (scale-105, shadow-lg)
- Use JetBrains Mono for skill names

### 4. Experience Timeline
- Vertical timeline with connector line (border-l-2 border-primary)
- Company cards with:
  - Logo placeholder area
  - Role and duration
  - Key achievements as bullet points
  - Tech stack badges at bottom
- Alternating card positions on desktop for visual rhythm

### 5. Projects Showcase
- Featured project cards (2-column grid on desktop)
- Each card includes:
  - Project thumbnail/icon area
  - Title and tech stack badges
  - Description (2-3 lines)
  - "View Details" link with arrow icon
- Hover effect: Subtle lift, border glow in primary color
- Consider a spotlight/featured project at top (full-width card)

### 6. Education & Achievements
- Split layout or accordion-style:
  - Education timeline (degrees with institutions)
  - Achievements grid (certificates, badges from HackerRank, workshops)
- Badge-style design for certifications with icons from Heroicons

### 7. Contact Section
- Centered layout with:
  - Large heading "Let's Build Something Together"
  - Email and phone with copy-to-clipboard functionality
  - Social links as larger interactive buttons
  - Optional: Simple contact form (name, email, message)
- Gradient background treatment

### 8. Footer
- Simple, centered design
- Quick links: Projects, Experience, Skills
- Copyright and "Built with [tech stack]" mention
- Social icons repeated

## Component Library

### Cards
- Rounded corners: rounded-xl
- Border: border border-white/10 (dark) or border-black/10 (light)
- Background: bg-surface with backdrop blur for glass effect
- Padding: p-6 to p-8
- Hover: translate-y-[-4px] shadow-2xl transition-all

### Buttons
- Primary: bg-accent text-white px-6 py-3 rounded-lg font-semibold
- Outline: border-2 border-white/20 backdrop-blur-sm (on hero images)
- Icon buttons: p-3 rounded-full hover:bg-primary/10

### Tags/Badges
- Inline-flex items-center px-3 py-1 rounded-full
- Background: bg-primary/10 text-primary (for tech stack)
- Font: font-mono text-sm

### Timeline Elements
- Vertical line: border-l-2 border-primary/30
- Timeline dots: w-4 h-4 rounded-full bg-primary with outer ring
- Content cards connected with positioning

## Images

**Hero Background:**
- Abstract neural network visualization or gradient mesh
- Dimensions: 1920x1080 minimum
- Treatment: Overlay with gradient (from-background/80 via-background/50 to-transparent)

**About Section Image:**
- Professional headshot or AI-themed illustration
- Dimensions: 800x800
- Shape: rounded-2xl with subtle border

**Project Thumbnails:**
- Representative screenshots or abstract tech graphics per project
- Dimensions: 600x400
- Treatment: rounded-lg with hover zoom effect

**Tech/Background Accents:**
- Subtle grid patterns or dot matrices in background (low opacity)
- Floating geometric shapes as decorative elements

## Animations (Minimal)
- Fade-in on scroll for sections (intersection observer)
- Number counting animation for stats
- Gentle hover transforms (scale, translate)
- Smooth page transitions
- NO complex animations, loading spinners, or distracting effects

## Accessibility & Quality
- Maintain WCAG AA contrast ratios in both modes
- Focus states: ring-2 ring-primary ring-offset-2
- Keyboard navigation support
- Semantic HTML structure
- Alt text for all images
- Consistent dark mode across all form inputs