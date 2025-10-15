# AI Developer Portfolio

## Overview

This is a modern, single-page portfolio website built for an AI Developer/Machine Learning Engineer. The application showcases professional experience, technical skills, projects, and contact information through a polished, responsive interface. It features a contemporary dark/light theme system inspired by Linear and Vercel design aesthetics, with smooth animations and interactive elements.

The portfolio is built as a full-stack application with a React frontend and Express backend, though the current implementation primarily serves static content with minimal backend functionality (resume download endpoint).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter (lightweight client-side routing)
- **State Management:** TanStack React Query for server state
- **UI Components:** Radix UI primitives with shadcn/ui component library
- **Styling:** Tailwind CSS with custom design system
- **Build Tool:** Vite

**Design System:**
- Custom theme system with dark/light mode support using CSS variables
- Typography: Inter font family for UI/headings, JetBrains Mono for code/technical elements
- Color palette based on HSL values stored in CSS custom properties
- Responsive grid system with Tailwind breakpoints
- Component-level elevation system using CSS custom properties for hover/active states

**Key Design Decisions:**
- Chose shadcn/ui over pre-built component libraries for better customization and smaller bundle size
- Implemented theme switching with localStorage persistence and CSS class-based switching
- Used Radix UI primitives for accessibility compliance out of the box
- Single-page application structure for portfolio simplicity

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with Express
- **Language:** TypeScript with ES modules
- **Build:** esbuild for production bundling
- **Development:** tsx for TypeScript execution

**Server Structure:**
- Minimal REST API with single endpoint for resume download
- Express middleware for request logging and error handling
- Vite integration in development mode for HMR (Hot Module Replacement)
- Static file serving for production builds

**Key Design Decisions:**
- Lightweight backend since portfolio is primarily static content
- File-based storage approach (in-memory user storage interface exists but unused)
- Development/production environment separation with conditional Vite middleware
- Custom logging middleware for API request tracking

### Data Layer

**Database Setup:**
- Drizzle ORM configured for PostgreSQL
- Neon Database serverless driver for connection
- Schema defines basic user table (authentication prepared but not implemented)

**Current State:**
- Database infrastructure present but minimal usage
- User schema exists with username/password fields
- In-memory storage implementation as fallback/alternative

**Key Design Decisions:**
- Drizzle chosen for type-safe database queries and migrations
- PostgreSQL dialect selected for production scalability
- Schema-first approach with Zod validation integration

### Authentication & Authorization

**Current Implementation:**
- Authentication infrastructure prepared but not active
- User schema and storage interfaces defined
- No active authentication on portfolio routes

**Prepared Mechanisms:**
- User storage interface with methods for user retrieval and creation
- Session management preparation (connect-pg-simple imported)
- Password field in user schema (would need hashing implementation)

### File Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components (UI library)
│   │   ├── pages/         # Page components (Home, NotFound)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and query client
│   │   └── App.tsx        # Root application component
│   └── index.html         # HTML entry point
├── server/                # Backend application
│   ├── index.ts           # Express server setup
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data storage interfaces
│   └── vite.ts            # Vite development integration
├── shared/                # Shared code between client/server
│   └── schema.ts          # Database schema and types
└── attached_assets/       # Static assets (resume PDF, images)
```

## External Dependencies

### Third-Party UI Libraries
- **Radix UI:** Complete set of accessible, unstyled UI primitives (accordion, dialog, dropdown, etc.)
- **shadcn/ui:** Pre-built component collection using Radix UI and Tailwind CSS
- **Lucide React:** Icon library for consistent iconography

### Styling & Design
- **Tailwind CSS:** Utility-first CSS framework
- **class-variance-authority:** Type-safe component variant management
- **tailwind-merge:** Intelligent Tailwind class merging utility

### Data & Forms
- **React Hook Form:** Form state management
- **Zod:** Schema validation for forms and data
- **@hookform/resolvers:** Zod resolver integration for React Hook Form

### Database & ORM
- **Drizzle ORM:** TypeScript ORM for PostgreSQL
- **@neondatabase/serverless:** Neon serverless Postgres driver
- **drizzle-zod:** Zod schema generation from Drizzle schemas

### Build & Development Tools
- **Vite:** Fast frontend build tool and dev server
- **esbuild:** JavaScript bundler for backend production builds
- **tsx:** TypeScript execution for development
- **PostCSS:** CSS processing with Tailwind

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal:** Development error overlay
- **@replit/vite-plugin-cartographer:** Code navigation in Replit
- **@replit/vite-plugin-dev-banner:** Development environment indicator

### Utilities
- **wouter:** Lightweight routing library (~1.2KB)
- **date-fns:** Date utility library
- **clsx:** Conditional className utility
- **nanoid:** Unique ID generation

### Fonts
- **Google Fonts CDN:** Inter (primary UI font) and JetBrains Mono (code/technical font)