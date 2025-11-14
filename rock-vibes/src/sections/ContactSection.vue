<template>
  <section id="contact" class="relative section-padding bg-ki-light-gray">
    <div class="container-custom">
      <SectionTitle
        :title="contact.title"
        :subtitle="contact.subtitle"
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Address -->
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-12 h-12 bg-ki-secondary rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-heading font-semibold text-ki-black mb-2">Address</h3>
              <p class="text-base font-body text-ki-medium-gray">
                {{ contact.info.address.street }}<br>
                {{ contact.info.address.city }}<br>
                {{ contact.info.address.country }}
              </p>
            </div>
          </div>

          <!-- Phone -->
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-12 h-12 bg-ki-secondary rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-heading font-semibold text-ki-black mb-2">Phone</h3>
              <a
                :href="`tel:${contact.info.phone.replace(/\s/g, '')}`"
                class="text-base font-body text-ki-medium-gray hover:text-ki-secondary transition-colors"
              >
                {{ contact.info.phone }}
              </a>
            </div>
          </div>

          <!-- Email -->
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-12 h-12 bg-ki-secondary rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-heading font-semibold text-ki-black mb-2">Email</h3>
              <a
                :href="`mailto:${contact.info.email}`"
                class="text-base font-body text-ki-medium-gray hover:text-ki-secondary transition-colors"
              >
                {{ contact.info.email }}
              </a>
            </div>
          </div>

          <!-- Opening Hours -->
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-12 h-12 bg-ki-secondary rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-heading font-semibold text-ki-black mb-2">Opening Hours</h3>
              <p class="text-base font-body text-ki-medium-gray">
                {{ contact.info.hours.weekdays }}<br>
                {{ contact.info.hours.weekend }}
              </p>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div class="h-96 lg:h-full min-h-[400px] rounded-lg overflow-hidden shadow-card">
          <iframe
            :src="contact.map.embedUrl"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="grayscale hover:grayscale-0 transition-all duration-300"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionTitle from '../components/ui/SectionTitle.vue'

export default {
  name: 'ContactSection',
  components: {
    SectionTitle
  },
  props: {
    contact: {
      type: Object,
      required: true
    }
  }
}
</script>
