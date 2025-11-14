# KI Climbing Center Website

A modern, high-performance website for KI Climbing Center Innsbruck, built with Vue.js 3 and Tailwind CSS. This project showcases one of the world's largest and most advanced climbing facilities with a clean, minimalist design aesthetic.

## 🚀 Features

- **Modern Tech Stack**: Vue.js 3.x (Options API), Vite, Tailwind CSS 3.x
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Component-Based Architecture**: Reusable, maintainable components
- **Performance Optimized**: Fast loading times, lazy image loading, optimized bundles
- **Interactive UI**: Carousel hero section with parallax effects
- **Smooth Navigation**: Sticky header with smooth scroll to sections
- **SEO Ready**: Proper semantic HTML and meta tags

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository** (or use existing project)
   ```bash
   cd rock-vibes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate placeholder images**
   ```bash
   chmod +x generate-placeholders.sh
   ./generate-placeholders.sh
   ```

## 🏃 Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Header, Footer)
│   ├── cards/           # Card components (NewsCard, ServiceCard)
│   └── ui/              # UI components (BaseButton, SectionTitle)
├── sections/            # Page sections (HeroSection, NewsSection, etc.)
├── composables/         # Reusable composition functions (useContent)
├── assets/              # Static assets and global styles
├── utils/               # Utility functions
└── App.vue              # Main application component
```

## 🎨 Design System

### Colors
- **Primary**: Black (#000000), Dark Gray (#1A1A1A), Medium Gray (#333333)
- **Accent**: Orange (#FF6B35), Warm Orange (#FF8C42), Yellow (#FFD23F)
- **Neutral**: White (#FFFFFF), Light Gray (#F5F5F5), Border Gray (#E0E0E0)

### Typography
- **Headings**: Montserrat (400, 500, 600, 700, 800)
- **Body**: Open Sans (400, 500, 600)
- **Accent**: Bebas Neue (400)

### Naming Conventions
- **Sections**: Must end with "Section" (e.g., `HeroSection`, `NewsSection`)
- **Cards**: Must end with "Card" (e.g., `NewsCard`, `ServiceCard`)
- **Layout**: Descriptive names (e.g., `AppHeader`, `AppFooter`)
- **UI Components**: Base prefix or descriptive (e.g., `BaseButton`, `SectionTitle`)

## 📱 Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🔧 Technologies Used

- **Vue.js 3.5.24**: Progressive JavaScript framework (Options API)
- **Vite 7.2.2**: Next-generation frontend build tool
- **Tailwind CSS 3.x**: Utility-first CSS framework
- **@headlessui/vue**: Unstyled, accessible UI components
- **@heroicons/vue**: Beautiful hand-crafted SVG icons
- **GSAP**: Professional-grade animation library
- **Vue Router 4**: Official router for Vue.js

## 📄 Main Sections

1. **Hero Section**: Full-screen carousel with parallax effects
2. **News Section**: 6-card grid showcasing latest updates
3. **Climbing Center Section**: 5 service icons with descriptions
4. **Offerings Section**: 5 offering categories
5. **Service Section**: 5 service types
6. **Gallery Section**: Masonry grid layout with hover effects
7. **Contact Section**: Two-column layout with contact info and map
8. **Footer**: 4-column layout with opening hours, contact, links, and social media

## 🎯 Customization

### Updating Content

All content is managed through the `src/composables/useContent.js` file. Edit this file to update:
- Navigation links
- Hero text and images
- News articles
- Services and offerings
- Contact information
- Footer content

### Styling

- Global styles: `src/assets/main.css`
- Tailwind configuration: `tailwind.config.js`
- Custom CSS variables are defined in `:root` selector

### Adding Images

Replace placeholder images in `public/images/` with real images:
- Hero images: `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`
- News images: `news-1.jpg` through `news-6.jpg`
- Gallery images: `gallery-1.jpg` through `gallery-8.jpg`

## 🚢 Deployment

This project is ready for deployment on:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions workflow

## 📝 License

Copyright © 2024 KI Climbing Center. All rights reserved.

## 🤝 Contributing

This is a custom project for KI Climbing Center. For modifications or improvements, please contact the development team.

## 📞 Support

For technical support or questions, please refer to the project documentation or contact the development team.

---

**Built with ❤️ using Vue.js and Tailwind CSS**
