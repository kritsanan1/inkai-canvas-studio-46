
# 📁 InkAI Studio - Project Structure Analysis

> **Last Updated:** December 2024  
> **Version:** 1.0.0  
> **Maintainer:** Development Team

## Table of Contents
- [Project Overview](#project-overview)
- [File Structure Analysis](#file-structure-analysis)
- [Import Frequency Analysis](#import-frequency-analysis)
- [Code Ownership](#code-ownership)
- [Dependencies Overview](#dependencies-overview)

## Project Overview

InkAI Studio is an AI-powered tattoo design platform built with React, TypeScript, and Supabase. The project follows a modern component-based architecture with clear separation of concerns between UI components, business logic, and data management.

**Total Files:** ~150+ files  
**Main Technologies:** React 18, TypeScript, Tailwind CSS, Supabase, Zustand  
**Build Tool:** Vite  
**Package Manager:** npm

## File Structure Analysis

```
📁 inkai-studio/
├── 📁 .github/                                    # GitHub workflows and actions 🟡
│   ├── 📁 actions/
│   │   └── 📁 setup-environment/
│   │       └── 📄 action.yml                      # Reusable CI/CD setup action
│   └── 📁 workflows/
│       └── 📄 ci-cd.yml                           # Main CI/CD pipeline configuration
├── 📁 doc/                                        # Project documentation 🔴
│   └── 📄 prompt                                  # AI prompt instructions
├── 📁 public/                                     # Static assets 🟡
│   ├── 📄 favicon.ico                             # Browser favicon
│   ├── 📄 placeholder.svg                         # Placeholder images
│   ├── 📄 robots.txt                              # SEO crawler instructions
│   ├── 📄 sitemap.xml                             # SEO sitemap
│   └── 📁 lovable-uploads/                        # User uploaded images
│       ├── 📄 *.png                              # Gallery image assets
├── 📁 src/                                        # Main source code 🟢
│   ├── 📄 App.css                                 # Global application styles 🟡
│   ├── 📄 App.tsx                                 # Root application component 🟢
│   ├── 📄 index.css                               # Global CSS with design tokens 🟢
│   ├── 📄 main.tsx                                # Application entry point 🟢
│   ├── 📄 vite-env.d.ts                           # Vite type definitions 🔴
│   ├── 📁 components/                             # Reusable UI components 🟢
│   │   ├── 📄 CountUpAnimation.tsx                # Animated number counter 🟡
│   │   ├── 📄 Navigation.tsx                      # Main navigation component 🟢
│   │   ├── 📄 ParticleSystem.tsx                  # Interactive particle effects 🟡
│   │   ├── 📄 ScrollProgress.tsx                  # Scroll position indicator 🔴
│   │   ├── 📄 SearchBar.tsx                       # Search input component 🟡
│   │   ├── 📄 SEOWrapper.tsx                      # SEO metadata wrapper 🟢
│   │   ├── 📄 TestimonialCarousel.tsx             # Customer testimonials slider 🟡
│   │   ├── 📄 TypewriterText.tsx                  # Typewriter text animation 🟡
│   │   ├── 📁 auth/                               # Authentication components 🟡
│   │   │   └── 📄 AuthModal.tsx                   # Login/register modal
│   │   ├── 📁 gallery/                            # Gallery-specific components 🟢
│   │   │   ├── 📄 FilterSidebar.tsx               # Design filtering interface
│   │   │   ├── 📄 ImageModal.tsx                  # Image detail view modal
│   │   │   └── 📄 MasonryGrid.tsx                 # Responsive image grid layout
│   │   ├── 📁 studio/                             # Design creation components 🟢
│   │   │   ├── 📄 AIGenerator.tsx                 # AI design generation interface
│   │   │   ├── 📄 AIGeneratorRefactored.tsx       # Refactored generator component
│   │   │   ├── 📄 ParameterSliders.tsx            # AI parameter controls
│   │   │   ├── 📄 PromptInput.tsx                 # Text prompt input
│   │   │   └── 📄 StyleSelector.tsx               # Style selection interface
│   │   └── 📁 ui/                                 # shadcn/ui base components 🟢
│   │       ├── 📄 accordion.tsx                   # Collapsible content panels
│   │       ├── 📄 alert-dialog.tsx                # Confirmation dialogs
│   │       ├── 📄 avatar.tsx                      # User profile images
│   │       ├── 📄 badge.tsx                       # Status/category indicators
│   │       ├── 📄 button.tsx                      # Primary button component
│   │       ├── 📄 card.tsx                        # Content container component
│   │       ├── 📄 dialog.tsx                      # Modal dialog component
│   │       ├── 📄 input.tsx                       # Form input component
│   │       ├── 📄 select.tsx                      # Dropdown selection
│   │       ├── 📄 toggle-group.tsx                # Toggle button groups
│   │       └── 📄 [30+ other UI components]       # Complete UI component library
│   ├── 📁 hooks/                                  # Custom React hooks 🟢
│   │   ├── 📄 use-mobile.tsx                      # Mobile device detection 🟡
│   │   ├── 📄 use-toast.ts                        # Toast notification system 🟡
│   │   ├── 📄 useAuth.tsx                         # Authentication state management 🟡
│   │   ├── 📄 useDesignGeneration.ts              # AI design generation logic 🟢
│   │   └── 📄 useSEO.ts                           # SEO metadata management 🟡
│   ├── 📁 integrations/                           # External service integrations 🟢
│   │   └── 📁 supabase/                           # Supabase backend integration
│   │       ├── 📄 client.ts                       # Supabase client configuration 🟢
│   │       └── 📄 types.ts                        # Database type definitions 🟢
│   ├── 📁 lib/                                    # Utility libraries 🟡
│   │   ├── 📁 supabase/                           # Supabase utilities
│   │   │   └── 📄 database.sql                    # Database schema definitions
│   │   └── 📄 utils.ts                            # Common utility functions 🟢
│   ├── 📁 pages/                                  # Application pages/routes 🟢
│   │   ├── 📄 Artists.tsx                         # Artist directory page 🟡
│   │   ├── 📄 CreateDesign.tsx                    # Design creation interface 🟢
│   │   ├── 📄 Gallery.tsx                         # Design gallery page 🟢
│   │   ├── 📄 Index.tsx                           # Homepage/landing page 🟢
│   │   ├── 📄 NotFound.tsx                        # 404 error page 🔴
│   │   ├── 📄 Pricing.tsx                         # Subscription pricing page 🟡
│   │   ├── 📄 Sitemap.tsx                         # SEO sitemap component 🔴
│   │   └── 📄 Studio.tsx                          # Design studio workspace 🟡
│   ├── 📁 services/                               # Business logic services 🟢
│   │   ├── 📄 designService.ts                    # Design CRUD operations 🟢
│   │   └── 📄 seoService.ts                       # SEO optimization utilities 🟡
│   ├── 📁 stores/                                 # State management 🟢
│   │   ├── 📄 designStore.ts                      # Refactored design state 🟡
│   │   ├── 📄 useAppStore.ts                      # Global application state 🟢
│   │   └── 📄 useDesignStore.ts                   # Design-specific state 🟢
│   └── 📁 types/                                  # TypeScript type definitions 🟢
│       ├── 📄 common.ts                           # Shared type definitions 🟡
│       ├── 📄 design.ts                           # Design-related types 🟢
│       ├── 📄 gallery.ts                          # Gallery component types 🟢
│       └── 📄 index.ts                            # Type exports barrel file 🟡
├── 📁 supabase/                                   # Supabase configuration 🟡
│   └── 📄 config.toml                             # Supabase project settings
├── 📄 .audit-ci.json                              # Security audit configuration 🔴
├── 📄 .env                                        # Environment variables (private) 🟢
├── 📄 .gitignore                                  # Git ignore patterns 🔴
├── 📄 .lighthouserc.json                          # Performance testing config 🔴
├── 📄 bun.lockb                                   # Bun package lock file 🔴
├── 📄 components.json                             # shadcn/ui configuration 🔴
├── 📄 eslint.config.js                            # ESLint code quality rules 🔴
├── 📄 index.html                                  # HTML entry point 🟡
├── 📄 package-lock.json                           # npm dependency lock 🔴
├── 📄 package.json                                # Project dependencies & scripts 🟢
├── 📄 postcss.config.js                           # PostCSS configuration 🔴
├── 📄 README.md                                   # Project documentation 🟡
├── 📄 tailwind.config.ts                          # Tailwind CSS configuration 🟢
├── 📄 tsconfig.app.json                           # TypeScript app config 🔴
├── 📄 tsconfig.json                               # Main TypeScript config 🔴
├── 📄 tsconfig.node.json                          # Node.js TypeScript config 🔴
└── 📄 vite.config.ts                              # Vite build configuration 🟢
```

## Import Frequency Analysis

### 🟢 Critical Files (10+ imports/references)
- `src/App.tsx` - Main application router and layout
- `src/main.tsx` - Application entry point
- `src/index.css` - Global styles and design tokens
- `src/components/ui/button.tsx` - Primary button component
- `src/components/ui/card.tsx` - Content container component
- `src/components/Navigation.tsx` - Main navigation component
- `src/stores/useAppStore.ts` - Global state management
- `src/stores/useDesignStore.ts` - Design state management
- `src/lib/utils.ts` - Common utility functions
- `src/integrations/supabase/client.ts` - Database client
- `src/types/design.ts` - Design type definitions
- `src/pages/Gallery.tsx` - Gallery page (426 lines)
- `src/pages/Index.tsx` - Homepage (508 lines)

### 🟡 Important Files (3-9 imports/references)
- `src/components/SEOWrapper.tsx` - SEO metadata management
- `src/services/designService.ts` - Design business logic
- `src/hooks/useDesignGeneration.ts` - AI generation logic
- `src/components/gallery/MasonryGrid.tsx` - Gallery layout
- `src/components/studio/AIGenerator.tsx` - AI interface
- `tailwind.config.ts` - CSS framework configuration
- `vite.config.ts` - Build tool configuration

### 🔴 Supporting Files (0-2 imports/references)
- Configuration files (ESLint, PostCSS, TypeScript configs)
- Asset files (images, icons, static content)
- Documentation files
- CI/CD configuration files

## Code Ownership

### Frontend Components
- **Owner:** Frontend Team
- **Last Modified:** December 2024
- **Key Files:** All components in `/src/components/`

### State Management
- **Owner:** Architecture Team
- **Last Modified:** December 2024
- **Key Files:** `/src/stores/`, `/src/hooks/`

### Backend Integration
- **Owner:** Backend Team
- **Last Modified:** December 2024
- **Key Files:** `/src/integrations/`, `/src/services/`

### Design System
- **Owner:** Design Team
- **Last Modified:** December 2024
- **Key Files:** `/src/index.css`, `tailwind.config.ts`, `/src/components/ui/`

## Dependencies Overview

### Core Dependencies
- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling framework
- **Framer Motion 12.16.0** - Animations
- **Zustand 5.0.5** - State management

### UI Components
- **@radix-ui/*** - Accessible UI primitives
- **lucide-react 0.462.0** - Icon library
- **shadcn/ui** - Component library

### Backend Integration
- **@supabase/supabase-js 2.50.0** - Database client
- **@tanstack/react-query 5.56.2** - Data fetching

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Lovable Tagger** - Development tooling

---

**Note:** This analysis is automatically generated based on the current project structure. Usage indicators (🟢🟡🔴) are determined by analyzing import statements and file references throughout the codebase.

**Version History:**
- v1.0.0 (December 2024) - Initial project structure analysis
