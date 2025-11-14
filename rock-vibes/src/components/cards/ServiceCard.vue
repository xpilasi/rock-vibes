<template>
  <div
    class="relative flex flex-col justify-end p-6! rounded-lg overflow-hidden group min-h-[300px] transition-transform duration-300 hover:scale-105"
    :style="backgroundStyle"
  >
    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90"></div>

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
