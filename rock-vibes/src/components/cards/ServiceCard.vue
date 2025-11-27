<template>
  <div
    class="relative cursor-pointer flex flex-col justify-end p-6! rounded-lg overflow-hidden group min-h-[300px] transition-transform duration-300 hover:scale-105"
    :style="backgroundStyle"
  >
    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-black/90  transition-opacity duration-300 group-hover:from-black/90"></div>

    <!-- Favicon SVG en esquina superior derecha -->
    <img
      :src="faviconSvg"
      alt="Rock Vibes"
      class="absolute top-4 right-4 w-8 h-8 opacity-100 transition-opacity duration-300 group-hover:opacity-60 z-10"
    />

    <!-- Content -->
    <div class="relative z-10">
      <h3 class="text-xl font-heading font-semibold text-white mb-2 uppercase tracking-wide">
        {{ name }}
      </h3>
      <p class="text-sm font-body text-white/90 leading-relaxed">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
import faviconSvg from '@/assets/images/favicon-rock-vibes.svg'

export default {
  name: 'ServiceCard',
  props: {
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      faviconSvg
    }
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url(${this.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    }
  }
}
</script>
