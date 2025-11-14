#!/bin/bash

# Create placeholder images directory
mkdir -p public/images

# Function to create SVG placeholder
create_placeholder() {
    local filename=$1
    local text=$2
    local width=${3:-1920}
    local height=${4:-1080}

    cat > "public/images/$filename" << EOF
<svg width="$width" height="$height" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-$filename" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1A1A1A;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FF6B35;stop-opacity:0.8" />
    </linearGradient>
  </defs>
  <rect width="$width" height="$height" fill="url(#grad-$filename)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">$text</text>
</svg>
EOF
}

# Hero images
create_placeholder "hero-1.jpg" "KI CLIMBING - HERO 1" 1920 1080
create_placeholder "hero-2.jpg" "KI CLIMBING - HERO 2" 1920 1080
create_placeholder "hero-3.jpg" "KI CLIMBING - HERO 3" 1920 1080

# News images
create_placeholder "news-1.jpg" "NEWS 1" 800 600
create_placeholder "news-2.jpg" "NEWS 2" 800 600
create_placeholder "news-3.jpg" "NEWS 3" 800 600
create_placeholder "news-4.jpg" "NEWS 4" 800 600
create_placeholder "news-5.jpg" "NEWS 5" 800 600
create_placeholder "news-6.jpg" "NEWS 6" 800 600

# Gallery images
create_placeholder "gallery-1.jpg" "GALLERY 1" 800 800
create_placeholder "gallery-2.jpg" "GALLERY 2" 800 800
create_placeholder "gallery-3.jpg" "GALLERY 3" 800 800
create_placeholder "gallery-4.jpg" "GALLERY 4" 800 800
create_placeholder "gallery-5.jpg" "GALLERY 5" 800 800
create_placeholder "gallery-6.jpg" "GALLERY 6" 800 800
create_placeholder "gallery-7.jpg" "GALLERY 7" 800 800
create_placeholder "gallery-8.jpg" "GALLERY 8" 800 800

# Partner logos
create_placeholder "partner-1.png" "PARTNER 1" 200 80
create_placeholder "partner-2.png" "PARTNER 2" 200 80
create_placeholder "partner-3.png" "PARTNER 3" 200 80

echo "Placeholder images created successfully!"
