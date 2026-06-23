# Deployment Guide

## Quick Deploy to Vercel

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

## Before Deploying

### 1. Update Download Links

The APK path is defined at the top of `app/page.tsx`:

```tsx
const APK_DOWNLOAD_URL =
  "https://expo.dev/accounts/kevinisom9000/projects/scroll-one-sui-superapp/builds/13c6ee6d-e29f-4a36-a1f1-f2a3c4fddd40";
```

### 2. APK distribution

APKs are distributed via **Expo EAS** build pages (not `public/downloads/`). After each new build, update `APK_DOWNLOAD_URL` in `app/page.tsx`.

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

## Environment Variables (Optional)

If you need environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables like:
   - `NEXT_PUBLIC_APP_URL` = Your landing page URL
   - `NEXT_PUBLIC_API_URL` = Your API URL (if needed)

## Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificate

## Performance Optimization

The landing page is already optimized with:
- ✅ Next.js 14 App Router
- ✅ Automatic code splitting
- ✅ Image optimization (when you add images)
- ✅ Font optimization
- ✅ CSS optimization

## Monitoring

Vercel provides:
- Real-time analytics
- Performance metrics
- Error tracking
- Web Vitals monitoring

Access via: Vercel Dashboard → Your Project → Analytics

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Styles Not Loading

- Ensure `tailwind.config.ts` includes all content paths
- Check `postcss.config.js` is present
- Verify `globals.css` imports Tailwind directives

### Deployment Issues

- Check Vercel build logs in dashboard
- Ensure Node.js version is compatible (Vercel auto-detects)
- Verify all dependencies are in `package.json`

## Post-Deployment Checklist

- [ ] Test all download links
- [ ] Verify mobile responsiveness
- [ ] Check animations work correctly
- [ ] Test on different browsers
- [ ] Verify SEO metadata
- [ ] Test APK download (if applicable)
- [ ] Check analytics tracking (if added)
- [ ] Verify custom domain (if used)

---

**Need Help?** Check [Vercel Documentation](https://vercel.com/docs) or [Next.js Documentation](https://nextjs.org/docs)
