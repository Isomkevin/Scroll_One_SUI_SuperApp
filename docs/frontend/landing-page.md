# Landing Page

## Purpose

This document describes the landing page architecture, features, and deployment for Scroll One SuperApp.

**Audience**: Frontend engineers, marketing team, DevOps engineers

## Overview

The landing page is a separate Next.js 14 application that serves as the marketing website and includes the Super Admin Dashboard.

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Features

### Marketing Pages

- **Hero Section**: Main value proposition
- **Features**: Key features showcase
- **About**: Product information
- **Download**: App download links (iOS, Android, APK)
- **Footer**: Links and information

### Super Admin Dashboard

- **Route**: `/admin-super` (hidden)
- **Access**: Super Admin role required
- **Features**: User management, transaction monitoring, system health

See [Admin Dashboard Documentation](../backend/admin-dashboard.md) for details.

## Project Structure

```
landing-page/
├── app/
│   ├── page.tsx              # Main landing page
│   ├── admin-super/          # Admin dashboard
│   ├── layout.tsx            # Root layout
│   └── sitemap.ts            # Sitemap generation
├── components/
│   ├── ui/                   # UI components
│   └── admin/                # Admin components
├── public/
│   └── downloads/            # APK downloads
├── tailwind.config.ts        # Tailwind configuration
└── package.json
```

## Design

### Design System

- **Glassmorphism**: Modern glass effects
- **Dark Mode**: Optimized dark theme
- **Gradients**: Scroll brand gradients
- **Responsive**: Mobile-first design

### Customization

**Update Download Links**:
Edit `app/page.tsx`:
```tsx
// iOS App Store
href="https://apps.apple.com/app/scroll-one-superapp"

// Google Play Store
href="https://play.google.com/store/apps/details?id=app.rork.scroll_one_superapp"

// APK Download
href="/downloads/scroll-one-superapp.apk"
```

**Update Content**:
All content in `app/page.tsx`:
- Hero section text
- Features list
- About section
- Footer links

**Update Colors**:
Edit `tailwind.config.ts`:
```ts
theme: {
  extend: {
    colors: {
      scroll: {
        // Scroll brand colors
      }
    }
  }
}
```

## Development

### Setup

```bash
cd landing-page
npm install
# or
bun install
```

### Run Development Server

```bash
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## Deployment

### Vercel Deployment

See [Landing Page Deployment](../deployment/landing-page.md) for detailed deployment instructions.

**Quick Deploy**:
```bash
cd landing-page
vercel
```

### Pre-Deployment Checklist

- [ ] Update download links
- [ ] Add APK file to `public/downloads/`
- [ ] Update domain in `robots.txt`
- [ ] Update sitemap domain
- [ ] Configure environment variables
- [ ] Test admin dashboard access

## SEO

### Metadata

- Open Graph tags
- Twitter Card tags
- Meta descriptions
- Canonical URLs

### Sitemap

**Location**: `app/sitemap.ts`

Automatically generates sitemap for search engines.

### robots.txt

**Location**: `public/robots.txt`

Configure search engine crawling.

## Performance

### Optimization

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Static Generation**: Static pages where possible
- **CDN**: Vercel CDN for static assets

### Core Web Vitals

- Optimized for LCP, FID, CLS
- Fast page loads
- Smooth interactions

## Environment Variables

**Required**:
```env
NEXT_PUBLIC_API_URL=https://api.scrollone.app
```

**Optional**:
```env
NEXT_PUBLIC_APP_URL=https://scrollone.app
```

## Admin Dashboard

The landing page includes the Super Admin Dashboard at `/admin-super`.

**Setup**: See [Admin Dashboard Setup](../deployment/admin-setup.md)

**Documentation**: See [Admin Dashboard Documentation](../backend/admin-dashboard.md)

## Maintenance

### Regular Updates

- Update download links when new versions released
- Update content as product evolves
- Monitor performance metrics
- Update dependencies regularly

### Monitoring

- Vercel Analytics
- Error tracking (if configured)
- Performance monitoring

---

**Related Documentation:**
- [Landing Page Deployment](../deployment/landing-page.md)
- [Admin Dashboard](../backend/admin-dashboard.md)
- [Deployment Guide](../deployment/environments.md)
