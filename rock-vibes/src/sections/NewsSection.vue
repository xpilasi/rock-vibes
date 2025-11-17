<template>
  <section id="news" class="relative section-padding bg-white">
    <div class="container-custom">
      <SectionTitle :title="news.title" :subtitle="news.subtitle" />

      <div class="relative">
        <!-- Show skeleton loaders while loading or no data -->
        <Swiper
          v-if="news.loading || news.items.length === 0"
          :modules="modules"
          :slides-per-view="1"
          :space-between="32"
          :pagination="{ clickable: true }"
          :breakpoints="{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }"
          class="news-swiper"
        >
          <SwiperSlide v-for="index in 5" :key="'skeleton-' + index">
            <NewsSkeletonLoader />
          </SwiperSlide>
        </Swiper>

        <!-- Show actual news items when loaded -->
        <Swiper
          v-else
          :modules="modules"
          :slides-per-view="1"
          :space-between="32"
          :pagination="{ clickable: true }"
          :breakpoints="{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }"
          class="news-swiper"
        >
          <SwiperSlide v-for="item in news.items" :key="item.id">
            <NewsCard
              :image="item.image"
              :date="item.date"
              :title="item.title"
              :excerpt="item.excerpt"
              :link="item.link"
            />
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
import NewsCard from '../components/cards/NewsCard.vue'
import NewsSkeletonLoader from '../components/loaders/NewsSkeletonLoader.vue'

export default {
  name: 'NewsSection',
  components: {
    SectionTitle,
    NewsCard,
    NewsSkeletonLoader,
    Swiper,
    SwiperSlide
  },
  props: {
    news: {
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
.news-swiper {
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
