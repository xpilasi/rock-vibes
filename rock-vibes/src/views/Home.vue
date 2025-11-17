<template>
  <div>
    <!-- Hero Section -->
    <HeroSection :hero="hero" />

    <!-- News Section -->
    <NewsSection :news="news" />

    <!-- Climbing Center Section -->
    <ClimbingCenterSection :climbing-center="climbingCenter" />

    <!-- Offerings Section -->
    <OfferingsSection :offerings="offerings" />

    <!-- Service Section -->
    <ServiceSection :service="service" />

    <!-- Gallery Section -->
    <GallerySection :gallery="gallery" />

    <!-- Contact Section -->
    <ContactSection :contact="contact" />
  </div>
</template>

<script>
import { useI18nContent } from '../composables/useI18nContent'
import HeroSection from '../sections/HeroSection.vue'
import NewsSection from '../sections/NewsSection.vue'
import ClimbingCenterSection from '../sections/ClimbingCenterSection.vue'
import OfferingsSection from '../sections/OfferingsSection.vue'
import ServiceSection from '../sections/ServiceSection.vue'
import GallerySection from '../sections/GallerySection.vue'
import ContactSection from '../sections/ContactSection.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    NewsSection,
    ClimbingCenterSection,
    OfferingsSection,
    ServiceSection,
    GallerySection,
    ContactSection
  },
  setup() {
    const { hero, news, climbingCenter, offerings, service, gallery, contact } = useI18nContent()

    return {
      hero,
      news,
      climbingCenter,
      offerings,
      service,
      gallery,
      contact
    }
  }
}
</script>
