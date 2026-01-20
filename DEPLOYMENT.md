# Deployment Guide

This document provides comprehensive deployment instructions for the User Management Dashboard.

## Pre-Deployment Checklist

- [ ] Code review completed
- [ ] All tests passing (`npm run lint`)
- [ ] Environment variables configured
- [ ] Build tested locally (`npm run build`)
- [ ] API endpoints verified
- [ ] Error handling tested
- [ ] Performance benchmarks acceptable

## Environment Configuration

### Development
```bash
cp .env.example .env
# Edit .env with development settings
npm run dev:full
```

### Production
```bash
# Set production environment variables
export VITE_API_URL=https://api.yourdomain.com
npm run build
```

## Building for Production

### 1. Install Dependencies
```bash
npm install --omit=dev
```

### 2. Build Optimized Bundle
```bash
npm run build
```

Expected output:
- `dist/index.html` - Main HTML file
- `dist/assets/` - JavaScript and CSS bundles
- Total bundle size should be < 500KB gzipped

### 3. Test Production Build
```bash
npm run preview
```

Visit `http://localhost:4173` and verify:
- Dashboard loads without errors
- All features work (search, sort, CRUD)
- No console errors in DevTools

## Deployment Platforms

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables in Vercel dashboard
6. Deploy

```bash
npm i -g vercel
vercel --prod
```

### Netlify

1. Connect GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables
4. Deploy

Or use CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/user-dashboard/', // repo name
})
```

2. Build and deploy:
```bash
npm run build
npm install --save-dev gh-pages
npm run deploy
```

### Docker Deployment

1. Build Docker image:
```bash
docker build -t user-dashboard:1.0.0 .
```

2. Run container:
```bash
docker run -p 80:80 user-dashboard:1.0.0
```

3. Push to Docker Hub:
```bash
docker tag user-dashboard:1.0.0 yourusername/user-dashboard:1.0.0
docker push yourusername/user-dashboard:1.0.0
```

### Traditional Server (Apache/Nginx)

#### Apache
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/user-dashboard/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## API Configuration for Production

Update `src/utils/api.js` for production:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Add request/response interceptors if needed
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};
```

## Performance Optimization

### 1. Enable Compression
- Gzip compression should be enabled on server
- Modern browsers support Brotli compression for even better ratio

### 2. Enable Caching
- Set long cache headers for static assets (JS, CSS, images)
- Use short/no cache for HTML files

### 3. CDN Integration
- Serve assets through CDN (Cloudflare, AWS CloudFront)
- Reduces server load and improves global latency

### 4. Monitor Performance
- Use Lighthouse for performance audits
- Track Core Web Vitals (LCP, FID, CLS)
- Monitor bundle size with `npm run build`

## Security Considerations

### Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

### HTTPS
- Always use HTTPS in production
- Set HSTS header to enforce HTTPS

### API Security
- Validate all API requests
- Use environment variables for sensitive data (never commit API keys)
- Implement rate limiting on backend
- Use CORS properly

### Dependencies
- Regularly update dependencies: `npm update`
- Check for vulnerabilities: `npm audit`
- Review package security: `npm audit --fix`

## Monitoring & Analytics

### Error Tracking
Integrate error tracking service (Sentry, LogRocket):
```javascript
// In main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
});
```

### Performance Monitoring
- Use Web Vitals library for Core Web Vitals
- Track API response times
- Monitor user interactions

### Usage Analytics
- Implement analytics (Google Analytics, Mixpanel)
- Track user flows and feature usage
- Identify performance bottlenecks

## Rollback Plan

If issues occur in production:

1. **Immediate Rollback**
   - Revert to previous deployment
   - Most platforms support one-click rollback

2. **Troubleshooting**
   - Check browser console for errors
   - Review server logs
   - Test API connectivity
   - Verify database connectivity

3. **Post-Incident**
   - Document the issue
   - Implement fixes in development
   - Add tests to prevent recurrence

## Maintenance

### Regular Tasks
- Update dependencies monthly: `npm update`
- Security audit quarterly: `npm audit`
- Performance audit monthly
- Monitor error rates and logs

### Database Maintenance
- Backup data regularly
- Monitor database size
- Clean up old records as needed

### Updates
```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update major versions (carefully!)
npm install package@latest
```

## Support & Troubleshooting

### Common Issues

**Issue: Blank page after deployment**
- Check browser console for errors
- Verify environment variables are set
- Check API base URL configuration

**Issue: API calls failing**
- Verify API server is running
- Check CORS settings
- Verify API endpoints are correct

**Issue: Styling not loading**
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS files in network tab
- Verify asset paths are correct

**Issue: High bundle size**
- Analyze bundle: `npm run build -- --analyze`
- Remove unused dependencies
- Enable code splitting in config

---

**Need help?** Review the main [README.md](README.md) or check component documentation in source files.
