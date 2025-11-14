<template>
  <div id="app">
    <!-- Header -->
    <AppHeader :navigation="content.navigation" />

    <!-- Main Content -->
    <main class="relative z-10">
      <!-- Hero Section -->
      <HeroSection :hero="content.hero" />

      <!-- News Section -->
      <NewsSection :news="content.news" />

      <!-- Climbing Center Section -->
      <ClimbingCenterSection :climbing-center="content.climbingCenter" />

      <!-- Offerings Section -->
      <OfferingsSection :offerings="content.offerings" />

      <!-- Service Section -->
      <ServiceSection :service="content.service" />

      <!-- Gallery Section -->
      <GallerySection :gallery="content.gallery" />

      <!-- Contact Section -->
      <ContactSection :contact="content.contact" />
    </main>

    <!-- Footer -->
    <AppFooter :footer="content.footer" />
  </div>
</template>

<script>
import { useI18nContent } from './composables/useI18nContent'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './sections/HeroSection.vue'
import NewsSection from './sections/NewsSection.vue'
import ClimbingCenterSection from './sections/ClimbingCenterSection.vue'
import OfferingsSection from './sections/OfferingsSection.vue'
import ServiceSection from './sections/ServiceSection.vue'
import GallerySection from './sections/GallerySection.vue'
import ContactSection from './sections/ContactSection.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    HeroSection,
    NewsSection,
    ClimbingCenterSection,
    OfferingsSection,
    ServiceSection,
    GallerySection,
    ContactSection
  },
  setup() {
    const { locale } = useI18n()
    const content = useI18nContent()

    // Watch for locale changes and update content
    watch(locale, () => {
      Object.assign(content, useI18nContent())
    })

    return {
      content
    }
  }
}
</script>
