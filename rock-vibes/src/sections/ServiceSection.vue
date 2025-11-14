<template>
  <section id="service" class="relative section-padding bg-gradient-to-b from-white/60 to-transparent">
    <div class="container-custom">
      <SectionTitle
        :title="service.title"
        :subtitle="service.subtitle"
      />

      <div class="flex justify-center">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
          <div
            v-for="item in service.items"
            :key="item.id"
            class="flex flex-col items-center text-center cursor-pointer !p-8 bg-white rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <!-- Icon -->
            <div class="w-16 h-16 mb-6 text-(--ki-yellow) transition-transform duration-300 hover:scale-110">
              <component :is="getIcon(item.icon)" class="w-full h-full" />
            </div>

            <!-- Title -->
            <h3 class="text-xl font-heading font-bold text-(--ki-black) mb-3 uppercase tracking-wide">
              {{ item.name }}
            </h3>

            <!-- Description -->
            <p class="text-sm font-body text-(--ki-medium-gray) leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from '../components/ui/SectionTitle.vue'
import {
  AcademicCapIcon,
  TrophyIcon,
  UserGroupIcon,
  UsersIcon,
  ShoppingBagIcon,
  SparklesIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'ServiceSection',
  components: {
    SectionTitle
  },
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  methods: {
    getIcon(iconName) {
      const iconMap = {
        'beginner': AcademicCapIcon,
        'pro-training': TrophyIcon,
        'kids': SparklesIcon,
        'groups': UsersIcon,
        'shop': ShoppingBagIcon,
        'events': UserGroupIcon
      }
      return iconMap[iconName] || AcademicCapIcon
    }
  }
}
</script>
