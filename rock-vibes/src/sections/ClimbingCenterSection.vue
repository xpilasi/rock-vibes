<template>
  <section id="climbing-gym" class="relative section-padding bg-(--ki-light-gray)">
    <div class="container-custom">
      <SectionTitle
        :title="climbingCenter.title"
        :subtitle="climbingCenter.subtitle"
      />

      <div class="flex justify-center !mb-14">
        <div class="w-full max-w-4xl">
          <p class="text-lg md:text-xl font-body text-ki-medium-gray leading-relaxed">
            {{ climbingCenter.description }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <ServiceCard
          v-for="service in climbingCenter.services"
          :key="service.id"
          :image="service.image"
          :name="service.name"
          :description="service.description"
        />
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from '../components/ui/SectionTitle.vue'
import ServiceCard from '../components/cards/ServiceCard.vue'

export default {
  name: 'ClimbingCenterSection',
  components: {
    SectionTitle,
    ServiceCard
  },
  props: {
    climbingCenter: {
      type: Object,
      required: true
    }
  }
}
</script>
