<template>
  <section id="gallery" class="relative section-padding bg-white">
    <div class="container-custom">
      <SectionTitle
        :title="gallery.title"
        :subtitle="gallery.subtitle"
      />

      <div class="relative">
        <Swiper
          :modules="modules"
          :slides-per-view="1.5"
          :space-between="16"
          :pagination="{ clickable: true }"
          :loop="true"
          :centered-slides="false"
          :breakpoints="{
            480: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }"
          class="gallery-swiper"
        >
          <SwiperSlide v-for="image in gallery.images" :key="image.id">
            <div class="group relative overflow-hidden rounded-md cursor-pointer aspect-square">
              <img
                :src="image.src"
                :alt="image.alt"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg
                  class="w-12 h-12 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import SectionTitle from '../components/ui/SectionTitle.vue'

export default {
  name: 'GallerySection',
  components: {
    SectionTitle,
    Swiper,
    SwiperSlide
  },
  props: {
    gallery: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      modules: [Pagination]
    }
  }
}
</script>

<style scoped>
.gallery-swiper {
  padding-bottom: 3rem;
}

/* Customize pagination */
:deep(.swiper-pagination-bullet) {
  background: var(--ki-border-gray);
  opacity: 1;
  width: 10px;
  height: 10px;
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--ki-yellow);
  width: 24px;
  border-radius: 5px;
}
</style>
