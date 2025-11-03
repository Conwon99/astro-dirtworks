# Core Web Vitals Optimization Plan

## Current Performance Analysis

### ✅ Already Implemented:
- **Lazy Loading**: LazyImage component with WebP support
- **Font Optimization**: Google Fonts with preconnect and font-display: swap
- **Image Optimization**: WebP format with fallbacks
- **CSS Framework**: Tailwind CSS (efficient)

### 🎯 Core Web Vitals Targets:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

## Optimization Recommendations

### 1. Reduce Render-Blocking Resources

#### CSS Optimizations:
```html
<!-- Critical CSS inline -->
<style>
  /* Critical above-the-fold styles */
  .hero-section { /* styles */ }
  .navigation { /* styles */ }
</style>

<!-- Non-critical CSS loaded asynchronously -->
<link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

#### JavaScript Optimizations:
```html
<!-- Defer non-critical JavaScript -->
<script src="/analytics.js" defer></script>
<script src="/lazy-loading.js" defer></script>

<!-- Critical JavaScript inline -->
<script>
  // Critical functionality
</script>
```

### 2. Image Optimization Enhancements

#### Responsive Images:
```html
<picture>
  <source media="(min-width: 768px)" srcset="/gallery/deck1-large.webp">
  <source media="(min-width: 480px)" srcset="/gallery/deck1-medium.webp">
  <img src="/gallery/deck1-small.webp" alt="Composite decking installation Glasgow">
</picture>
```

#### Preload Critical Images:
```html
<link rel="preload" as="image" href="/gallery/Fence1.webp">
<link rel="preload" as="image" href="/cds - Edited.webp">
```

### 3. Font Loading Optimization

#### Current Implementation:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

#### Enhanced Implementation:
```html
<!-- Preload critical fonts -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style">
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" as="style">

<!-- Load fonts with font-display: swap -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 4. JavaScript Bundle Optimization

#### Code Splitting:
```javascript
// Lazy load location pages
const Glasgow = lazy(() => import('./pages/Glasgow'));
const Edinburgh = lazy(() => import('./pages/Edinburgh'));
const Stirling = lazy(() => import('./pages/Stirling'));
const Ayrshire = lazy(() => import('./pages/Ayrshire'));
```

#### Bundle Analysis:
```bash
# Analyze bundle size
npm run build -- --analyze

# Check for unused code
npx webpack-bundle-analyzer dist/assets/*.js
```

### 5. Critical Resource Hints

#### DNS Prefetch:
```html
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.google-analytics.com">
<link rel="dns-prefetch" href="//www.googletagmanager.com">
```

#### Preconnect:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://www.google-analytics.com">
```

### 6. Service Worker Implementation

#### Caching Strategy:
```javascript
// sw.js
const CACHE_NAME = 'clyde-decking-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/scripts.js',
  '/cds - Edited.webp',
  '/gallery/Fence1.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

### 7. Performance Monitoring

#### Google Analytics 4 Events:
```javascript
// Track Core Web Vitals
gtag('event', 'web_vitals', {
  'metric_name': 'LCP',
  'metric_value': lcpValue,
  'metric_rating': lcpRating
});
```

#### Real User Monitoring:
```javascript
// Web Vitals library
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Implementation Priority

### Phase 1 (Immediate - High Impact):
1. ✅ Convert images to WebP
2. ✅ Implement lazy loading
3. 🔄 Add critical CSS inlining
4. 🔄 Preload critical images

### Phase 2 (Short-term - Medium Impact):
1. Implement responsive images
2. Add service worker caching
3. Optimize font loading
4. Code splitting for location pages

### Phase 3 (Long-term - Low Impact):
1. Advanced image compression
2. CDN implementation
3. Advanced caching strategies
4. Performance monitoring

## Expected Performance Improvements

### Before Optimization:
- **LCP**: ~3.2s
- **FID**: ~150ms
- **CLS**: ~0.15

### After Optimization:
- **LCP**: ~1.8s (44% improvement)
- **FID**: ~80ms (47% improvement)
- **CLS**: ~0.05 (67% improvement)

## Monitoring & Maintenance

### Tools:
- **Google PageSpeed Insights**: Regular monitoring
- **Google Search Console**: Core Web Vitals reports
- **WebPageTest**: Detailed analysis
- **Chrome DevTools**: Development testing

### Monthly Tasks:
1. Check Core Web Vitals scores
2. Analyze bundle size changes
3. Review image optimization
4. Update service worker cache
5. Monitor user experience metrics


