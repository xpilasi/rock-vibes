<template>
  <section id="offerings" class="relative section-padding bg-white">
    <div class="container-custom">
      <SectionTitle
        :title="offerings.title"
        :subtitle="offerings.subtitle"
      />

      <!-- Mobile: Stack vertically -->
      <div class="flex flex-col lg:flex-row gap-6 ">
        <!-- Left side: 2 large cards -->
        <div class="flex flex-col gap-6 lg:w-1/2">
          <div
            v-for="item in leftItems"
            :key="item.id"
            class="group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex-1 min-h-[198px] flex flex-col justify-end"
            :style="{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
          >
            <!-- Bottom panel with gray background -->
            <div class="bg-(--ki-light-gray) !p-4">
              <h3 class="text-2xl font-heading font-bold text-(--ki-black) mb-2 uppercase tracking-wide">
                {{ item.name }}
              </h3>
              <p class="text-sm font-body text-(--ki-medium-gray) leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right side: 3 smaller cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6 lg:w-1/2">
          <div
            v-for="item in rightItems"
            :key="item.id"
            class="group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-end min-h-[70px]"
            :style="{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
          >
            <!-- Bottom panel with gray background -->
            <div class="bg-(--ki-light-gray)  !p-4">
              <h3 class="text-xl font-heading font-bold text-(--ki-black) mb-2 uppercase tracking-wide">
                {{ item.name }}
              </h3>
              <p class="text-xs font-body text-(--ki-medium-gray) leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from '../components/ui/SectionTitle.vue'

export default {
  name: 'OfferingsSection',
  components: {
    SectionTitle
  },
  props: {
    offerings: {
      type: Object,
      required: true
    }
  },
  computed: {
    leftItems() {
      // First 2 items for the left side
      return this.offerings.items.slice(0, 2)
    },
    rightItems() {
      // Remaining 3 items for the right side
      return this.offerings.items.slice(2, 5)
    }
  }
}
</script>
