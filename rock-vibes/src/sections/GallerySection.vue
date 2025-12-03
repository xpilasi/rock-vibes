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
          <SwiperSlide v-for="(image, index) in gallery.images" :key="image.id">
            <div
              class="group relative overflow-hidden rounded-md cursor-pointer aspect-square"
              @click="openModal(index)"
            >
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

    <!-- Image Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/95 backdrop-blur-sm"></div>

          <!-- Modal Content -->
          <div class="relative z-10 w-full max-w-7xl max-h-[90vh] flex items-center justify-center">
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 hover:scale-110 group"
              aria-label="Close modal"
            >
              <svg
                class="w-6 h-6 transition-transform group-hover:rotate-90 duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <!-- Previous Button -->
            <button
              @click="previousImage"
              class="absolute left-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 hover:scale-110 hover:-translate-x-1"
              aria-label="Previous image"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <!-- Image Container -->
            <div class="relative w-full h-full flex items-center justify-center">
              <Transition name="image-fade" mode="out-in">
                <img
                  :key="currentImageIndex"
                  :src="currentImage.src"
                  :alt="currentImage.alt"
                  class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
              </Transition>
            </div>

            <!-- Next Button -->
            <button
              @click="nextImage"
              class="absolute right-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 hover:scale-110 hover:translate-x-1"
              aria-label="Next image"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <!-- Image Counter -->
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-medium">
              {{ currentImageIndex + 1 }} / {{ gallery.images.length }}
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import SectionTitle from '../components/ui/SectionTitle.vue'

const props = defineProps({
  gallery: {
    type: Object,
    required: true
  }
})

const modules = [Pagination]

// Modal state
const isModalOpen = ref(false)
const currentImageIndex = ref(0)

const currentImage = computed(() => {
  return props.gallery.images[currentImageIndex.value]
})

const openModal = (index) => {
  currentImageIndex.value = index
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.gallery.images.length
}

const previousImage = () => {
  currentImageIndex.value =
    currentImageIndex.value === 0
      ? props.gallery.images.length - 1
      : currentImageIndex.value - 1
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (!isModalOpen.value) return

  switch (event.key) {
    case 'Escape':
      closeModal()
      break
    case 'ArrowRight':
      nextImage()
      break
    case 'ArrowLeft':
      previousImage()
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
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

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .absolute.inset-0 {
  transition: opacity 0.3s ease;
}

/* Image fade transition */
.image-fade-enter-active {
  transition: all 0.3s ease-out;
}

.image-fade-leave-active {
  transition: all 0.2s ease-in;
}

.image-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.image-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
