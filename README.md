
# 🎨 InkAI Studio - AI-Powered Tattoo Design Platform

> Transform your ideas into stunning tattoo designs with artificial intelligence

[![Build Status](https://github.com/inkai-studio/inkai-studio/workflows/CI/badge.svg)](https://github.com/inkai-studio/inkai-studio/actions)
[![Deploy Status](https://img.shields.io/badge/deploy-success-brightgreen)](https://inkai-studio.lovable.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3+-blue)](https://reactjs.org/)

## 🌟 Features

✨ **AI-Powered Design Generation** - Create unique tattoo designs from text prompts  
🎨 **Professional Artist Network** - Connect with verified tattoo artists worldwide  
📱 **Responsive Design** - Seamless experience across all devices  
🔍 **Advanced Gallery** - Browse thousands of designs with smart filtering  
🎯 **Style Transfer** - Apply different artistic styles to existing designs  
⚡ **Real-time Collaboration** - Work with artists in real-time  
🔒 **Secure Platform** - Enterprise-grade security and privacy protection  
📊 **Performance Optimized** - Lightning-fast loading and smooth animations  

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher)
- **Git** (latest version)

**System Requirements:**
- **OS:** Windows 10+, macOS 12+, or Ubuntu 20.04+
- **RAM:** 4GB minimum, 8GB recommended
- **Storage:** 2GB free space

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/inkai-studio/inkai-studio.git
   cd inkai-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following variables in `.env`:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # AI Service Configuration (Optional)
   VITE_AI_API_KEY=your_ai_api_key
   VITE_AI_BASE_URL=your_ai_service_url
   
   # Analytics (Optional)
   VITE_ANALYTICS_ID=your_analytics_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080` to see the application.

### Development Setup

**For optimal development experience:**

1. **Install recommended VS Code extensions:**
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - TypeScript Importer
   - Prettier - Code formatter

2. **Enable format on save:**
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```

### Common Setup Issues

**Issue: `npm install` fails with permission errors**
```bash
# Solution: Use npm with node version manager
nvm use 18
npm install
```

**Issue: Port 8080 already in use**
```bash
# Solution: Use a different port
npm run dev -- --port 3000
```

**Issue: Supabase connection errors**
- Verify your Supabase URL and API key in `.env`
- Ensure your Supabase project is running
- Check network connectivity and firewall settings

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern UI library with concurrent features
- **TypeScript 5.0+** - Type-safe JavaScript development
- **Vite** - Next-generation frontend build tool

### Styling & Design
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion 12.16.0** - Production-ready motion library
- **shadcn/ui** - Re-usable component library
- **Lucide React** - Beautiful & consistent icon library

### State Management
- **Zustand 5.0.5** - Lightweight state management
- **TanStack Query 5.56.2** - Powerful data synchronization

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
  - Authentication & user management
  - PostgreSQL database
  - Real-time subscriptions
  - File storage & CDN

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **PostCSS** - CSS transformation
- **Lovable Tagger** - Component development tooling

## 📖 Development Guide

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base shadcn/ui components
│   ├── gallery/        # Gallery-specific components
│   └── studio/         # Design studio components
├── pages/              # Route-level page components
├── hooks/              # Custom React hooks
├── stores/             # Zustand state stores
├── services/           # Business logic services
├── types/              # TypeScript type definitions
├── lib/                # Utility libraries
└── integrations/       # External service integrations
```

### Coding Standards

**Component Guidelines:**
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the single responsibility principle
- Write comprehensive JSDoc comments

**State Management:**
- Use Zustand for global state
- Keep local state in components when possible
- Implement proper error boundaries
- Handle loading and error states

**Styling Guidelines:**
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS custom properties for theming

### Git Workflow

**Branch Strategy:**
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `hotfix/*` - Critical production fixes

**Commit Convention:**
```
type(scope): description

feat(auth): add OAuth login support
fix(gallery): resolve image loading issue
docs(readme): update installation guide
style(ui): improve button hover states
```

**Pull Request Process:**
1. Create feature branch from `develop`
2. Implement changes with tests
3. Update documentation if needed
4. Submit PR with clear description
5. Address review feedback
6. Merge after approval

### Testing Strategy

**Unit Testing:**
```bash
npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

**E2E Testing:**
```bash
npm run test:e2e       # End-to-end tests
npm run test:e2e:ui    # Interactive mode
```

**Performance Testing:**
```bash
npm run lighthouse     # Performance audit
npm run bundle-analyzer # Bundle analysis
```

## 🚀 Deployment

### Build Process

**Production Build:**
```bash
npm run build          # Create production build
npm run preview        # Preview production build
```

**Build Optimization:**
- Automatic code splitting
- Image optimization
- CSS purging and minification
- Bundle compression

### Deployment Options

**1. Lovable Platform (Recommended)**
```bash
# Deploy directly from Lovable interface
# Click "Publish" in the top-right corner
```

**2. Vercel**
```bash
npm install -g vercel
vercel --prod
```

**3. Netlify**
```bash
# Build command: npm run build
# Publish directory: dist
```

**4. Self-Hosted**
```bash
npm run build
# Upload dist/ folder to your web server
```

### Environment Configuration

**Production Environment Variables:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_key
VITE_APP_URL=https://your-domain.com
```

### Monitoring & Analytics

**Performance Monitoring:**
- Core Web Vitals tracking
- Error boundary reporting
- User interaction analytics
- Server response time monitoring

**Health Checks:**
- `/api/health` - Application health
- Database connectivity
- External service status
- CDN performance

## 📊 Performance Metrics

### Target Performance Goals
- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms

### Optimization Techniques
- Route-based code splitting
- Image lazy loading and optimization
- Component-level lazy loading
- Service worker caching
- CDN integration for static assets

## 🔧 Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npx vite --force
```

**TypeScript Errors:**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update type definitions
npm update @types/*
```

**Supabase Connection Issues:**
- Verify environment variables
- Check Supabase project status
- Review Row Level Security policies
- Confirm API key permissions

### Getting Help

**Community Support:**
- [GitHub Issues](https://github.com/inkai-studio/inkai-studio/issues)
- [Discord Community](https://discord.gg/inkai-studio)
- [Documentation](https://docs.inkai-studio.com)

**Commercial Support:**
- Email: support@inkai-studio.com
- Priority support for enterprise customers

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting pull requests.

### Development Setup for Contributors

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code of Conduct

Please review and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment for all contributors.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** - For the excellent component library
- **Supabase** - For the robust backend platform
- **Framer Motion** - For smooth animations
- **Tailwind CSS** - For the utility-first styling approach
- **React Team** - For the amazing framework

---

**Project Stats:**
- **Created:** October 2024
- **Last Updated:** December 2024
- **Contributors:** 5+
- **GitHub Stars:** 100+
- **Live Demo:** [inkai-studio.lovable.app](https://inkai-studio.lovable.app)

For more information, visit our [website](https://inkai-studio.com) or join our [community](https://discord.gg/inkai-studio).
