# Landing Page Deployment

## Purpose

This guide provides step-by-step instructions for deploying the landing page to Vercel.

**Audience**: DevOps engineers, frontend developers

## Prerequisites

- Node.js 18+ installed
- Vercel account (free tier works)
- Git repository (for GitHub integration)

## Deployment Methods

### Method 1: Vercel CLI (Fastest)

```bash
cd landing-page
npm install
npm run build

# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? scroll-one-landing (or your preferred name)
# - Directory? ./
# - Override settings? No
```

### Method 2: GitHub Integration (Recommended for CI/CD)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Landing page"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Automatic Deployments**:
   - Every push to `main` branch = Production deployment
   - Every push to other branches = Preview deployment

### Method 3: Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import Git repository or upload folder
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `landing-page`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click "Deploy"

## Pre-Deployment Checklist

### 1. Update Download Links

Edit `app/page.tsx` and update:

```tsx
// iOS App Store link
href="https://apps.apple.com/app/scroll-one-superapp"

// Google Play Store link
href="https://play.google.com/store/apps/details?id=app.rork.scroll_one_superapp"

// APK download (see APK_DOWNLOAD_URL in app/page.tsx)
const APK_DOWNLOAD_URL =
  "https://expo.dev/accounts/kevinisom9000/projects/scroll-one-sui-superapp/builds/13c6ee6d-e29f-4a36-a1f1-f2a3c4fddd40";
```

### 2. APK distribution

Link to the Expo EAS build page instead of hosting the APK in `public/downloads/`. Update `APK_DOWNLOAD_URL` after each new Android build.

### 3. Update Domain in robots.txt

Edit `public/robots.txt`:
```
Sitemap: https://your-actual-domain.vercel.app/sitemap.xml
```

### 4. Update Sitemap

Edit `app/sitemap.ts`:
```tsx
url: 'https://your-actual-domain.vercel.app',
```

## Environment Variables

### Required

```env
NEXT_PUBLIC_API_URL=https://api.scrollone.app
```

### Optional

```env
NEXT_PUBLIC_APP_URL=https://scrollone.app
```

### Setting in Vercel

1. Go to project settings
2. Navigate to "Environment Variables"
3. Add variables for Production, Preview, and Development
4. Redeploy after adding variables

## Custom Domain Setup

1. Go to project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed
5. Wait for DNS propagation (can take up to 24 hours)

## Performance Optimization

### Build Optimization

- Next.js automatically optimizes builds
- Images are optimized automatically
- Code is split automatically

### CDN

- Vercel CDN automatically serves static assets
- Global edge network for fast delivery

## Monitoring

### Vercel Analytics

1. Enable Vercel Analytics in project settings
2. View analytics in Vercel dashboard
3. Monitor Core Web Vitals

### Error Tracking

Configure error tracking service (Sentry, etc.) if needed.

## Post-Deployment

### Verification

- [ ] Landing page loads correctly
- [ ] Download links work
- [ ] Admin dashboard accessible (if configured)
- [ ] Mobile responsive
- [ ] SEO metadata correct

### Testing

- Test on multiple devices
- Test download links
- Test admin dashboard (if applicable)
- Check performance metrics

## Troubleshooting

### Build Fails

- Check Node.js version (18+)
- Verify all dependencies installed
- Check for TypeScript errors
- Review build logs

### Deployment Fails

- Check environment variables
- Verify build command
- Check output directory
- Review deployment logs

### Domain Not Working

- Verify DNS records
- Wait for DNS propagation
- Check SSL certificate status
- Verify domain configuration

---

**Related Documentation:**
- [Landing Page](./landing-page.md)
- [Environments](./environments.md)
- [Production Checklist](./production-checklist.md)
