
# 📜 InkAI Studio - Development Scripts Guide

> **Last Updated:** December 2024  
> **Version:** 1.0.0  
> **Maintainer:** Development Team

## Table of Contents
- [Overview](#overview)
- [Build & Development Scripts](#build--development-scripts)
- [Testing Scripts](#testing-scripts)
- [Quality Assurance Scripts](#quality-assurance-scripts)
- [Deployment Scripts](#deployment-scripts)
- [Utility Scripts](#utility-scripts)
- [Custom Workflows](#custom-workflows)

## Overview

This document provides comprehensive documentation for all npm scripts available in the InkAI Studio project. Each script is designed to streamline development, testing, and deployment processes.

## Build & Development Scripts

### `npm run dev` - Development Server
**Purpose:** Starts the Vite development server with hot module replacement (HMR)

```bash
npm run dev
# or
npm start
```

**Configuration:**
- **Port:** 8080 (configurable via `--port` flag)
- **Host:** `::` (listens on all network interfaces)
- **HMR:** Enabled for instant updates
- **Source Maps:** Enabled for debugging

**Environment Prerequisites:**
- Node.js 18+ installed
- Dependencies installed (`npm install`)
- Valid `.env` file with required variables

**Expected Output:**
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.1.100:8080/
  ➜  press h to show help
```

**Performance Considerations:**
- Initial startup: ~2-5 seconds
- HMR updates: <500ms
- Memory usage: ~150-300MB

**Common Issues & Solutions:**
```bash
# Port already in use
npm run dev -- --port 3000

# Clear cache if experiencing issues
npx vite --force

# Memory issues on large projects
export NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

### `npm run build` - Production Build
**Purpose:** Creates an optimized production build in the `dist/` directory

```bash
npm run build
```

**Build Process:**
1. **Type Checking** - Validates TypeScript types
2. **Asset Processing** - Optimizes images, fonts, and static files
3. **Code Splitting** - Creates separate chunks for better caching
4. **Minification** - Compresses JavaScript, CSS, and HTML
5. **Tree Shaking** - Removes unused code
6. **Bundle Analysis** - Generates build statistics

**Output Structure:**
```
dist/
├── assets/
│   ├── index-[hash].js      # Main application bundle
│   ├── vendor-[hash].js     # Third-party dependencies
│   └── style-[hash].css     # Compiled styles
├── images/                  # Optimized images
├── index.html              # Entry point
└── manifest.json           # PWA manifest
```

**Build Optimization Features:**
- **Gzip Compression** - Reduces bundle size by ~70%
- **Modern JavaScript** - ES2020+ with legacy fallbacks
- **CSS Purging** - Removes unused Tailwind classes
- **Image Optimization** - WebP conversion and responsive images

**Success Criteria:**
- Build completes without errors
- Bundle size < 1MB (excluding images)
- All routes accessible in preview mode
- Performance scores >90 in Lighthouse

### `npm run preview` - Production Preview
**Purpose:** Serves the production build locally for testing

```bash
npm run preview
```

**Use Cases:**
- Testing production build before deployment
- Validating bundle optimization
- Performance testing with production assets
- Final QA before release

**Expected Behavior:**
- Serves from `dist/` directory
- Mimics production environment
- No hot reloading (static files only)
- HTTPS available with `--https` flag

## Testing Scripts

### `npm run test` - Unit Testing
**Purpose:** Runs the complete test suite using Vitest

```bash
npm run test
```

**Test Categories:**
- **Component Tests** - React component rendering and behavior
- **Hook Tests** - Custom hook functionality
- **Utility Tests** - Helper function validation
- **Store Tests** - State management verification

**Configuration:**
```javascript
// vitest.config.ts
export default {
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts']
  }
}
```

**Coverage Reporting:**
```bash
npm run test:coverage
```

**Expected Coverage Targets:**
- **Statements:** >80%
- **Branches:** >75%
- **Functions:** >80%
- **Lines:** >80%

### `npm run test:watch` - Watch Mode Testing
**Purpose:** Runs tests in watch mode for active development

```bash
npm run test:watch
```

**Features:**
- Automatic re-run on file changes
- Interactive test filtering
- Snapshot update prompts
- Performance monitoring

### `npm run test:ui` - Visual Test Interface
**Purpose:** Opens Vitest UI for interactive test management

```bash
npm run test:ui
```

**Interface Features:**
- Visual test runner with results
- Code coverage visualization
- Test file navigation
- Real-time test execution

### `npm run test:e2e` - End-to-End Testing
**Purpose:** Runs Playwright end-to-end tests

```bash
npm run test:e2e
```

**Test Scenarios:**
- **Authentication Flow** - Login/logout/registration
- **Design Creation** - AI generation and editing
- **Gallery Navigation** - Browse, filter, and view designs
- **Artist Interaction** - Profile viewing and booking
- **Responsive Behavior** - Mobile and desktop experiences

**Browser Coverage:**
- Chromium (latest)
- Firefox (latest)
- WebKit (Safari equivalent)

## Quality Assurance Scripts

### `npm run lint` - Code Linting
**Purpose:** Runs ESLint to check code quality and style

```bash
npm run lint
npm run lint:fix  # Auto-fix issues
```

**Lint Rules:**
- **TypeScript** - Type safety and best practices
- **React** - Component and hook patterns
- **Accessibility** - WCAG compliance checks
- **Performance** - Optimization recommendations

**ESLint Configuration:**
```javascript
// eslint.config.js
export default [
  {
    extends: [
      '@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended'
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }
];
```

### `npm run type-check` - TypeScript Validation
**Purpose:** Validates TypeScript types without emitting files

```bash
npm run type-check
```

**Validation Scope:**
- Type compatibility across modules
- Interface implementation correctness
- Generic type constraint validation
- Import/export type consistency

### `npm run format` - Code Formatting
**Purpose:** Formats code using Prettier

```bash
npm run format
npm run format:check  # Check without modifying
```

**Format Configuration:**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

## Deployment Scripts

### `npm run deploy:staging` - Staging Deployment
**Purpose:** Deploys to staging environment for QA testing

```bash
npm run deploy:staging
```

**Deployment Process:**
1. Run build and tests
2. Upload to staging server
3. Update environment variables
4. Run smoke tests
5. Send notification to QA team

**Staging Environment:**
- **URL:** https://staging.inkai-studio.com
- **Database:** Staging Supabase project
- **Analytics:** Disabled
- **Error Tracking:** Enabled

### `npm run deploy:production` - Production Deployment
**Purpose:** Deploys to production environment

```bash
npm run deploy:production
```

**Pre-deployment Checks:**
- All tests passing
- Security audit clean
- Performance benchmarks met
- Staging approval received

**Production Deployment Steps:**
1. Create production build
2. Run security scans
3. Upload to CDN
4. Update DNS records
5. Monitor deployment health

### `npm run deploy:rollback` - Deployment Rollback
**Purpose:** Rolls back to previous production version

```bash
npm run deploy:rollback [version]
```

**Rollback Process:**
1. Identify previous stable version
2. Update CDN distribution
3. Revert database migrations if needed
4. Notify stakeholders
5. Monitor system health

## Utility Scripts

### `npm run analyze` - Bundle Analysis
**Purpose:** Analyzes bundle size and composition

```bash
npm run analyze
```

**Analysis Output:**
- Bundle size by route
- Third-party dependency impact
- Unused code identification
- Optimization recommendations

**Tools Used:**
- **webpack-bundle-analyzer** - Visual bundle analysis
- **source-map-explorer** - Source code mapping
- **bundlesize** - Size regression detection

### `npm run security:audit` - Security Audit
**Purpose:** Scans for security vulnerabilities

```bash
npm run security:audit
npm run security:fix  # Auto-fix issues
```

**Security Checks:**
- Dependency vulnerability scan
- License compliance check
- Code security pattern analysis
- Configuration security review

### `npm run clean` - Project Cleanup
**Purpose:** Removes build artifacts and cache files

```bash
npm run clean
```

**Cleanup Targets:**
- `dist/` directory
- `node_modules/.cache/`
- `.next/` (if applicable)
- `coverage/` reports
- Temporary files

### `npm run docs:generate` - Documentation Generation
**Purpose:** Generates API documentation from TypeScript interfaces

```bash
npm run docs:generate
```

**Documentation Output:**
- Component API references
- Type definitions documentation
- Hook usage examples
- Service interface documentation

## Custom Workflows

### `npm run setup:dev` - Development Environment Setup
**Purpose:** Complete development environment initialization

```bash
npm run setup:dev
```

**Setup Process:**
1. Install dependencies
2. Copy environment files
3. Initialize database
4. Seed development data
5. Run initial build
6. Start development server

### `npm run health:check` - System Health Check
**Purpose:** Validates all system components

```bash
npm run health:check
```

**Health Checks:**
- Database connectivity
- External API availability
- Environment variable validation
- Service endpoint status
- File system permissions

### `npm run migrate:dev` - Development Database Migration
**Purpose:** Runs database migrations in development

```bash
npm run migrate:dev
```

**Migration Process:**
1. Check current schema version
2. Apply pending migrations
3. Update type definitions
4. Seed development data
5. Validate schema integrity

## Script Execution Best Practices

### Performance Optimization
```bash
# Use parallel execution for independent tasks
npm run lint & npm run type-check & wait

# Optimize for CI/CD environments
npm ci  # Use lockfile for consistent installs
npm run build --silent  # Reduce output noise
```

### Error Handling
```bash
# Exit on first error
set -e
npm run lint
npm run test
npm run build

# Continue on error with logging
npm run lint || echo "Lint failed"
npm run test || echo "Tests failed"
```

### Environment-Specific Scripts
```bash
# Development
NODE_ENV=development npm run build:dev

# Production
NODE_ENV=production npm run build

# Testing
NODE_ENV=test npm run test
```

---

**Script Performance Benchmarks:**
- `npm run dev`: ~3-5 seconds startup
- `npm run build`: ~30-60 seconds
- `npm run test`: ~10-30 seconds
- `npm run lint`: ~5-15 seconds

**Version History:**
- v1.0.0 (December 2024) - Initial script documentation
- v0.9.0 (November 2024) - Testing script additions
- v0.8.0 (October 2024) - Build script optimization
