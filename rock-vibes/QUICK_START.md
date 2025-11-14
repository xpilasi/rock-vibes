# Quick Start Guide - KI Climbing Center Website

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: `http://localhost:5173`

## 📝 Key Files to Customize

### Content (src/composables/useContent.js)
Edit this file to change:
- Navigation menu items
- Hero text and CTAs
- News articles
- Service descriptions
- Contact information
- Footer content

### Styles (src/assets/main.css)
Customize:
- Color scheme (CSS variables in `:root`)
- Typography
- Spacing
- Animations

### Tailwind Config (tailwind.config.js)
Modify:
- Custom colors
- Font families
- Shadows
- Breakpoints

## 🖼️ Replacing Placeholder Images

Replace files in `public/images/`:

**Hero Section (1920x1080px)**
- hero-1.jpg
- hero-2.jpg
- hero-3.jpg

**News Section (800x600px)**
- news-1.jpg through news-6.jpg

**Gallery Section (800x800px)**
- gallery-1.jpg through gallery-8.jpg

**Partner Logos (200x80px)**
- partner-1.png through partner-3.png

## 🎨 Component Architecture

### Layout Components
- `AppHeader.vue` - Sticky navigation with scroll effects
- `AppFooter.vue` - Multi-column footer with social links

### UI Components
- `BaseButton.vue` - Reusable button (primary, outline, secondary)
- `SectionTitle.vue` - Consistent section headings

### Cards
- `NewsCard.vue` - News article cards with hover effects
- `ServiceCard.vue` - Service/offering cards with icons

### Sections
- `HeroSection.vue` - Full-screen carousel with parallax
- `NewsSection.vue` - 6-card news grid
- `ClimbingCenterSection.vue` - Service overview
- `OfferingsSection.vue` - Membership and pass options
- `ServiceSection.vue` - Customer service options
- `GallerySection.vue` - Image gallery with hover effects
- `ContactSection.vue` - Contact info and map

## 🔧 Common Tasks

### Add a New Section
1. Create component in `src/sections/YourSection.vue`
2. Import in `src/App.vue`
3. Add to template
4. Add content to `src/composables/useContent.js`

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'ki-orange': '#YOUR_COLOR',
  'ki-warm-orange': '#YOUR_COLOR',
}
```

### Update Navigation
Edit `src/composables/useContent.js`:
```javascript
const navigation = [
  { name: 'YOUR LINK', href: '#your-section' }
]
```

## 📦 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## 🚢 Deploy

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
1. Run `npm run build`
2. Drag `dist/` folder to Netlify

### Static Hosting
Upload contents of `dist/` folder to your web server.

## ⚡ Performance Tips

1. **Optimize Images**: Use WebP format for better compression
2. **Lazy Loading**: Already implemented for all images
3. **Code Splitting**: Vite handles this automatically
4. **CDN**: Host images on a CDN for faster loading

## 🐛 Troubleshooting

### Build fails with Tailwind error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Images not showing
- Check file paths in `useContent.js`
- Ensure images are in `public/images/`
- Verify image filenames match exactly

### Styles not applying
- Clear browser cache
- Restart dev server
- Check Tailwind class names in components

## 📞 Need Help?

Refer to the main README.md for detailed documentation.

---

**Happy Coding! 🧗‍♂️**
