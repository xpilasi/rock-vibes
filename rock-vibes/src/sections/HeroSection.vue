<template>
  <section id="hero" class="relative h-screen overflow-hidden">
    <!-- Background Image Carousel -->
    <div class="fixed inset-0 z-0">
      <transition-group
        name="carousel"
        tag="div"
        class="relative h-full"
      >
        <div
          v-for="(image, index) in hero.images"
          v-show="currentSlide === index"
          :key="index"
          class="absolute inset-0"
        >
          <div
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            :style="{
              backgroundImage: `url(${image})`,
              transform: `scale(${1 + parallaxOffset * 0.1})`
            }"
          ></div>
        </div>
      </transition-group>

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 gradient-overlay-hero"></div>
    </div>

    <!-- Hero Content -->
    <div class="relative h-full flex items-center justify-center z-10">
      <div class="container-custom text-center ">
        <h1
          class=" text-white mb-6 fade-in bg-black!  "
          :style="{ transform: `translateY(${parallaxOffset * 20}px)` }"
        >
          {{ hero.title }}
        </h1>
        <p
          class="text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-white tracking-tight mb-12 fade-in"
          style="animation-delay: 0.2s"
          :style="{ transform: `translateY(${parallaxOffset * 15}px)` }"
        >
          {{ hero.tagline }}
        </p>
        <div
          class="!my-14"
          style="animation-delay: 0.4s"
          :style="{ transform: `translateY(${parallaxOffset * 10}px)` }"
        >
          <BaseButton
            variant="primary"
            size="large"
            href="#climbing-gym"
            @click.prevent="scrollToContent"
          >
            {{ hero.cta }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <!-- <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg
        class="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div> -->

    <!-- Carousel Indicators -->
    <!-- <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3">
      <button
        v-for="(image, index) in hero.images"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'w-3 h-3 rounded-full transition-all duration-300',
          currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div> -->
  </section>
</template>

<script>
import BaseButton from '../components/ui/BaseButton.vue'

export default {
  name: 'HeroSection',
  components: {
    BaseButton
  },
  props: {
    hero: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentSlide: 0,
      carouselInterval: null,
      parallaxOffset: 0
    }
  },
  mounted() {
    // Autoplay disabled - manual navigation only
    window.addEventListener('scroll', this.handleParallax)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleParallax)
  },
  methods: {
    startCarousel() {
      this.carouselInterval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },
    stopCarousel() {
      if (this.carouselInterval) {
        clearInterval(this.carouselInterval)
      }
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.hero.images.length
    },
    goToSlide(index) {
      this.currentSlide = index
    },
    handleParallax() {
      const scrolled = window.scrollY
      const heroHeight = window.innerHeight
      if (scrolled < heroHeight) {
        this.parallaxOffset = scrolled / heroHeight
      }
    },
    scrollToContent() {
      const target = document.querySelector('#climbing-gym')
      if (target) {
        const headerHeight = 80
        const targetPosition = target.offsetTop - headerHeight
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style scoped>
.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 1s ease;
}

.carousel-enter-from {
  opacity: 0;
}

.carousel-leave-to {
  opacity: 0;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>
