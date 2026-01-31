# Optimize Images

## Goal
Optimize all images in the portfolio project for web delivery - convert to modern formats (WebP), compress, and generate responsive sizes.

## Problem Statement
From ANALYSE_COMPLETE.md (lines 197-200):
- No lazy loading systématique
- No webp/modern formats
- No responsive images (srcset)
- Images not optimized for web

## Inputs
- Source images in `frontend/public/images/`
- Project images in `backend/media/projects/`
- Blog images in `backend/media/blog/`

## Tools/Scripts
- `execution/optimize_images.py` - Batch image optimization script
- Uses: Pillow (Python) or sharp (Node.js)

## Steps

### 1. Audit Current Images
```bash
# Find all images
find frontend/public/images -type f \( -iname "*.jpg" -o -iname "*.png" -o -iname "*.jpeg" \)
find backend/media -type f \( -iname "*.jpg" -o -iname "*.png" -o -iname "*.jpeg" \)

# Check sizes
du -sh frontend/public/images/*
du -sh backend/media/projects/*
```

### 2. Backup Original Images
```bash
# Copy to .tmp for safety
mkdir -p .tmp/images_backup
cp -r frontend/public/images .tmp/images_backup/
cp -r backend/media .tmp/images_backup/
```

### 3. Run Optimization Script
```bash
# Optimize all images
python execution/optimize_images.py --input frontend/public/images --output frontend/public/images/optimized

# For backend media
python execution/optimize_images.py --input backend/media/projects --output backend/media/projects/optimized
```

**Script should:**
- Convert JPG/PNG to WebP
- Generate multiple sizes (thumbnail, medium, large)
- Compress with quality 80-85%
- Preserve aspect ratios
- Create srcset-ready files

### 4. Update Image References

#### Frontend Images
Update `frontend/src/utils/constants.js`:
```javascript
// Before
profileImage: '/images/moi2.jpg'

// After
profileImage: '/images/optimized/moi2.webp'
```

#### SafeImage Component
Update `frontend/src/components/common/SafeImage.jsx`:
```jsx
<picture>
  <source srcSet={`${src}.webp`} type="image/webp" />
  <img src={src} alt={alt} loading="lazy" />
</picture>
```

### 5. Implement Lazy Loading
Add to all image components:
```jsx
<img 
  src={src} 
  alt={alt}
  loading="lazy"
  decoding="async"
/>
```

### 6. Add Responsive Images
For hero/large images:
```jsx
<img
  srcSet={`
    ${src}-400w.webp 400w,
    ${src}-800w.webp 800w,
    ${src}-1200w.webp 1200w
  `}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  src={`${src}-800w.webp`}
  alt={alt}
  loading="lazy"
/>
```

## Outputs
- Optimized images in `*/optimized/` directories
- WebP versions of all images
- Multiple size variants (400w, 800w, 1200w)
- Updated image references in code
- Backup of originals in `.tmp/images_backup/`

## Verification

### Size Reduction
```bash
# Compare before/after
du -sh .tmp/images_backup/images
du -sh frontend/public/images/optimized

# Should see 50-70% reduction
```

### Visual Quality
1. Start dev server: `npm run dev`
2. Check all pages with images
3. Verify no quality degradation
4. Test on different screen sizes

### Performance
```bash
# Run Lighthouse audit
npm run build
npx serve dist
# Open Chrome DevTools > Lighthouse > Performance
```

**Target metrics:**
- Largest Contentful Paint (LCP) < 2.5s
- Image format: WebP
- Properly sized images: 100%

## Edge Cases

### Transparent images (PNG)
- Use PNG for transparency, not WebP (browser support)
- Or provide fallback: `<source type="image/png">`

### SVG icons
- Don't optimize SVGs with this script
- Use SVGO separately if needed

### User-uploaded images
- Backend should optimize on upload
- Add Django signal or view logic
- Store both original and optimized

### CDN deployment
- Upload optimized images to CDN
- Update `VITE_MEDIA_URL` to CDN URL
- Set proper cache headers

## Success Criteria
- [ ] All images converted to WebP (with fallbacks)
- [ ] Image sizes reduced by 50%+ 
- [ ] Lazy loading on all images
- [ ] Responsive images (srcset) on hero/large images
- [ ] No visual quality loss
- [ ] Lighthouse performance score 90+
- [ ] LCP < 2.5s

## Learnings to Document
After running, update directive with:
- Actual size reduction achieved
- Any images that needed special handling
- Browser compatibility issues encountered
- Performance improvement metrics

## References
- ANALYSE_COMPLETE.md (lines 197-200, 316-320)
- WebP Documentation: https://developers.google.com/speed/webp
- Responsive Images: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
